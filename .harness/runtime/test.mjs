import test from 'node:test';
import assert from 'node:assert/strict';
import {Client} from '@modelcontextprotocol/client';
import {StdioClientTransport} from '@modelcontextprotocol/client/stdio';
import {run} from './cli.mjs';
test('reject unknown commands and implicit validation',async()=>{await assert.rejects(run('sh'));delete process.env.RUV_ALLOW_VALIDATION;await assert.rejects(run('test'));await assert.rejects(run('status',{path:'/etc/passwd'}));});
test('official SDK real stdio lifecycle',async()=>{
 const client=new Client({name:'test',version:'1'});const transport=new StdioClientTransport({command:process.execPath,args:['cli.mjs','mcp'],env:{PATH:process.env.PATH,RUV_PYTHON:process.env.RUV_PYTHON||'python3'}});
 try{await client.connect(transport);assert.ok((await client.listTools()).tools.length>=4);assert.equal((await client.listResources()).resources.length,1);assert.equal((await client.callTool({name:'status',arguments:{}})).isError,undefined);assert.equal((await client.callTool({name:'sh',arguments:{}})).isError,true);const response=await client.callTool({name:'benchmark',arguments:{}});assert.equal(response.isError,undefined);assert.equal(JSON.parse(response.content[0].text).receipt.signed,false);}finally{await client.close();}
});

test('real domain operation',async()=>{ const response=await run('compile',{spec:{instruction:'Summarize',inputs:{text:'string'},outputs:{summary:'string'}},values:{text:'hello'}});assert.equal(response.result.messages[1].role,'user');await assert.rejects(run('compile',{spec:{},values:{},extra:true})); });
