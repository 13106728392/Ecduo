<?php
	//先请求连接到数据库
	require('connect.php');
	
	$page = isset($_GET['page']) ? $_GET['page']: 1;
	//一页显示的数量
	$qty = isset($_GET['qty'])  ? $_GET['qty']:20;
	
	
	//创建sql命令
	$sql = 'SELECT * FROM goodslist';
	
	
	//获得数据
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	
	
//	//处理数据
//	var_dump($row);
	
	
	//格式化数据
   	$res = array(
   		"total" => count($row),
		"data" => array_slice($row,$qty*($page-1),$qty),
		"qty" => $qty*1,
		"page" => $page*1
   	);
   
  
	
	echo json_encode($res,JSON_UNESCAPED_UNICODE);
	
	
	 $conn->close();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	




?>