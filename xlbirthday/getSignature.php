<?php
  $appid = "wx1fdcd54e97e72cbc";
  $secret = "08af732d37cef9d8a9f546a9c418f062";
  $mmc=memcache_init();//初始化缓存  
  $token=memcache_get($mmc,"access_token");//获取Token  
  if(empty($token)){//判断是否为空，如为空则重新获取Token
    $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$secret";
    $json = file_get_contents($url);
    $arr = json_decode($json,true);
    $token = $arr['access_token'];
    memcache_set($mmc,"access_token",$token,0,7200);//过期时间为7200秒  
    $token=memcache_get($mmc,"token");//获取Token  
  }
  $ticket=memcache_get($mmc,"jsapi_ticket");//获取Token  
  if(empty($ticket)){
      $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$token&type=jsapi";
      $json = file_get_contents($url);
      $arr = json_decode($json,true);
      $ticket = $arr['ticket'];
      memcache_set($mmc,"jsapi_ticket",$ticket,0,7200);//过期时间为7200秒  
      $ticket=memcache_get($mmc,"jsapi_ticket");//获取Token  
  }
 
  $nonceStr = "1234567890";
  $nowUrl = $_POST["nowUrl"];
  $timestamp = time();
  $str = "jsapi_ticket=".$ticket."&noncestr=".$nonceStr."&timestamp=".$timestamp."&url=".$nowUrl."";

  $result["string"] = $str;
  $result['token'] = $token;
  $result['ticket'] = $ticket;
  $result["signature"] = sha1($str);
  $result["appid"] = $appid;
  $result["nonceStr"] = $nonceStr;
  $result["timestamp"] = $timestamp;
  $result["nowUrl"] = $nowUrl;
  echo json_encode($result, true);
  ?>