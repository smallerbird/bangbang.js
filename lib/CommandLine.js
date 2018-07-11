//格式化出参数
function formatArguments(key) {
    var c_arguments=process.argv.splice(2);
    for (let i=0;i<c_arguments.length;i++){
        let item=c_arguments[i];
        //console.log(item,'--'+key)
        if (item =='--'+key) return c_arguments[i+1];
    }
    return false;
}
module.exports={
    formatArguments
}