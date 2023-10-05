//计算服务器总耗时
module.exports=async (ctx,next)=>{
    //记录开始时间
    const start =Date.now();
    //让内层中间件得到执行
    await next();
    //设置响应头
    const end =Date.now();
    const duration =end -start;
    //ctx.set设置响应头
    ctx.set('X-Respoonse-Time',duration+'ms');
}