<?php
	function get_real_ip(){
		$ip=false;
		if(!empty($_SERVER["HTTP_CLIENT_IP"])){
			$ip = $_SERVER["HTTP_CLIENT_IP"];
		}
		if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
			if ($ip) { array_unshift($ips, $ip); $ip = FALSE; }
			for ($i = 0; $i < count($ips); $i++) {
				if (!eregi ("^(10|172\.16|192\.168)\.", $ips[$i])) {
					$ip = $ips[$i];
					break;
				}
			}
		}
		return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
	}

	if($_POST){
		$message = $_POST["message"];
		$name = $_POST["name"];
		$message = htmlspecialchars_decode($message);
		$message = preg_replace("/<(.*?)>/","",$message);
		$message = strip_tags($message);

		$name = htmlspecialchars_decode($name);
		$name = preg_replace("/<(.*?)>/","",$name);
		$name = strip_tags($name);
		if($message != "" || ($name != "")){
			$ip = get_real_ip();
		
			$mysql = new SaeMysql();

			$sql = "INSERT  INTO `message` ( `message`, `messageName`,`messageIp`) VALUES ('"  . $message . "','".$name."','".$ip."') ";
			$mysql->runSql($sql);
			if ($mysql->errno() != 0)
			{
			    die("Error:" . $mysql->errmsg());
			}

			$mysql->closeDb();
		}
		
	}