/**
 * 格式化出参数
 *  请在命令行的主文件中加入：const c_arguments=process.argv.splice(2)
 * @param key
 * @param c_arguments
 * @returns {*}
 */
function formatArguments(key,c_arguments) {
    if (typeof c_arguments=='undefined'){
        console.log('[formatArguments]error:c_arguments == null')
        return;
    }
    for (let i=0;i<c_arguments.length;i++){
        let item=c_arguments[i];
        console.log(item,'--'+key)
        if (item =='--'+key) return c_arguments[i+1];
    }
    return false;
}
module.exports={
    formatArguments
}