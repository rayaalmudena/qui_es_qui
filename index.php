<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>¿Quién es quién?</title>
	<link rel="stylesheet" type="text/css" href="style.css">	
	<script type="text/javascript" src="script.js"></script>
</head>
<body>
	
	<?php 
	//Comienzo de los posibles errores
	//Los errores apareceran por orden que indica en la guia del leandro, primero apareceran los nombres repetidos, luego los atributos repetidos y luego los atributos que no existan en el config
	function errores(){
				//Archivo de configuracion, para el Punto 3 errores
			$config_array=[];
			$config_array_gafas=[];
			$config_array_cabello=[];
			$config_array_sexo=[];
			$file2 = fopen("config.txt", "r");
			$z=0;
			while(!feof($file2)) {
				$config_array[$z]=fgets($file2). "_<br />";
				$z=$z+1;
			}
				//guarda en un array el archivo de configuracion, es el array de las gafas
				if (strpos($config_array[0], '_')){//si no pongo esto, la ultima linea no me la compara
					list($config_gafas_1, $config_gafas_2, $config_gafas_3) = explode("_", $config_array[0]);
					$config_array_gafas[0]=$config_gafas_1;
					$config_array_gafas[1]=$config_gafas_2;
					$config_array_gafas[2]=substr($config_gafas_3, 0, -1);//siempre tiene saltos de linea
				}
				//guarda en un array el archivo de configuracion, es el array del cabello
				if (strpos($config_array[1], '_')){//si no pongo esto, la ultima linea no me la compara
					list($config_cabello_1, $config_cabello_2, $config_cabello_3, $config_cabello_4) = explode("_", $config_array[1]);
					$config_array_cabello[0]=$config_cabello_1;
					$config_array_cabello[1]=$config_cabello_2;
					$config_array_cabello[2]=$config_cabello_3;
					$config_array_cabello[3]=substr($config_cabello_4, 0, -1);//siempre tiene saltos de linea
				}
				//guarda en un array el archivo de configuracion, es el array del sexo
				if (strpos($config_array[2], '_')){//si no pongo esto, la ultima linea no me la compara
					list($config_sexo_1, $config_sexo_2, $config_sexo_3) = explode("_", $config_array[2]);
					$config_array_sexo[0]=$config_sexo_1;
					$config_array_sexo[1]=$config_sexo_2;
					$config_array_sexo[2]=$config_sexo_3;
				}
			fclose($file2);
			//Punto 2 errores
			$array=[];
			$i=0;
			$nombre_foto=[];
			$respuesta_gafas=[];
			$respuesta_cabello=[];
			$respuesta_sexo=[];
			$file = fopen("imagenes.txt", "r");
			while(!feof($file)) {
				$array[$i]=fgets($file);
				if (strpos($array[$i], '_')){//si no pongo esto, la ultima linea no me la compara
					list($nombre, $gafas, $gafas2, $cabello, $cabello2, $sexo, $sexo2) = explode("_", $array[$i]);
					$nombre_foto[$i]=$nombre;
					$respuesta_gafas[$i]=$gafas2;
					$respuesta_cabello[$i]=$cabello2;
					$respuesta_sexo[$i]=substr($sexo2, 0, -1);//coge dos valores de mas, asi que se los quitamos
				}
				$i=$i+1;
			}
			fclose($file);
			//con esto de aqui, detecta si hay un nombre repetido, y lo indica (punto 1 de errores)
			$repeated = array_filter(array_count_values($nombre_foto), function($count) {
			    return $count > 1;
			});
			foreach ($repeated as $key => $value) {
			    echo "La imagen '$key' se repite $value veces <br />";
			    return false;
			}
			for ($i=0; $i < count($nombre_foto); $i++) { 
				for ($x=$i+1; $x < count($nombre_foto); $x++) { 
					if ($respuesta_gafas[$i]==$respuesta_gafas[$x] && $respuesta_cabello[$i]==$respuesta_cabello[$x] && $respuesta_sexo[$i]==$respuesta_sexo[$x]){
							
						echo "$i, $x <br>";
						echo " ";
						echo "La foto con nombre: ";
						echo $nombre_foto[$x];
						echo ", ";
						echo $respuesta_gafas[$x];
						echo " tiene gafas, su pelo es de color: ";
						echo $respuesta_cabello[$x];
						echo ", y su sexo es: ";
						echo $respuesta_sexo[$x];
						echo "<br>";
						echo(" esta REPETIDO <br> <br>");
						return false;
					}
				}
			}
			//punto 3 de errores otra vez
			foreach ($nombre_foto as $key => $value) {
				if (in_array($respuesta_gafas[$key], $config_array_gafas)) {
			    	/*echo "existe gafas: $key, de $value <br>";*/
				}
				else{
					echo "No existe gafas: $respuesta_gafas[$key], de $value <br>";
					return false;
				}
				if (in_array($respuesta_cabello[$key], $config_array_cabello)) {
				    /*echo "existe el cabello: $key, de: $value <br>";*/
				}
				else{
					echo "No existe el cabello: $respuesta_cabello[$key], de: $value <br>";
					return false;
				}
				if (in_array($respuesta_sexo[$key], $config_array_sexo)) {
				    /*echo "existe el sexo: $key, de: $value <br>";*/
				}
				else{
					echo "No existe el sexo: $respuesta_sexo[$key], de: $value <br>";
					return false;
				}
			}
			return true;
		}
//fin de los errores
		if (errores()!=true) {//En caso de que salga un error, no se iniciara el programa, y saldra el error
			echo "No se puede iniciar el programa <br>";
		}
		else{//en caso de que no hayan errores, se iniciara el programa:
		
			?>


			<div id="combobox">

				<p>Tiene gafas? </p>
				<select id="gafas">
					<option name="gafas" value="---">---</option>
					<option name="gafas" value="si">si</option>
					<option name="gafas" value="no">no</option>
				</select>

				<br>

				<p>De que color es su cabello? </p>
				<select id="cabello">
					<option name="cabello" value="---">---</option>
					<option name="cabello" value="moreno">moreno</option>
					<option name="cabello" value="rubio">rubio</option>
					<option name="cabello" value="pelirrojo">pelirrojo</option>
				</select>

				<br>

				<p>De que sexo es? </p>
				<select id="sexo">
					<option name="sexo" value="---">---</option>
					<option name="sexo" value="hombre">hombre</option>
					<option name="sexo" value="mujer">mujer</option>
				</select>

				<br><br>
				
				<button onclick="combobox()">Fes la pregunta</button>

				<br>
				<p id="texto_salida"></p>

			</div>



			<?php 
			function arrayCartas(){
				$cartas=[];
				$contador=1;
				$file = fopen("imagenes.txt", "r");
				while (!feof($file)) {
					$carta =fgets($file);
					$carta=str_replace(":", "", $carta);
					$carta=rtrim($carta, "\n");
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
						$carta=explode(' ',$carta);
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
				echo "<img  src='cartas/$cartaElegida[nombre]' class='cartaElegida' carta='front' gafas='$cartaElegida[gafas]' cabello='$cartaElegida[cabello]' sexo='$cartaElegida[sexo]' name='$cartaElegida[nombre]'>";
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
			

			$arrayCartaAdivinar=arrayCartas();			
			cartaElegida($arrayCartaAdivinar);
			$arrayTablero=arrayCartas();
			echo tableroCartas($arrayTablero);
		}
	?>


</body>
</html>