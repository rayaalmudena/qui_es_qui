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
	//Los errores apareceran por orden que indica en la guia del leandro, primero apareceran los nombres repetidos,
	//luego los atributos repetidos y luego los atributos que no existan en el config
	function errores(){
		$flog = fopen("log.txt","a"); //Se abre el fichero donde se guardaran los errores
			
				//Archivo de configuracion, para el Punto 3 errores
				$config_array=[];
				$config_array_gafas=[];
				$config_array_cabello=[];
				$config_array_sexo=[];
				$file2 = fopen("config.txt", "r");
				$z=0;
				while(!feof($file2)) {
					$config_array[$z]=trim(fgets($file2));
					$z=$z+1;
				}
				//guarda en un array el archivo de configuracion, es el array de las gafas
				if (strpos($config_array[0], " ")){
					//sirve para encontrar si existe el espacio para poder meterlo en un array
					list($config_gafas_1, $config_gafas_2, $config_gafas_3) = explode(" ", $config_array[0]);
					//$config_array_gafas[0]=$config_gafas_1;
					$config_array_gafas[1]=$config_gafas_2;
					$config_array_gafas[2]=$config_gafas_3;
				}
				//guarda en un array el archivo de configuracion, es el array del cabello
				if (strpos($config_array[1], " ")){
					//sirve para encontrar si existe el espacio para poder meterlo en un array
					list($config_cabello_1, $config_cabello_2, $config_cabello_3, $config_cabello_4) =
						explode(" ", $config_array[1]);
					//$config_array_cabello[0]=$config_cabello_1;
					$config_array_cabello[1]=$config_cabello_2;
					$config_array_cabello[2]=$config_cabello_3;
					$config_array_cabello[3]=$config_cabello_4;
				}
				//guarda en un array el archivo de configuracion, es el array del sexo
				if (strpos($config_array[2], " ")){
					//sirve para encontrar si existe el espacio para poder meterlo en un array
					list($config_sexo_1, $config_sexo_2, $config_sexo_3) = explode(" ", $config_array[2]);
					//$config_array_sexo[0]=$config_sexo_1;
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
					$array[$i]=trim(str_replace(":", "",(str_replace(" ,", "",(fgets($file))))));
					//Quita los dos puntos, la coma y los espacios en blanco.
					if (strpos($array[$i], " ")){
						//sirve para encontrar si existe el espacio para poder meterlo en un array
						list($nombre, $gafas, $gafas2, $cabello, $cabello2, $sexo, $sexo2) = explode(" ", $array[$i]);
						$nombre_foto[$i]=$nombre;
						$respuesta_gafas[$i]=$gafas2;
						$respuesta_cabello[$i]=$cabello2;
						$respuesta_sexo[$i]=$sexo2;
					}
					$i=$i+1;
				}		
				fclose($file);
				//con esto de aqui, detecta si hay un nombre repetido, y lo indica (punto 1 de errores)
				$repeated = array_filter(array_count_values($nombre_foto), function($count) {
				    return $count > 1;
				});
				foreach ($repeated as $key => $value) {//informa del error, y escribe el error en el log.txt
				    echo "ERROR, consulte el log.txt";
					fwrite($flog, "Dia y Hora del error:\t" . date("d/m/Y\tH:i" . PHP_EOL));
					fwrite($flog, "La imagen '$key' se repite $value veces" . PHP_EOL);
					fwrite($flog, PHP_EOL);
				    return false;
				}
				for ($i=0; $i < count($nombre_foto); $i++) { //informa del error, y escribe el error en el log.txt
					for ($x=$i+1; $x < count($nombre_foto); $x++) { 
						if ($respuesta_gafas[$i]==$respuesta_gafas[$x] && 
						$respuesta_cabello[$i]==$respuesta_cabello[$x] && 
						$respuesta_sexo[$i]==$respuesta_sexo[$x]){
							
							echo "ERROR, consulte el log.txt";
						    fwrite($flog, "Dia y Hora del error:\t" . date("d/m/Y\tH:i" . PHP_EOL));
						    fwrite($flog, "La foto con nombre '$nombre_foto[$x]' tiene los atributos repetidos" . PHP_EOL);
						    fwrite($flog, PHP_EOL);
							return false;
						}
					}
				}
				//punto 3 de errores otra vez
				foreach ($nombre_foto as $key => $value) {//informa del error, y escribe el error en el log.txt
					if (in_array($respuesta_gafas[$key], $config_array_gafas)) {
				    	/*echo "existe gafas: $key, de $value <br>";*/
					}
					else{
						echo "ERROR, consulte el log.txt";
						fwrite($flog, "Dia y Hora del error:\t" . date("d/m/Y\tH:i" . PHP_EOL));
						fwrite($flog, "De la foto '$value' no existe el atributo '$respuesta_gafas[$key]'" . PHP_EOL);
						fwrite($flog, PHP_EOL);
						return false;
					}
					if (in_array($respuesta_cabello[$key], $config_array_cabello)) {
					    /*echo "existe el cabello: $key, de: $value <br>";*/
					}
					else{
						echo "ERROR, consulte el log.txt";
						fwrite($flog, "Dia y Hora del error:\t" . date("d/m/Y\tH:i" . PHP_EOL));
						fwrite($flog, "De la foto '$value' no existe el atributo '$respuesta_cabello[$key]'" . PHP_EOL);
						fwrite($flog, PHP_EOL);
						return false;
					}
					if (in_array($respuesta_sexo[$key], $config_array_sexo)) {
					    /*echo "existe el sexo: $key, de: $value <br>";*/
					}
					else{
						echo "ERROR, consulte el log.txt";
						fwrite($flog, "Dia y Hora del error:\t" . date("d/m/Y\tH:i" . PHP_EOL));
						fwrite($flog, "De la foto '$value' no existe el atributo '$respuesta_sexo[$key]'" . PHP_EOL);
						fwrite($flog, PHP_EOL);
						return false;
					}
				}
			fclose($flog);//se cierra el fichero log
			return true;
			}
