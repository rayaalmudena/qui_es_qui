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
		while (!feof($file)) {
			$carta=trim(fgets($file));
			if (empty($carta)) {
				# salto
			} else {
				array_push($cartas,$carta);
			} 	
  		}
    		fclose($file);
    		shuffle($cartas);

    		foreach ($cartas as $carta) {
			$cartaNueva;
			$carta=explode('_',$carta);
			$nombre="$carta[0]";
			$gafas="$carta[2]";
			$cabello="$carta[4]";
			$sexo="$carta[6]";
			$contador=$contador+1;
			$cartaNueva= array("nombre"=>$nombre,"gafas"=>$gafas,"cabello"=>$cabello,"sexo"=>$sexo);
			$cartasFinal[]=$cartaNueva;	
    	}
		return $cartasFinal;
	}
	function cartaElegida($cartas){
		$cartaElegida = $cartas[0];
		echo "<img height='200' src='cartas/$cartaElegida[nombre]' class='cartaElegida' gafas='$cartaElegida[gafas]' cabello='$cartaElegida[cabello]' sexo='$cartaElegida[sexo]' name='$cartaElegida[nombre]'>";
	}

	function tableroCartas($cartas){
		$tabla='<div class="flip">';
		$tabla .='<table><tr>';
		$c = 0;

		while ($c< count($cartas)){
			$carta=$cartas[$c];
			$tabla .="\n\t<td><img src='cartas/$carta[nombre]' class='carta card' gafas='$carta[gafas]' cabello='$carta[cabello]' sexo='$carta[sexo]' name='$carta[nombre]'><td>";
			$c++;
			if ($c==count($cartas)){
				$tabla .="</tr>\n";	
				$tabla .="</table>\n</div>";
			}
			if ($c%3==0 && $c!=count($cartas)){
				$tabla .="\n</tr><tr>";
			}
		}
		return $tabla;
	}
	

	/*<div class="flip">
		<img src="magooscuro.jpg" class="card" name="mago" onclick="flip(0)"/>
		<img src="blueeyes.jpg" class="card" name="back" onclick="flip(1)"/>
		<img src="exodia.jpg" class="card" name="exodia" onclick="flip(2)"/>
	</div>*/
	$arrayCartaAdivinar=arrayCartas();
	cartaElegida($arrayCartaAdivinar);
	$arrayTablero=arrayCartas();
	echo tableroCartas($arrayTablero);

	?>


</body>
</html>
