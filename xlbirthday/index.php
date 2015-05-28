<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx1fdcd54e97e72cbc", "08af732d37cef9d8a9f546a9c418f062");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="black" name="apple-mobile-web-app-status-bar-style">
	<meta content="telephone=no" name="format-detection">
	<meta content="email=no" name="format-detection">
	<meta content="" name="pgv">
	<meta name="description" content="嘿！哒生日快乐呀">
    <meta itemprop="name" content="特殊的礼物 送给特殊的TA">
    <meta name="description" itemprop="description" content="嘿！哒生日快乐呀">
	<title>立，生日快乐哈</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</head>
<body class="loading">
	<div class="loading-item">
		<div class="heart"></div>
	</div>
	<div class="page-mark">
		<div class="mark-item"></div>
	</div>
	<div class="player-wrapper">
	    <div class="player-item" id="control"></div>
	    <audio id="audio" src=""  loop="loop" autoplay="autoplay" ></audio>
	</div>
	<canvas class="easy-background-canvas"></canvas>
	<div class="main" id="main">

		<div class="flex-v flex">
			
			<section class="flex-1 page-0">
				<div class="page-0-wrap">
					<h1 class="page-content-0 page-0-title">嘿...</h1>
					<h2 class="page-content-2">今天你生日哟</h2>
					<h2 class="page-content-4">这份小小的情书，</h2>
					<h2 class="page-content-5">送给最最亲爱的你</h2>
					<div class="page-0-cake page-0-cake-draw">
						<div class="page-0-line-0"></div>
						<div class="page-0-line-1"></div>
						<div class="page-0-line-2"></div>
						<div class="page-0-line-3"></div>
						<div class="page-0-line-4"></div>
						<div class="page-0-line-5"></div>
						<div class="page-0-line-6"></div>
						<div class="page-0-line-7"></div>
						<div class="page-0-line-8"></div>
						<div class="page-0-line-9"></div>
					</div>
				</div>
				
				<a href="#none" class="btn-next"></a>
			</section>
			<section class="flex-1 page-1">
				<div class="page-1-wrap">
					<p class="page-content-0">数一数</p>
					<p class="page-content-1">我们在一起也有7年了</p>
					<p class="page-content-2">这7年里，</p>
					<p class="page-content-3">有过争吵，有过分离</p>
					<p class="page-content-4">幸运的是，</p>
					<p class="page-content-5">你还在我的身边</p>

					<div class="page-1-pic">
						<div class="page-1-mark"></div>
					</div>
				</div>
				<a href="#none" class="btn-next"></a>
			</section>
			<section class="flex-1 page-2">
				<div class="page-2-wrap-2">
					<div class="bus center"></div>
					<div class="phone center">
						<div class="phone-top"></div>
						<div class="phone-bottom"></div>
					</div>
					<div class="bike">
						<div class="bike-top"></div>
						<div class="bike-bottom"></div>
					</div>
				</div>
				<div class="page-2-wrap-0">
					<p class="page-content-0 page-2-title">初中...</p>
					<p class="page-content-1">你陪我等的23路公车</p>
					<p class="page-content-2 page-2-title">高中...</p>
					<p class="page-content-3">你每晚准时的电话</p>
					<p class="page-content-4 page-2-title">大学...</p>
					<p class="page-content-5">每星期出现在宿舍楼下的单车</p>
				</div>
				<div class="page-2-wrap-1 page-2-title">
					<p class="page-content-1">不知不觉，</p>
					<p class="page-content-1">你已经成为了我生命里最重要的习惯</p>
				</div>
				<a href="#none" class="btn-next"></a>
			</section>
			<section class="flex-1 page-3">
				<div class="page-3-wrap-0">
					<p class="">你睡觉的模样</p>
					<img src="img/love/1.png" class="page-3-img-0">
				</div>
				<div class="page-3-wrap-0">
					<p class="">你认真的模样</p>
					<img src="img/love/2.png" class="page-3-img-0">
				</div>
				<div class="page-3-wrap-0">
					<p class="page-1-content-1">你开心的模样</p>
					<img src="img/love/3.png" class="page-3-img-0">
				</div>
				<div class="page-3-wrap-0">
					<p class="">你逗比的模样</p>
					<img src="img/love/4.png" class="page-3-img-0">
				</div>
				<div class="page-3-wrap-1">
					<img src="img/love/5.png" class="page-3-img-1">
					<img src="img/love/6.png" class="page-3-img-2">
					<img src="img/love/8.png" class="page-3-img-4">
					<img src="img/love/9.png" class="page-3-img-5">
					<img src="img/love/10.png" class="page-3-img-6">
					<img src="img/love/7.png" class="page-3-img-3">
				</div>
				<a href="#none" class="btn-next"></a>
			</section>
			<section class="flex-1 page-4">
				<div class="page-4-wrap">
					<p class="page-content-0">7年</p>
					<p class="page-content-1">我们之间已经从青涩的交往</p>
					<p class="page-content-2">到现在相看一眼便知道彼此的小心思</p>
					<p class="page-content-3">新鲜感似乎已经不再是维系我们感情的绳索</p>
				</div>
				<a href="#none" class="btn-next"></a>
			</section>
			<section class="flex-1 page-5">
				<div class="page-5-wrap-0">
					<p class="page-content-0 page-5-tips">&nbsp;&nbsp;&nbsp;&nbsp;可是相比于和未知的人一起去做同样的事情，它真正的意义难道不是和已知的人去体验未知的人生么</p>
					<p class="page-content-2">而我，</p>
					<p class="page-content-4">愿意一直保持着这份新鲜感。</p>
				</div>
				<div class="page-5-wrap-1">
					<p  class="page-content-5 page-5-bold">就像卡农...</p>
					<p class="page-content-8 page-5-bold">你若声调上扬，我必和声相随</p>
				</div>
				<a href="#none" class="btn-next"></a>
			</section>
			<section class="flex-1 page-6">
				<div class="page-6-wrap">
					<div class="page-plane">
						<div class="plane-front front">
							<input type="text" class="plane-name" placeholder="hey,name?">
							<textarea class="plane-message" placeholder="say something"></textarea>
							<button class="plane-btn" id="send-btn">祝福</button>
						</div>
						<div class="plane-back back">
							<div class="plane-left">
								<div class="top_left curvable"></div>
								<div class="bottom_left curvable"></div>
								<div class="wing wing1"></div>
								<div class="wing wing2"></div>
							</div>
							<div class="plane-right">
								<div class="top_right curvable"></div>
								<div class="bottom_right curvable"></div>
								<div class="wing wing3"></div>
								<div class="wing wing4"></div>
							</div>
						</div>
					</div>
				</div>				
			</section>
		</div>
	</div>
	
	<script src="js/global/zepto.min.js"></script>
	<script src="js/global/iscroll-min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/logic/script.js"></script>
	<script src="js/global/easyBackground-min.js" type="text/javascript"></script>
	<script type="text/javascript">

	var title = "立，生日快乐哈！",
		link = "http://fancylin.sinaapp.com/xlbirthday/",
		imgUrl = "http://fancylin.sinaapp.com/xlbirthday/img/love/7.png",
		desc = "hey,哒生日快乐~";
	wx.config({
	    debug: false,
	    appId: '<?php echo $signPackage["appId"];?>',
	    timestamp: <?php echo $signPackage["timestamp"];?>,
	    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
	    signature: '<?php echo $signPackage["signature"];?>',
	    jsApiList: [
	      	'onMenuShareTimeline',
		    'onMenuShareAppMessage',
		    'onMenuShareQQ',
		    'onMenuShareWeibo'
	    ]
	});
	wx.ready(function(){
		wx.onMenuShareTimeline({
		    title: title, // 分享标题
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    success: function (res) {
		    	alert("success");
		    },
		    fail: function () {
		    	alert("fail");
		    }
		});
		wx.onMenuShareAppMessage({
		    title: title, // 分享标题
		    desc: desc, // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    success: function (res) {
		    	alert("success");
		    },
		    fail: function () {
		    	alert("fail");
		    }
		});
	});

	</script>
</body>
</html>