<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<?php 
	function cartaElegida(){
		$cartaDir = 'cartas/*';
		$cartas = glob($cartaDir.'*.png');
		$cartaRandom = $cartas[array_rand($cartas)];
		echo "<img height='200' src='$cartaRandom'>\n";
	}
	cartaElegida();	
	
	
	 ?>

</body>
</html>