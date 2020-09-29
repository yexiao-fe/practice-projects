window.onload=function(){
var login=document.querySelector('.login');//登录
var chat=document.querySelector('.chat');//聊天室
var username=document.querySelector('.login .username');//登录用户名
var come=document.querySelector('.login .come');//进入按钮

//注册用户 点击进去
come.onclick=function(){
  if (username.value) {
    login.style.display='none';
    chat.style.display='block'; 
  }   
}

//聊天室
var socket = io('http://10.80.13.98:2030');
var span=document.querySelector('.header span');//显示人数
var info=document.querySelector('.message');//输入框
var list=document.querySelector('.room ul');//表单
var btn=document.querySelector('.button');//发送按钮

btn.onclick=function(event){
	event.preventDefault();//取消事件冒泡
  	var message=info.value;//发送消息内容
    //发射message事件
  	socket.emit('message',{info:message,name:username.value});
    info.value='';
}
//接受news事件
socket.on('news',function(data){
  		console.log(data);
  		var num=data.num;
  		var name=data.name;
  		var msg=data.msg;
  		span.innerHTML=num;
      if (name==username.value) {
        var li=document.createElement('li');
        li.style.textAlign='right'
        li.innerHTML=msg+':←'+name;
        list.appendChild(li);
      }else{
        var li=document.createElement('li');
        li.innerHTML=name+'→:'+msg;
        list.appendChild(li);
    	}	
  })
socket.on('num',function(data){
  span.innerHTML=data.num;
})
}   
