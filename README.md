bangbang.js
=================
用来做什么
-----
用命令行和自定义的脚本配制文件 ，批量移动文件从一个地方到别一个地方。主要用于把一些公用代码放置在一起，能过这个工具分发更新到特定的目录。

如何使用
-----
1. 安装
```sh
npm i bangbang -g
```
配置说明
-----
> 请参考test/test.bangbang.js
```sh
cd test
bangbang --file test.bangbang.js
```
```js
module.exports={
    //说明
    describe:"测试从from文件夹里，移动一些文件到to文件夹里,同时合并一个文件",
    //批量拷贝
    script:[
        //from 从哪里开 fromResolve:是相对路径还是绝对路径 to 拷贝到这里 toResolve:是相对路径还是绝对路径
        {from:'./from/ac/',fromResolve:true, to:'./to/a',toResolve:true},
    ],
    merge:[
        {
            //需要合并哪些文件
            files:[
                //from 从哪里开 fromResolve:是相对路径还是绝对路径
                {from:'./from/m1.js',fromResolve:true},
                {from:'./from/m2.js',fromResolve:true},
                {from:'./from/m3.js',fromResolve:true},
             ],
            //file 合并的文件名 toResolve:是相对路径还是绝对路径
            name:{file:'./to/m.js',toResolve:true}
        },
    ]
}
```

