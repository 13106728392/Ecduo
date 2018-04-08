<?php
		//连接到数据库
	$servername = 'localhost';
	$username='root';
	$password= '';
	$dbname = 'ecduo';
	
	
	//创建连接
	$conn = new mysqli($servername,$username,$password,$dbname);
	
	//设置编码
	$conn->set_charset('utf8');

		
		
?>