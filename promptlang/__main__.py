import json,sys,time
from . import compile, validate

def run(action,data):
    if action=='compile': return compile(data['spec'],data['values'])
    if action=='validate': return validate(data['schema'],data['value'])
    if action=='benchmark':
        spec={'instruction':'Summarize','inputs':{'text':'string'},'outputs':{'summary':'string'}}
        times=[]
        for _ in range(1000):
            t=time.perf_counter_ns(); compile(spec,{'text':'fixture'}); times.append((time.perf_counter_ns()-t)/1000)
        return {'iterations':1000,'p95_microseconds':sorted(times)[949],'scope':'local compiler only; no model quality claim'}
    raise ValueError('unknown action')
if __name__=='__main__':
    try:
        raw=sys.stdin.buffer.read(32769)
        if len(raw)>32768: raise ValueError('input too large')
        print(json.dumps(run(sys.argv[1],json.loads(raw or b'{}')),allow_nan=False))
    except (ValueError,TypeError,KeyError,IndexError,RecursionError):
        print(json.dumps({'error':'invalid request'})); sys.exit(2)
