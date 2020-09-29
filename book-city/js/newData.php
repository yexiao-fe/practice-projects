<?php 
	include "../html/mysqli.php";
	// 处理分页数据的php
	// 接收点击的当前页
	$page=$_GET['num'];
	$sql="SELECT * FROM book";
	$list=getlist($sql);
	$length=count($list);//查询表单长度
	$num=3;//$num代表每页展示的数据条数
	$startPage=$page*$num;
	$sql2="SELECT * FROM book LIMIT $startPage,$num";
	$list2=getlist($sql2);
	echo json_encode($list2);
?>