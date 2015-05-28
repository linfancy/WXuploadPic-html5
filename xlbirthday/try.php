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
   <title>立，生日快乐哈</title>
   <link rel="stylesheet" type="text/css" href="css/style.css?v=20150202">
</head>
<body>
<script src="js/global/zepto.min.js"></script>
<script type="text/javascript">
var $_GET = (function(){
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();
if(!$_GET["code"]){
   var url = "http%3A%2F%2Ffancylin.sinaapp.com%2Ftry.php";
   var appid = "wx1fdcd54e97e72cbc";
   var redirect = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo#wechat_redirect";
   window.location.href = redirect;
}else{
   var title = "";
   history.pushState({ title: "立，生日快乐哈" }, title, location.href.split("?")[0]);
}
</script>
<script src="js/global/iscroll-min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/logic/script.js?v=20150202"></script>
<?php
   if($_GET){
      $appid = "wx1fdcd54e97e72cbc";
      $secret = "08af732d37cef9d8a9f546a9c418f062";
      $code = $_GET['code'];
      $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$secret."&code=".$code."&grant_type=authorization_code";
      $json = file_get_contents($url);
      $arr = json_decode($json,true);
      $token = $arr['access_token'];
      $openid = $arr['openid'];
      $url = "https://api.weixin.qq.com/sns/userinfo?access_token=$token&openid=$openid";
      $json = file_get_contents($url);
      $arr = json_decode($json,true);
      $name = $arr['nickname'];
      $imgURL = $arr['headimgurl'];
      $sex = $arr['sex'];
      $province = $arr['province'];
      $city= $arr['city'];
      $country= $arr['country'];

      echo "<input type='hidden' id='info' value='".$name."##".$imgURL."##".$sex."##".$province."##".$city."##".$country."'>";
?>
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
         </section>
         <section class="flex-1 page-2">
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
         </section>
         <section class="flex-1 page-4">
            <div class="page-4-wrap">
               <p class="page-content-0">有人问...</p>
               <p class="page-content-1">这么多年了，新鲜感呢？</p>
            </div>
         </section>
         <section class="flex-1 page-5">
            <div class="page-5-wrap-0">
               <p class="page-content-0 page-5-tips">&nbsp;&nbsp;&nbsp;&nbsp;所谓的新鲜感，不是和未知的人一起去做同样的事情，而是和已知的人去体验未知的人生</p>
               <p class="page-content-1">而我，</p>
               <p class="page-content-3">愿意一直保持着这份新鲜感。</p>
            </div>
            <div class="page-5-wrap-1">
               <p  class="page-content-4 page-5-bold">就像卡农...</p>
               <p class="page-content-7 page-5-bold">你若声调上扬，我必和声相随</p>
            </div>
         </section>
         <section class="flex-1 page-6">
            <div class="page-6-wrap">
               <p class="page-content-0 page-6-title">说几句吧</p>
               <div class="page-plane">
                  <div class="plane-front front">
                     <textarea class="plane-message"></textarea>
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
   <script src="js/global/easyBackground-min.js" type="text/javascript"></script>
   <?php }?>
</body>
</html>