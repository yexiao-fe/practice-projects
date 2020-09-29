<?php
include "mysqli.php";
if (!empty($_POST)) {
	//处理文件:转存文件到指定路径
//创建储存文件的目录
if(!file_exists("../images")){
	mkdir("../images");
}
$tempPath = $_FILES['img']['tmp_name'];
$newName = $_FILES['img']['name'];
$res = move_uploaded_file($tempPath, "../images/{$newName}");
if($res){
	$data['imgUrl'] = "../images/{$newName}";
}

$bookname=$_POST['bookname'];
$simple=$_POST['simple'];
$author=$_POST['author'];
$pubhouse=$_POST['pubhouse'];
$pubdate=$_POST['pubdate'];
$price=$_POST['price'];
$isbn=$_POST['isbn'];
$img=$data['imgUrl'];
$sql="SELECT * FROM book WHERE bookname='$bookname'";

$res=getlist($sql);
if (!empty($res)) {
	echo '<script>alert("图书已存在");</script>';
}else{
	//开始添加
	$sql="INSERT INTO book (bookname,simple,author,pubhouse,pubdate,price,isbn,img) VALUES ('$bookname','$simple','$author','$pubhouse','$pubdate',$price,'$isbn','$img')";
	add($sql);
	header('location:index.php');
}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>添加图书</title>
	<link rel="stylesheet" href="../css/index.css">
	<link rel="stylesheet" href="../css/add.css">
</head>
<body>
	<!-- 头部 -->
	<div class="header">
		<div class="nav">
			<ul>
				<li>
					<a href="#">书吧</a>
				</li>
				<li>
					<a href="index.php">网站首页</a>
				</li>
				<li>
					<a href="#">关于我们</a>
				</li>
				<li>
					<a href="#">图书展示</a>
				</li>
				<li>
					<a href="#">联系我们</a>
				</li>
				<li>
					<a href="shopcar.php">购物车</a>
				</li>
				<li class="active">
					<a href="#">添加图书</a>
				</li>
			</ul>
		</div>
	</div>
	<!-- 头部 -->
	<!-- 主要内容 -->
	<div class="add">
		<h2>添加图书</h2>
		<div class="form">
			<div class="form_left">
				<p>书名：</p>
				<p>简介：</p>
				<p>作者：</p>
				<p>出版社：</p>
				<p>出版日期：</p>
				<p>价格：</p>
				<p>ISBN：</p>
				<p>书籍图片：</p>
			</div>
			<form action="add.php" method="post" enctype="multipart/form-data">
			<!-- enctype="multipart/form-data"一定要加它不然获取不到图片信息 -->
				<input type="text" placeholder="书名" name="bookname" required>
				<input type="text" placeholder="简介" name="simple" required>
				<input type="text" placeholder="作者" name="author" required>
				<input type="text" placeholder="出版社" name="pubhouse" required>
				<input type="text" placeholder="出版日期" name="pubdate">
				<input type="text" placeholder="价格" name="price" required>
				<input type="text" placeholder="ISBN" name="isbn" required>
				<input type="file" placeholder="选择文件" name="img" required>
				<input type="submit" value="添加">
			</form>
		</div>
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