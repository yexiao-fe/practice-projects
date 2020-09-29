function $(x){
	return document.querySelectorAll(x);
}
var yuandian=$(".yuandian li");
var btn=$(".btn");
var imgs=$(".move img");

for (var i=0; i<yuandian.length; i++) {
	yuandian[i].index=i;
	yuandian[i].onclick=function(){
		for (var i =0; i<yuandian.length; i++){
			imgs[i].style.opacity="";
			yuandian[i].style.backgroundColor="";
		}
		imgs[this.index].style.opacity="1";
		yuandian[this.index].style.backgroundColor="white";
	}
}
//点击左按钮
var index=0;
btn[0].onclick=function(){
	index --;
	if (index<0) {
		index=imgs.length-1;
	}
	for (var i =imgs.length-1; i>=0; i--){
		imgs[i].style.opacity="";
		yuandian[i].style.backgroundColor="";
	}
	imgs[index].style.opacity="1";
	yuandian[index].style.backgroundColor="white";
}
//点击右按钮
btn[1].onclick=function(){
	index ++;
	if (index>imgs.length-1) {
		index=0;
	}
	for (var i =0; i<imgs.length; i++){
		imgs[i].style.opacity="";
		yuandian[i].style.backgroundColor="";
	}
	imgs[index].style.opacity="1";
	yuandian[index].style.backgroundColor="white";
}
function next(){
	index ++;
	if (index>imgs.length-1) {
		index=0;
	}
	for (var i =0; i<imgs.length; i++){
		imgs[i].style.opacity="";
		yuandian[i].style.backgroundColor="";
	}
	imgs[index].style.opacity="1";
	yuandian[index].style.backgroundColor="white";
}
var timer=setInterval(next,5000);
	for (var i =0; i<imgs.length; i++) {
		imgs[i].onmouseover=function(){
		clearInterval(timer);
	}
		imgs[i].onmouseout=function(){
		setInterval(next,5000);
	}
}






















