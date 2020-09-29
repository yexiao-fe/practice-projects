<?php
include "mysqli.php";
if (!empty($_POST)) {
$username=$_POST['username'];
$password=$_POST['password'];
$sql="SELECT * FROM users WHERE username='$username'";

$res=getlist($sql);
if (!empty($res)) {
	echo '<script>alert("用户已存在");</script>';
}else{
	//开始注册
	$sql="INSERT INTO users (username,password) VALUES ('$username','$password')";
	add($sql);
	header('location:index.php');
}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>注册</title>
	<link rel="stylesheet" href="../css/index.css">
</head>
<body>
	<!-- 头部 -->
	<div class="header">
	</div>
	<!-- 头部 -->
	<!-- 主要内容 -->
	<div class="register">
		<h2>请注册</h2>
		<form action="register.php" method="post">
			<input type="text" placeholder="用户名" name="username" required="">
			<input type="password" placeholder="密码" name="password" required="">
			<a href="index.php">登录</a>
			<button>注册</button>
		</form>
	</div>
	<!-- 主要内容 -->
	<!-- 底部 -->
	<div class="footer">
		<div class="top">
			<a href="#">免费条款</a>
			<a href="#">隐私保护</a>
			<a href="#">咨询热点</a>
			<a href="#">联系我们</a>
			<a href="#">公司简介</a>
			<a href="#">批发方案</a>
			<a href="#">配送方式</a>
		</div>
		<p>&copy;2016-2099 SSS版权所有，并保留所有权利</p>
	</div>
	<!-- 底部 -->
</body>
</html>