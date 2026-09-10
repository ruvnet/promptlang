"""Bounded typed prompt compilation. Never executes prompt content."""
import hashlib, json, math, re

def canonical(value):
    def walk(v, depth=0):
        if depth > 12: raise ValueError('maximum depth exceeded')
        if type(v) in (str, list, dict) and len(v)>8192: raise ValueError('value too large')
        if type(v) is float and not math.isfinite(v): raise ValueError('nonfinite number')
        if type(v) is int and not -(2**63)<=v<2**63: raise ValueError('integer outside int64')
        if type(v) is dict:
            if not all(type(k) is str for k in v): raise ValueError('nonstring key')
            for x in v.values(): walk(x,depth+1)
        elif type(v) is list:
            for x in v: walk(x,depth+1)
        elif type(v) not in (str,int,float,bool,type(None)): raise ValueError('unsupported type')
    walk(value)
    raw=json.dumps(value,sort_keys=True,separators=(',',':'),allow_nan=False)
    if len(raw.encode())>32768: raise ValueError('document too large')
    return raw

def validate(schema, value):
    canonical(schema); canonical(value)
    if type(schema) is not dict or not schema or len(schema)>64: raise ValueError('invalid schema')
    types={'string':str,'integer':int,'number':(int,float),'boolean':bool}
    if type(value) is not dict or set(value)!=set(schema): raise ValueError('exact fields required')
    for key,kind in schema.items():
        if not re.fullmatch('[A-Za-z][A-Za-z0-9_]{0,63}',key) or kind not in types: raise ValueError('unsupported field')
        if type(value[key]) not in ((types[kind],) if not isinstance(types[kind],tuple) else types[kind]): raise ValueError('type mismatch')
    return {'valid':True}

def compile(spec, values):
    canonical(spec)
    if type(spec) is not dict or set(spec)!={'instruction','inputs','outputs'}: raise ValueError('invalid specification')
    if type(spec['instruction']) is not str or not 1<=len(spec['instruction'])<=4096: raise ValueError('invalid instruction')
    validate(spec['inputs'],values)
    # Validate output schema using representative typed values.
    sample={'string':'','integer':0,'number':0.0,'boolean':False}
    if type(spec['outputs']) is not dict: raise ValueError('invalid outputs')
    validate(spec['outputs'],{k:sample.get(v) for k,v in spec['outputs'].items()})
    compiled={'messages':[{'role':'system','content':spec['instruction']+'\nReturn JSON matching this field schema: '+canonical(spec['outputs'])},{'role':'user','content':canonical(values)}], 'output_schema':spec['outputs']}
    compiled['sha256']=hashlib.sha256(canonical(compiled).encode()).hexdigest()
    return compiled
