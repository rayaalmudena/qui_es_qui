<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="style.css">	
	<script type="text/javascript" src="script.js"></script>
</head>
<body>

	<?php 

	function arrayCartas(){
		$cartas=[];
		$contador=1;
		$file = fopen("imagenes.txt", "r");
			while($contador<=12) {
				$cartaNueva;
				$carta=fgets($file);
				$carta=trim($carta);
				$carta=explode('_',$carta);
				$nombre="$carta[0]";
				$gafas="$carta[2]";
				$cabello="$carta[4]";
				$sexo="$carta[6]";
				$contador=$contador+1;
				$cartaNueva= array(0=>$nombre,1=>$gafas,2=>$cabello,3=>$sexo);
				$cartas[]=$cartaNueva;			
			}
			fclose($file);
			return $cartas;
	}
	function cartaElegida($cartas){
		$cartaElegida = $cartas[array_rand($cartas)];
		echo "<img height='200' src='cartas/$cartaElegida[0]' class='cartaElegida cartas' gafas='$cartaElegida[1]' cabello='$cartaElegida[2]' sexo='$cartaElegida[3]'>";
	}
	<div class="flip">
		<img src="magooscuro.jpg" class="card" name="mago" onclick="flip(0)"/>
		<img src="blueeyes.jpg" class="card" name="back" onclick="flip(1)"/>
		<img src="exodia.jpg" class="card" name="exodia" onclick="flip(2)"/>
	</div>

	
	cartaElegida(arrayCartas());
	 ?>

</body>
</html>