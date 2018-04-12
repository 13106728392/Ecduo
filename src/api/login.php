<?php
	//连接到数据库
	require('connect.php');
	
	$tel = isset($_GET['tel'])  ? $_GET['tel']: null;
	$password = isset($_GET['password'])  ? $_GET['password']: null;
	$password = md5($password);
	
	
	//建立查询语句
	$sql = "SELECT tel,password FROM admin WHERE tel='$tel' AND password='$password'";
	
	
	
		//返回结果集
	$result = $conn->query($sql);
	
	
		if($result->num_rows>0){
			echo'success';
			
		}else{
			echo'fail';
		}
	


		 $conn->close();

?>