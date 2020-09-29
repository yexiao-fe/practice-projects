<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>购物车</title>
	<link rel="stylesheet" href="../css/index.css">
	<link rel="stylesheet" href="../css/shopcar.css">
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
				<li class="active">
					<a href="#">购物车</a>
				</li>
				<li>
					<a href="add.php">添加图书</a>
				</li>
			</ul>
		</div>
	</div>
	<!-- 头部 -->
	<!-- 主要内容 -->
	<div class="shopcar">
		<h2>购物车</h2>
		<?php
		include 'mysqli.php';
		if (!empty($_GET)) {
			$id=$_GET['id'];
			$sql="SELECT * FROM book WHERE id=$id";
			$res=getlist($sql);
			$img=$res[0]['img'];
			$bookname=$res[0]['bookname'];
			$price=$res[0]['price'];
			$sql1="SELECT * FROM shopcar WHERE bookname='$bookname'";
			$res1=getlist($sql1);
			if (empty($res1)) {
				$sql2="INSERT INTO shopcar (img,bookname,price) VALUES ('$img','$bookname','$price')";
				add($sql2);
			}
			$sql3="SELECT * FROM shopcar";
			$list=getlist($sql3);
		?>
			<div class="list">
			<div class="nav">
				<span class="book">图书</span>
				<span class="bookname">书名</span>
				<span class="num">数量</span>
				<span class="nav_price">单价</span>
				<span class="nav_pay">结算</span>
				<span class="nav_del">删除</span>
			</div>
			<ul>
				<?php
				foreach ($list as $key => $value) {
				?>
				<li>
					<span class="book"><img src="<?php echo $value['img']?>"></span>
					<span class="bookname"><?php echo $value['bookname']?></span>
					<span class="num"><input type="text" value="1">本</span>
					<span class="price"><?php echo $value['price']?></span>
					<span class="pay">付款</span>
					<span class="del">删除</span>
				</li>
				<?php	
				}
				?>
			</ul>
		</div>
		<?php }else{?>
		<?php	echo "<h3>你还没有加入任何图书，<a href='index.php'>点击这里看图书</a></h3>";?>
		<?php
		}
		?>
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
	var payall=document.getElementsByClassName('nav_pay')[0];
	var delall=document.getElementsByClassName('nav_del')[0];
	var price=document.getElementsByClassName('price');
	var pay=document.getElementsByClassName('pay');
	var del=document.getElementsByClassName('del');
	var list=document.getElementsByClassName('list')[0];
	var li=list.getElementsByTagName('li');
	var value=list.getElementsByTagName('input');
	//支付所有
	payall.onclick=function(){
		var alls=null;
		for(var i=0;i<li.length;i++){
			var jiages=null;
			var nums=null;
			jiages=Number(price[i].innerHTML);
			num=Number(value[i].value);
			alls+=jiages*num;
		}
		alert("请支付："+alls);
	}
	//清空购物车
	delall.onclick=function(){
		list.style.display='none';
	}
	//清空当前
	for(var i=0;i<li.length;i++){
		del[i].index=i;
		del[i].onclick=function(){
			li[this.index].style.display='none';
		}
	}
	//支付当前
	for(var i=0;i<li.length;i++){
		pay[i].index=i;
		pay[i].onclick=function(){
			var jiage=null;
			var num=null;
			var all=null;

			jiage=Number(price[this.index].innerHTML);
			num=Number(value[this.index].value);
			all=(jiage*num);
			console.log(jiage,num,all);
			alert("请支付："+all);
		}
	}
</script>
</html>