<?php
error_reporting(0);
$uploaddir = "../upload/";
$type = array("jpg", "gif", "bmp", "jpeg", "png");
$result['status'] = 0;
$result['info'] = "success";

/**
 * [生成随机文件名函数]
 * @param  [type] $length [description]
 * @return [type]         [description]
 */
function random($length){
	$hash = 'CR-';
	$chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
	$max = strlen($chars) - 1;
	mt_srand((double)microtime() * 1000000);
	for($i = 0; $i < $length; $i++){
		$hash .= $chars[mt_rand(0, $max)];
	}
	return $hash;
}
if(!empty($_POST)){
	if(!empty($_POST['imgdata'])){
		$imgdata = $_POST['imgdata'];
		$tmp  = base64_decode($imgdata);
		$filename = random(10).".png";
		do{
			$filename = random(10);
			$filename.=".png";
			$uploadfile = $uploaddir.$filename;
		}while (file_exists($uploadfile));
		try{
			$status = file_put_contents($uploadfile, $tmp);
		}catch(Exception $e){
			echo json_encode($result, true);
			exit();
		}
		if(!$status){
			$result['status'] = 1;
			$result['info'] = '图片上传失败';
		}
		
	}else{
		$result['status'] = 1;
		$result['info'] = '图片上传失败';
	}
}else{
	$result['status'] = 1;
	$result['info'] = '图片上传失败';
}
echo json_encode($result, true);