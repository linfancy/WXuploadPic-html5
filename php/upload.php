<?php

$uploaddir = "../upload/";
$type = array("jpg", "gif", "bmp", "jpeg", "png");

/**
 * [获取文件后缀名]
 * @param  [string] $filename [文件名]
 * @return [string] fileext [文件后缀名]
 */
function fileext($filename){
	return substr(strrchr($filename, '.'), 1);
}

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
		if(!file_put_contents($uploadfile, $tmp)){
			echo "上传图片失败";
		}
	}else{
		echo "没有图片";
	}
}else{
	echo "fail";
}