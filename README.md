bangbang.js
=================
用来做什么
-----
完成批量复制，合并文本文件，扫描目录自定义回调处理

为什么要重复造轮子
-----
自动化的工具很多，但发现学习成功很高。如果只是要完成“批量复制，合并，扫描目录自定义回调处理”可以试试这款。

应用场景
-----
1. 批量复制，合并文本文件。
2. 对一批目录下特定文件进行逐个处理。
3. 维护代码库.例如我们写了一个代码库如:modulesA,我们把它放在d:/myproject/modulesA这个目录下，同时做为git目录进行维护。
然后我们要需要针对这个库写一些测试demo 于是在：d:/myproject/modulesA_demo  然后这里会引用node_modules/modulesA,我们在写demo测试这个代码库里，可以直接在node_modules/modulesA修改，然后利用bangbang进行拷贝到d:/myproject/modulesA 来方便更新。



如何使用
-----
1. 安装
```sh
npm i git://github.com:smallerbird/bangbang.js.git -g
```
2. 使用说明
```sh
#进入配置文件运行配置文件
bangbang --file 配置文件

```
详细配置说明和demo
-----
1. 完整的deom页面及运行方法
```sh
#test/test.bangbang.js
cd test
bangbang --file test.bangbang.js
```
2. 关于deom配置详细说明。
```js
//扫描的回调方法
function scanCallbak(file) {
    console.log('scanCallbak:'+file)
}

module.exports={
    //描述说明
    describe:"测试从from文件夹里，移动一些文件到to文件夹里,同时合并一个文件",
    //复制 注：可选
    script:[
        //from 从哪里拷贝 fromResolve from是相对还是绝对 to 拷贝到哪里 toResolve to是相对还是绝对
        {from:'./from/ac/',fromResolve:true, to:'./to/ac',toResolve:true, },  
        {from:'./from/a/',to:'./to/a'},
        {from:'./from/js.js',to:'./to/js.js'},
    ],
    //合并 注：可选
    merge:[
        {
            //合并的文件列表
            files:[
                //from 文件地址  toResolve文件地址是相对还是绝对
                {from:'./from/m1.js',toResolve:true},
                {from:'./from/m2.js',toResolve:true},
                {from:'./from/m3.js',toResolve:true},
             ],
             //合并后地址
            name:{file:'./to/m.js',toResolve:true}
        },
    ],
    //扫描 注：可选
    scan:{
        //扫描的目录列表
        dir:[
            {from:'./test',toResolve:true,callback:scanCallbak},
            {from:'D:\\fei\\myproject\\bangbang.js\\lib',toResolve:false,callback:scanCallbak},
        ],
        //不扫描文件的规则
        ignoreScan:[/node_modules/,/\.git/,/\.idea/]
    }
}
```

更新日志
-----



