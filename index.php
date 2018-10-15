<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<?php 
	function cartaElegida(){
	$cartaDir = 'cartas/*';
	$cartas = glob($cartaDir . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);
	$cartaRandom = $cartas[array_rand($cartas)];
	echo "<img src='$cartaRandom'>\n";
	}
	cartaElegida();
	 ?>

</body>
</html>