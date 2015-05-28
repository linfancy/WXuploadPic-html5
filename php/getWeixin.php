<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx1fdcd54e97e72cbc", "08af732d37cef9d8a9f546a9c418f062");
$signPackage = $jssdk->GetSignPackage();
echo json_encode($signPackage,true);
?>