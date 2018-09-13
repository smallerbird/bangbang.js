var path = require("path");
var fs = require("fs");
/**
 * 扫描目录
 * @param ignoreScan 不扫描的正则说明
 * @constructor
 *
 * 使用方法说明：
 * var filePath=__dirname;
 var ignoreScan=[/node_modules/,/\.git/,/\.idea/]
 * let scanDir=new ScanDir(ignoreScan);
 scanDir.recursiveReadFile(filePath);
 */
function ScanDir(ignoreScan,callbakGetFile=null){
    if (!callbakGetFile){
        callbakGetFile=function (filename) {

        }
    }
    function isNoScan(rule,filename){
        for (let i=0;i<rule.length;i++){
            let r=rule[i];
            if (r.test(filename)) return true;
        }
        return false;
    }
    function recursiveReadFile(fileName){
        if(!fs.existsSync(fileName)) return;
        if (isNoScan(ignoreScan,fileName)) return;
        if(isFile(fileName)){
            check(fileName);
        }
        if(isDirectory(fileName)){
            var files = fs.readdirSync(fileName);
            files.forEach(function(val,key){
                var temp = path.join(fileName,val);
                if(isDirectory(temp)) recursiveReadFile(temp);
                if (isFile(temp)) callbakGetFile(temp);
            })
        }
    }
    function isDirectory(fileName){
        if(fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
    }
    function isFile(fileName){
        if(fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
    }
    function readFile(fileName){
        if(fs.existsSync(fileName)) return fs.readFileSync(fileName,"utf-8");
    }
    this.recursiveReadFile=recursiveReadFile;
}

module.exports=ScanDir