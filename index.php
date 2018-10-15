<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<?php 
	function cartaElegida(){
	$cartaDir = 'cartas/*';
	$cartas = glob($cartaDir.'*.png', GLOB_BRACE);
	$cartaRandom = $cartas[array_rand($cartas)];
	echo "<img height='200' src='$cartaRandom'>\n";
	}
	
	//function cartasRandom(){
	$cartaDir = 'cartas/*';
	$cartas = glob($cartaDir.'*.png', GLOB_BRACE);
	
	//}	
	cartaElegida();
	//cartaRandom();
	 ?>

</body>
</html>