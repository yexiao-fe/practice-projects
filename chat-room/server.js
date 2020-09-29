var http=require('http');
var fs=require('fs');
var mime=require('mime');

var server=http.createServer(handler);//创建服务器
var io=require('socket.io')(server);//绑定服务器
server.listen(2030,function(){
	console.log('绑定端口号成功')
})

var num=0;
var arrname=[];//定义一个空数组，用来存储用户名
io.on('connection',function(socket){
	num++;
	//接收messages事件
	socket.on('message',function(data){
		console.log(data)
		//发送news事件
		io.sockets.emit('news',{
			name:data.name,
			num:num,
			msg:data.info
		})
	})
	socket.on('disconnect',function(data){
		num--;
		io.sockets.emit('num',{
			num:num,
		})
		console.log('断开连接');
	})
})

//创建handler函数
function handler(req,res){
	var filePath='';
	if (req.url=='/') {
		filePath='./html/index.html';
	}else{
		filePath='.'+req.url;
		console.log(req.url)
	}
	serverStatic(res,filePath);
}
//创建serverStatic函数
function serverStatic(res,filePath){
	fs.exists(filePath,function(exists){
		if (exists) {
			fs.readFile(filePath,'utf-8',function(err,data){
				if (err) {
					send404(res)
				}
				res.writeHead(200,{
					"Content-Type":mime.lookup(filePath)
				})
				res.end(data)
			})
		}else{
			send404(res)
		}
	})
}
function send404(res){
	res.writeHead(404,{
		"Content-Type":"text/plain"
	})
	res.end('404错误,this is not defind!')
}
