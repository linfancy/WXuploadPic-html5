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
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/style.css?v=20150202">
</head>
<body>
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
}

</script>

<?php 
   // $url = urlencode("http://fancylin.sinaapp.com/try.html");
   // $appid = "wx1fdcd54e97e72cbc";
   // $redirect = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".$url."&response_type=code&scope=snsapi_userinfo#wechat_redirect";
   // header('Location: '.$redirect.'');
 ?>
</body>
</html>