<?php
		//连接到数据库
		require('connect.php');
		
		
 	$tel  = isset($_GET['tel']) ? $_GET['tel'] :  null;
 	$password  = isset($_GET['password']) ? $_GET['password'] :  null;
	$type  = isset($_GET['type']) ? $_GET['type'] :  null;
 	$email  = isset($_GET['email']) ? $_GET['email'] :  null;
 	
 	
 	//建立sql查询语句
 	$sql = "select tel from admin where tel='$tel'";
 	
 	//获得结果集
 	$result = $conn->query($sql);
 	
 	if($result->num_rows>0){
 		echo "fail";
 	}else{
 		if($type =="reg"){
 			$password = md5($password);
 			//插入数据库
 			$sql = "INSERT INTO admin (tel, password,email) VALUES ('$tel','$password','$email')";
 			//获得 结果集,判断是否添加成功
			$res = $conn->query($sql);
			
			if($res){
				echo 'success';
			}else{
				echo 'fail';
			}
 		}else{		
 			//可以注册
 			echo 'success';
 		}
 		
 		
 		
 	}
 	
 	
 	
 	
		
?>