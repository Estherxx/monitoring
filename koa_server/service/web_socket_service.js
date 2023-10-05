const fileUtils=require("../utils/file_utils")

const WebSocket=require('ws')

//创建websocket服务端对象
const wss=new WebSocket.Server({
    port:9998
})
//服务端开启了监听
module.exports.listen=()=>{
    wss.on('connection',client=>{
        console.log('有客户端连接成功...')
        client.on('message',async msg=>{
            console.log('客户端发送数据给服务端：'+msg)
            let payload=JSON.parse(msg)
            const action=payload.action
            if(action==='getData'){
                let filePath='../data/'+payload.chartName+'.json';
                filePath=path.join(__dirname,filePath)
                const ret=await fileUtils.getFileJsonData(filePath)
                payload.data=ret
                client.send(ISON.stringify(payload))
            }else{
                wss.clients.forEach(client=>{
                    client.send(msg)
                })
            }
            client.send('hello socket from backend')
        })
    })
}


