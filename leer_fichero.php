<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<!--Para leer el fichero-->
	<?php 

		$file = fopen("fichero.txt", "r");

		while(!feof($file)) {

		echo fgets($file). "<br />";

		}

		fclose($file);

	?>

	<!--Para escribir en el fichero-->

	<?php

		$fp = fopen("fichero.txt","a");
		fwrite($fp, "Texto a escribir" . PHP_EOL);
		fclose($fp);
	?>


</body>
</html>