#!/usr/bin/env node
const fse = require('fs-extra')
const Path=require('path')
const process=require('process')

let helpMsg=`
在需要运行移动脚本的目录下，能过命令行运行
bangbang --file xxx.bangbang.js

注：xxx.bangbang.js配置说明
module.exports={
    describe:"该脚本的说明", 
    script:[
        {from:'从这里',to:'拷贝到这里'},
        ....
    ]
}
`;
const currentPath=process.cwd();
console.log('当前运行目录：'+currentPath)
var c_arguments = process.argv.splice(2);
//console.log(c_arguments)
//格式化出参数
function formatArguments(key) {
    for (let i=0;i<c_arguments.length;i++){
        let item=c_arguments[i];
        //console.log(item,'--'+key)
        if (item =='--'+key) return c_arguments[i+1];
    }
    return false;
}
let file=formatArguments('file')||null;
if (!file){
    console.log('请指定一个配置文件:xxxx.bangbang.js')
    console.log(helpMsg)
    return;
}
let {exists}=require('./lib/FSTools')

async function run(){

    let configFile=Path.resolve(currentPath,file)
    let isExists=await exists(configFile)
    console.log('加载配置文件:'+configFile)
    if (!isExists){
        console.log('没有找到配置文件：'+configFile)
    }
    let {describe,script}=require(configFile)
    console.log(`
       开始运行..
       “${describe}”
    `)
    console.log('script:',script)
    for (let i=0;i<script.length;i++){
        let temFrom=Path.resolve(currentPath,script[i].from)
        //检查temFrom是否存在
        let isExists=await exists(temFrom)
        let temTo=Path.resolve(currentPath,script[i].to)
        let msg='copy:'+temFrom+'=>'+temTo;
        if (isExists){
            try{
                await fse.copy(temFrom,temTo)
                msg+=' [ok]'
            }catch(e){
                msg+=' [no ]'+e.message
            }
            console.log(msg)
        }else{
            console.log('[no]没有找到文件：'+temFrom)
        }

    }

}
run();

