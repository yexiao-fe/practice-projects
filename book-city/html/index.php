<?php
include "mysqli.php";

//用户登录判断
if (!empty($_POST)) {
$username=$_POST['username'];
$password=$_POST['password'];
$sql="SELECT * FROM users WHERE username='$username' AND password='$password'";

$res=getlist($sql);
if (empty($res)) {
	echo '<script>alert("请输入正确的用户名或密码");</script>';
}else{
	//登陆成功
	//存session
	session_start();
	$_SESSION['username']=$username;
}
}
//用户登录判断
//查询所有图书 分页
$sql="SELECT * FROM book";
$list=getlist($sql);

$length=count($list);//查询表单长度
$num=3;//$num代表每页展示的数据条数
$pageNum=ceil($length/$num);//分页数量
if (empty($_GET['num'])) {
	$startPage=0;
}else{
	$startPage=($_GET['num'])*$num;
}
$sql2="SELECT * FROM book LIMIT $startPage,$num";
$list2=getlist($sql2);
//查询所有图书 分页
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>网上商城</title>
	<link rel="stylesheet" href="../css/index.css">
	<script type="text/javascript" src="../js/jquery.min.js"></script>
</head>
<body>
	<!-- 头部 -->
	<div class="header">
		<div class="nav">
			<ul>
				<li>
					<a href="#">书吧</a>
				</li>
				<li class="active">
					<a href="#">网站首页</a>
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
				<li>
					<a href="add.php">添加图书</a>
				</li>
			</ul>
		</div>
	</div>
	<!-- 头部 -->
	<!-- 主要内容 -->
	<div class="main">
		<div class="top">
			<div class="mybook">
				<h2>我的书城</h2>
				<p>这里拥有世界各地的书籍，只有你想不到的，没有我们这里没有的图书。</p>
				<img src="../images/mybook.jpg">
			</div>
			<div class="login">
				<!-- 如果用户存在登录 -->
				<?php 
					if (!empty($_SESSION['username'])) {
						echo "<h3 style='font-size:20px;'>欢迎你,$username <span id='cancel'>[注销]<span></h3>";
					}else{
						echo '<h3>快速登录</h3>
						<form action="index.php" method="post">
					<input type="text" placeholder="用户名" name="username" required="">
					<input type="password" placeholder="密码" name="password" required="">
					<button>登录</button>
					<a href="register.php">注册</a>
				</form>';
					}
				?>
				<!-- 如果用户存在登录 -->
			</div>
		</div>
		<div class="books">
			<ul>
			<!-- 循环图书列表 -->
				<?php
				foreach ($list2 as $key => $value) {
					if (empty($value['bookname'])) {
						continue;
					}
				?>
				<li>
					<a href="detail.php?id=<?php echo $value['id']?>"><img src="<?php echo $value['img'];?>"/></a>
					<h3><?php echo $value['bookname']?></h3>
					<span class="book_price">￥<?php echo $value['price']?></span>
					<span class="book_buy">立即购买</span>
				</li>
				<?php }?>
				<!-- 循环图书列表 -->
			</ul>
			<div class="page">
				<span class="left"><<</span>
				<?php
				for ($i=0; $i < $pageNum; $i++) { 
					echo "<span class='num'>".($i+1)."</span>";
				}
				?>
				<span class="right">>></span>
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
	var cancel=document.getElementById('cancel');
	var pay=document.getElementsByClassName('book_buy');
	var price=document.getElementsByClassName('book_price');
	var length=pay.length;
	for(var i=0;i<length;i++){
		pay[i].index=i;
		pay[i].onclick=function(){
			if (cancel) {
				alert('请支付：'+price[this.index]['innerHTML']);
			}else{
				alert('请先登录');
			}	
		}
	}
	//分页
	var num=document.getElementsByClassName('num');
	var left=document.getElementsByClassName('left')[0];
	var right=document.getElementsByClassName('right')[0];
	var index=0;
	for(var i=0;i<num.length;i++){
		num[i].index=i;
		num[0].id='page';
		num[i].onclick=function(){
			index=this.index;
			pageid();
			request(index);
		}
	}
	right.onclick=function(){
		index++;
		if (index>=num.length) {
			index=0;
		}
		pageid();
		request(index);
	}
	left.onclick=function(){
		index--;
		if (index<0) {
			index=num.length-1;
		}
		pageid();
		request(index);
	}
	//发送请求
	var books=document.getElementsByClassName('books')[0];
	var ul=books.getElementsByTagName('ul')[0];
	function request(index){
		$.ajax({
			type:"get",
			url:"../js/newData.php",
			data:{
	          num:index,
	          pageNum:<?php echo $pageNum;?>
	        },
	        dataType:'json',
	        async:true,
	        success:function(data){
	        	var html='';
	        	for(var i=0;i<data.length;i++){
	        		html+="<li><a href='detail.php?id="+data[i].id+"'><img src="+"'"+data[i].img+"'"+"/></a><h3>"+data[i].bookname+"</h3><span class='book_price'>￥"+data[i].price+"</span><span class='book_buy'>立即购买</span></li>"
	        	}
	        	ul.innerHTML=html;
	        }
		})
		// window.location=location;
	}
	//所有id为none，当前为page
	function pageid(){
		for(var i=0;i<num.length;i++){
				num[i].id='none';
			}
		num[index].id='page';
	}
	//注销
	cancel.onclick=function(){
		<?php
			// unset($_SESSION['username']);
			echo 'window.location=location';
		?>
	}

</script>
</html>