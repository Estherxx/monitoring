//处理业务逻辑，读取某个json文件的数据
const path=require('path');
const fileUtils=require('../utils/file_utils');
module.exports=async(ctx,next)=>{
    const url=ctx.request.url; // /api/seller ==> ..p/data/seller.json
    let filePath =url.replace('/api',''); //  /seller
    filePath='../data'+filePath+'.json';  //..p/data/seller.json
    filePath=path.join(__dirname,filePath);
    try{
        const ret=await fileUtils.getFileJsonData(filePath);
        ctx.response.body=ret;
    }catch(error){
        const errorMsg={
            message:'读取文件内容失败，文件资源不存在',
            status:404
        }
        ctx.response.body=JSON.stringify(errorMsg);
    }
    console.log(filePath);
    await next();
}