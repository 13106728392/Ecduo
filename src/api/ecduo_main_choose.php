<?php

		//先请求连接到数据库
	require('connect.php');
	
	
	
	$fisttime = isset($_GET['fisttime']) ? $_GET['fisttime']: null;
	$page = isset($_GET['page']) ? $_GET['page']: 1;
	//一页显示的数量
	$qty = isset($_GET['qty'])  ? $_GET['qty']:20;
	$address = isset($_GET['address']) ? $_GET['address']: null;
	$styles = isset($_GET['styles'])  ? $_GET['styles']:null;
	$pricetype = isset($_GET['pricetype'])  ? $_GET['pricetype']:null;
	$sequencing = isset($_GET['sequencing'])  ? $_GET['sequencing']:1;
	
	
	
	//创建新的sql查询语句
	if($fisttime){
		$sql = "SELECT * FROM goodslist";
	}else if($address){
		$sql = "SELECT * FROM goodslist WHERE address= '$address'";
	}else if($styles){
		$sql = "SELECT * FROM goodslist WHERE style = '$styles'";
	}else if($pricetype == 1){
		$sql = "SELECT * FROM  goodslist where price BETWEEN 0 and 30";
	}else if($pricetype == 2){
		$sql = "SELECT * FROM  goodslist where price BETWEEN 30 and 50";
	}else if($pricetype == 3){
		$sql = "SELECT * FROM  goodslist where price BETWEEN 50 and 80";
	}else if($pricetype == 4){
		$sql = "SELECT * FROM  goodslist where price  >80";
	}else if($sequencing ==1){
		$sql = 'SELECT * FROM goodslist';
	}else if($sequencing ==2){
		$sql = 'SELECT * FROM  goodslist ORDER BY sales desc';
	}else if($sequencing ==3){
		$sql = 'SELECT * FROM  goodslist ORDER BY sales';
	}else if($sequencing ==4){
		//升序的
		$sql = 'SELECT * FROM  goodslist ORDER BY price';
	}else if($sequencing ==5){
		//降序的
		$sql = 'SELECT * FROM  goodslist ORDER BY price desc';
	}
	
	
	
	
	
	
	//获得数据
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	
	
	
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