//fin de los errores

/* AQUI EMPIEZAN LOS ERRORES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		/*if (errores()!=true) {//En caso de que salga un error, no se iniciara el programa, y saldra el error
			echo "No se puede iniciar el programa <br>";
		}
		else{//en caso de que no hayan errores, se iniciara el programa:*/
		if (errores()!=true) {
			//En caso de que salga un error, no se iniciara el programa, y saldra el error
			//echo "<br>No se puede iniciar el programa <br>";
		}
		else{
			//en caso de que no hayan errores, se iniciara el programa:
		

			// aqui se acaban !!!!!!!!!!!!!!!!!!!!!!!
			?>

			<p id="textoEasy"></p>	
			<button id="buttonEasy">EASY</button>

			<div id="combobox">

				<p>¿Qué lleva? </p>
				<select id="gafas" class="cbox gafas">
					<option  name="gafas" value="---">---</option>
					<option  name="gafas" value="si">Gafas</option>
					<option  name="gafas" value="no">Nada</option>
				</select>

				<br>

				<p>¿Su pelo es... ? </p>
				<select id="cabello" class="cbox cabello">
					<option name="cabello" value="---">---</option>
					<option name="cabello" value="moreno">Moreno</option>
					<option name="cabello" value="rubio">Rubio</option>
					<option name="cabello" value="pelirrojo">Pelirrojo</option>
				</select>

				<br>

				<p>¿La persona es... ?</p>
				<select id="sexo" class="cbox sexo">
					<option name="sexo" value="---">---</option>
					<option name="sexo" value="hombre">Hombre</option>
					<option name="sexo" value="mujer">Mujer</option>
				</select>

				<br><br>
				
				<button id="hacerPregunta">Fes la pregunta</button>

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
						$cabello="$carta[5]";
						$sexo="$carta[8]";
						$contador=$contador+1;
						$cartaNueva= array("nombre"=>$nombre,"gafas"=>$gafas,"cabello"=>$cabello,"sexo"=>$sexo);
						$cartasFinal[]=$cartaNueva;	
		    	}
				return $cartasFinal;
			}
			function cartaElegida($cartas){
				$cartaElegida = $cartas[0];
				echo "<img  src='cartas/$cartaElegida[nombre]'
				class='cartaElegida' carta='front'
				gafas='$cartaElegida[gafas]' cabello='$cartaElegida[cabello]'
				sexo='$cartaElegida[sexo]' name='$cartaElegida[nombre]'>";
			}
			function tableroCartas($cartas){
				$tabla='<table><tr>';
				$c = 0;
				while ($c< count($cartas)){
					$carta=$cartas[$c];
					$tabla .="\n\t<td>
						<img src='cartas/$carta[nombre]' class='carta card'
						gafas='$carta[gafas]' cabello='$carta[cabello]'
						sexo='$carta[sexo]' name='$carta[nombre]'><td>";
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