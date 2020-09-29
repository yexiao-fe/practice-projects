<?php
include 'mysqli.php';
$id=$_GET['id'];
$sql="SELECT * FROM book WHERE id=$id";
$res=getlist($sql);
?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>图书展示</title>
	<link rel="stylesheet" href="../css/index.css">
	<link rel="stylesheet" href="../css/detail.css">
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
				<li class="active">
					<a href="#">图书展示</a>
				</li>
				<li>
					<a href="#">联系我们</a>
				</li>
				<li>
					<a href="shopcar.php">购物车</a>
				</li>
				<li>
					<a href="add.php">添加图书</a>
				</li>
			</ul>
		</div>
	</div>
	<!-- 头部 -->
	<!-- 主要内容 -->
	<div class="detail">
		<div class="left">
			<img src="<?php echo $res[0]['img']?>">
		</div>
		<div class="right">
			<h2><?php echo $res[0]['bookname']?></h2>
			<h5><?php echo $res[0]['simple']?></h5>
			<div class="message">
				<p>作者：<span class="author"><?php echo $res[0]['author']?></span></p>
				<p>出版社：<span class="pubhouse"><?php echo $res[0]['pubhouse']?></span></p>
				<p>出版时间：<?php echo $res[0]['pubdate']?></p>
				<p>国际标准书号ISBN：<?php echo $res[0]['isbn']?></p>
				<p class="price">友情价格：<span>￥<?php echo $res[0]['price']?></span></p>
			</div>
			<div class="footer">
				<a href="shopcar.php?id=<?php echo $id;?>"><div class="add">加入购物车</div></a>
				<div class="buy">立即购买</div>
			</div>
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
<script>
	var buy=document.getElementsByClassName('buy')[0];
	buy.onclick=function(){
		alert("请支付："+<?php echo $res[0]['price']?>+"元")
	}
</script>
</html>