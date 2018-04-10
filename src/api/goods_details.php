<?php
	
	//连接数据
	require('connect.php');
	
	
		$id = isset($_GET['id']) ? $_GET['id']: null;
		
		
		
		
		//建立sql语句
		$sql  = "SELECT * FROM goodslist WHERE id = '$id'";
		
	  //获取查询结果集
    $result = $conn->query($sql);
//  var_dump($result) ;
    

    //使用查询结果集
    //得到数组
	  $row = $result->fetch_all(MYSQLI_ASSOC);

    //释放查询结果集，避免资源浪费
    $result->close();

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);

    // 关闭数据库，避免资源浪费
    $conn->close();
?>