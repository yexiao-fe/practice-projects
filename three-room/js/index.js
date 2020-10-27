
// 头部
// $('.header .type div').click(function(){
//     $('.header .type div').removeClass('cyan')
//     $(this).addClass('cyan')
// })

setInterval(function(){
    $('.header .right .time span').eq(0).html(com.getDate('.'))
    $('.header .right .time span').eq(1).html(com.getTime())
},1000)

$('.header .right .user div').eq(3).click(function(){
    alert('退出')
})

// 左边
$('.left_side  ul li').click(function(){
    $('.left_side  ul li').removeClass('cyan')
    $(this).addClass('cyan')
})

// 右边
$('.right_side  ul li').click(function(){
    $('.right_side  ul li').removeClass('cyan')
    $(this).addClass('cyan')
})

var i=0;
var timer=setInterval(function(){
    i+=1
    if(i===3){
        $('.xloading').css('display','none')
        clearInterval(timer)
    }
},1000)


