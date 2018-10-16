<!DOCTYPE html>
<html>
<head>
	<title></title>
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

	
	cartaElegida(arrayCartas());
	
	
	 ?>

</body>
</html>