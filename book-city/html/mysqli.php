<?php
function add($sql){
	//连接数据库
	$link = mysqli_connect("localhost","root","","book");
	//设置编码格式
	mysqli_query($link, "set names utf8");
	$res = mysqli_query($link, $sql);
	
//	$reslut = mysqli_insert_id($link);
//	echo $reslut;die;
	if($res){
		return true;	
	}else{
		return false;
	}
}

function delete($sql){
	//连接数据库
	$link = mysqli_connect("localhost","root","","book");
	mysqli_query($link, "set names utf8");
	$res = mysqli_query($link, $sql);
	if($res){
		return true;	
	}else{
		return false;
	}
}

//更新数据库
function update($sql){
	//连接数据库
	$link = mysqli_connect("localhost","root","","book");
	mysqli_query($link, "set names utf8");
	$res = mysqli_query($link, $sql);
	if($res){
		return true;	
	}else{
		return false;
	}
}

//查询
function getlist($sql){
	//连接数据库
	$link = mysqli_connect("localhost","root","","book");
	//设置编码格式
	mysqli_query($link, "set names utf8");
	//执行sql
	$res = mysqli_query($link, $sql);
	//取所有数据
	$arr=[];
	while($list = mysqli_fetch_assoc($res)){
		$arr[] = $list;	
	}
	return $arr;	
}
?>