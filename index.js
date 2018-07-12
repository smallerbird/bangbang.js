#!/usr/bin/env node


const fse = require('fs-extra')
const Path=require('path')
const process=require('process')
let {exists,writeFile}=require('./lib/FSTools')
let {formatArguments}=require('./lib/CommandLine.js')

const ejs=require('ejs');
const readEjsFile = function (file,data={}){
    return new Promise(function (resolve, reject){
        let options={};
        ejs.renderFile(file, data, options, function(err, data){
            if (err) reject(err);
            resolve(data);
        });
    });
};

let helpMsg=`
功能一：运行拷贝脚本
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
功能二：初始化一些文件模板
   bangbang --t 文件夹模板 --out 输出的文件名
`;
const currentPath=process.cwd();
console.log('当前运行目录：'+currentPath)
//console.log(c_arguments)
const c_arguments=process.argv.splice(2)
let templete=formatArguments('t',c_arguments)||null;
let file=formatArguments('file',c_arguments)||null;

//如果初始化命令，就在当前目录生成
async function templeteRun(){
        let out=formatArguments('out')||null;
        console.log('out:',out)
        if (!out){
            return console.log('需要指定参数:--out')
        }
        console.log('templeteRun..',templete,outfile)
        //未实现
        /*let initConfig='';
        if (!file){
            file='./templet/templet.js';
            initConfig=require(file);
        }else{
            file=Path.resolve(currentPath,file)
            let isExists=await exists(file)
            if (!isExists) return console.log('没有找到配置文件:'+file)
            initConfig=require(file);
        }
        //let {initType,templet,describe}=initConfig;
        let {script}=initConfig;
        for (var i=0;i<script.length;i++){
            let {initType,templet,describe}=script[i];
        }*/
}
if (templete) {
   return templeteRun();
}


if (!file){
    console.log('请指定一个配置文件:xxxx.bangbang.js')
    console.log(helpMsg)
    return;
}


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
        let temFrom
        if (typeof script[i].fromResolve=='undefined'){
            temFrom=Path.resolve(currentPath,script[i].from)
        }else{
            if (script[i].fromResolve){
                temFrom=Path.resolve(currentPath,script[i].from)
            }else{
                temFrom=script[i].from
            }
        }
        //检查temFrom是否存在
        let isExists=await exists(temFrom)
        let temTo;
        if (typeof script[i].toResolve=='undefined'){
            temTo=Path.resolve(currentPath,script[i].to)
        }else{
            if (script[i].toResolve){
                temTo=Path.resolve(currentPath,script[i].to)
            }else{
                temTo=script[i].to
            }
        }


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

