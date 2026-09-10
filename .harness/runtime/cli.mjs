import { Server } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const policy=JSON.parse(readFileSync(new URL('./policy.json',import.meta.url)));
const root=fileURLToPath(new URL('../../',import.meta.url));
const actions=["compile", "validate", "test", "benchmark"];
let busy=false;
export async function run(action,args={}) {
 if (typeof args!=='object'||args===null||Array.isArray(args)||Buffer.byteLength(JSON.stringify(args))>32768) throw Error('invalid input');
 if(action==='status') { if(Object.keys(args).length) throw Error('no arguments'); return policy; }
 if(action==='compile'&&Object.keys(args).sort().join(',')!=='spec,values')throw Error('exact fields required');
 if(action==='validate'&&Object.keys(args).sort().join(',')!=='schema,value')throw Error('exact fields required');
 if(!actions.includes(action)) throw Error('unknown action');
 if(!['compile','validate'].includes(action)&&Object.keys(args).length) throw Error('no arguments');
 if(action==='test'&&process.env.RUV_ALLOW_VALIDATION!=='1') throw Error('validation requires operator opt-in');
 if(busy) throw Error('busy'); busy=true;
 try { return await new Promise((resolve,reject)=>{
 const argv=action==='test'?['-m','unittest','discover','-s','tests','-v']:['-m','promptlang',action];
 const child=spawn(process.env.RUV_PYTHON||'python3',argv,{cwd:root,env:{PATH:process.env.PATH,PYTHONPATH:root},detached:process.platform!=='win32',stdio:['pipe','pipe','pipe']});
 let output='',errors='',total=0,settled=false;
 const stop=()=>{try { process.kill(-child.pid,'SIGKILL'); }catch { child.kill('SIGKILL'); }};
 const fail=()=>{if(!settled){settled=true;stop();clearTimeout(timer);reject(Error('bounded operation failed'));}};
 const timer=setTimeout(fail,30000);
 for(const [stream,isError] of [[child.stdout,false],[child.stderr,true]])stream.on('data',chunk=>{total+=chunk.length;if(total>65536)return fail();if(isError)errors+=chunk;else output+=chunk;});
 child.on('error',fail);child.stdin.on('error',()=>{});
 child.on('close',code=>{clearTimeout(timer);if(settled)return;settled=true;if(code!==0)return reject(Error('operation rejected'));try{const result=action==='test'?{passed:true,report:errors}:JSON.parse(output);resolve({result,receipt:{sha256:createHash('sha256').update(output+errors).digest('hex'),signed:false,automaticPromotion:false}});}catch{reject(Error('invalid output'));}});
 child.stdin.end(JSON.stringify(args));
 }); } finally {busy=false;}
}
async function mcp(){
 const server=new Server({name:policy.name,version:policy.version},{capabilities:{tools:{},resources:{}}});
 server.setRequestHandler('tools/list',async()=>({tools:['status',...actions].map(name=>({name,description:'Bounded repository '+name,inputSchema:{type:'object',properties: name==='compile'?{spec:{type:'object'},values:{type:'object'}}:name==='validate'?{schema:{type:'object'},value:{type:'object'}}:{},additionalProperties:false}}))}));
 server.setRequestHandler('tools/call',async request=>{try{return {content:[{type:'text',text:JSON.stringify(await run(request.params.name,request.params.arguments??{}))}]};}catch{return {isError:true,content:[{type:'text',text:'Request rejected'}]};}});
 const uri='ruv://'+policy.name+'/policy';
 server.setRequestHandler('resources/list',async()=>({resources:[{uri,name:'Execution policy',mimeType:'application/json'}]}));
 server.setRequestHandler('resources/read',async request=>{if(request.params.uri!==uri)throw Error('unknown resource');return {contents:[{uri,mimeType:'application/json',text:JSON.stringify(policy)}]};});
 await server.connect(new StdioServerTransport(process.stdin,process.stdout,{maxBufferSize:65536}));
 process.stdin.once('end',()=>void server.close());
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 try { if(process.argv[2]==='mcp')await mcp();else console.log(JSON.stringify(await run(process.argv[2],JSON.parse(process.argv[3]||'{}')))); }
 catch {console.error('Request rejected');process.exitCode=1;}
}
