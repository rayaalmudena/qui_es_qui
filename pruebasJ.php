<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>¿Quién es quién?</title>
	<link rel="stylesheet" type="text/css" href="style.css">	
	<script type="text/javascript" src="pruebasJ.js"></script>
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
					$config_array[$z]=trim(str_replace(" ,", "",(fgets($file2))));
					$z=$z+1;
				}
				//guarda en un array el archivo de configuracion, es el array de las gafas
				if (strpos($config_array[0], " ")){
					//sirve para encontrar si existe el espacio para poder meterlo en un array
					list($config_gafas_1, $config_gafas_2, $config_gafas_3, $config_gafas_4, $config_gafas_5) = explode(" ", $config_array[0]);
					$config_array_gafas[0]=$config_gafas_2;
					$config_array_gafas[1]=$config_gafas_3;
					$config_array_gafas[2]=str_replace("_", " ",$config_gafas_4);
					$config_array_gafas[3]=str_replace("_", " ",$config_gafas_5);
				}
				//guarda en un array el archivo de configuracion, es el array del cabello
				if (strpos($config_array[1], " ")){
					//sirve para encontrar si existe el espacio para poder meterlo en un array
					list($config_cabello_1, $config_cabello_2, $config_cabello_3, $config_cabello_4, $config_cabello_5, $config_cabello_6, $config_cabello_7) =
						explode(" ", $config_array[1]);
					$config_array_cabello[0]=$config_cabello_2;
					$config_array_cabello[1]=$config_cabello_3;
					$config_array_cabello[2]=$config_cabello_4;
					$config_array_cabello[3]=str_replace("_", " ",$config_cabello_5);
					$config_array_cabello[4]=str_replace("_", " ",$config_cabello_6);
					$config_array_cabello[5]=str_replace("_", " ",$config_cabello_7);
				}
				//guarda en un array el archivo de configuracion, es el array del sexo
				if (strpos($config_array[2], " ")){
					//sirve para encontrar si existe el espacio para poder meterlo en un array
					list($config_sexo_1, $config_sexo_2, $config_sexo_3, $config_sexo_4, $config_sexo_5) = explode(" ", $config_array[2]);
					$config_array_sexo[0]=$config_sexo_2;
					$config_array_sexo[1]=$config_sexo_3;
					$config_array_sexo[2]=str_replace("_", " ",$config_sexo_4);
					$config_array_sexo[3]=str_replace("_", " ",$config_sexo_5);
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
		if (errores()!=true) {
			//En caso de que salga un error, no se iniciara el programa, y saldra el error
			//echo "<br>No se puede iniciar el programa <br>";
		}
		else{
			//en caso de que no hayan errores, se iniciara el programa:
		
			
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
				$cartaElegida= "<img  src='cartas/$cartaElegida[nombre]' class='cartaElegida' carta='front' gafas='$cartaElegida[gafas]' cabello='$cartaElegida[cabello]'sexo='$cartaElegida[sexo]' name='$cartaElegida[nombre]'>";
				$backCarta="<img src='cartas/back.png'>";
				$Elegida='<div id="lateral"><div class="container containerElegida"><div class="card cardE" id="cartaElegida"><div class="front">';
				$Elegida .=$backCarta;
				$Elegida .='</div><div class="back">';
				$Elegida .=$cartaElegida;
				$Elegida .='</div></div></div><br><a id="enlaceRecords" target="_blank" href="taularecords.php" class="button">Taula de records</a></div>';
				echo $Elegida;


			}
			function tableroCartas($cartas){
				$tabla ="\n";
				$tabla .='<div id="tablero"><table><tr>';
				$c = 0;
				$backCarta="<img src='cartas/back.png'>";
				while ($c< count($cartas)){
					$carta=$cartas[$c];
					//var_dump($carta);
					$cartaImg="<img src='cartas/$carta[nombre]' class='carta card' gafas='$carta[gafas]' cabello='$carta[cabello]' sexo='$carta[sexo]' name='$carta[nombre]' onclick=clickPasaNombre('$carta[nombre]')>";
					$tabla .="\n";
					$tabla .='<td><div class="container"><div class="card" id="$carta[nombre]"  onclick="puedeGirarCarta(event)"><div class="front">';
					$tabla .=$cartaImg;
					$tabla .='</div><div class="back">';
					$tabla .=$backCarta;	
					$tabla .='</div></div></div><td>';
					$c++;
					if ($c==count($cartas)){
						$tabla .='</tr>';
						$tabla .="\n";	
						$tabla .='</table></div>';
						$tabla .="\n";
					}
					if ($c%3==0 && $c!=count($cartas)){
						$tabla .="\n";
						$tabla .='</tr><tr>';
					}
				}
				return $tabla;
			}

			
			$arrayCartaAdivinar=arrayCartas();			
			cartaElegida($arrayCartaAdivinar);
			echo "<br>";
			$arrayTablero=arrayCartas();
			echo tableroCartas($arrayTablero);

			//Esto y el siguiente echo es para pasar datos al JS para la respuesta del server
			$nombre_carta=trim($arrayCartaAdivinar[0]["nombre"]);
			$gafas_carta=trim($arrayCartaAdivinar[0]["gafas"]);
			$cabello_carta=trim($arrayCartaAdivinar[0]["cabello"]);
			$sexo_carta=trim($arrayCartaAdivinar[0]["sexo"]);

			//Este echo se utiliza para guardar o enviar variables entre el php y el javascript.
			echo "<p id='nombre_php-js' >$nombre_carta</p>
			<p id='gafas_php-js' hidden>$gafas_carta</p>
			<p id='cabello_php-js' hidden>$cabello_carta</p>
			<p id='sexo_php-js' hidden>$sexo_carta</p>";
			
			//Fuegos artificiales
			echo '<canvas id="canvas"></canvas>';


			?>
			<div id="divtexto">
			<div id="comboDif">
				<p>Elige dificultad </p>
				<select id="dificultad" class="cboxdificultad" onchange='fijarDificultad()'>
					<option  name="dificultad" value="--NORMAL--">--NORMAL--</option>
					<option  name="dificultad" value="Easy">EASY</option>
					<option  name="dificultad" value="Very Easy">VERY EASY</option>
				</select>
			</div>
			<p id="textoEasy"></p>	
			<p id="p_contador_preguntas">Contador de clicks:<p id="contador_preguntas"></p></p>

			<div id="combobox">

				<?php 
				$config_array=[];

				$file2 = fopen("config.txt", "r");
				$z=0;
				while(!feof($file2)) {
					$config_array[$z]=trim(str_replace(" ,", "",(fgets($file2))));
					$z=$z+1;
				}
				fclose($file2);

				$nuevoCombobox=[];

				$combo_gafas = explode(" ", $config_array[0]);
				unset($combo_gafas[0],$combo_gafas[1],$combo_gafas[2]);

				$combo_cabello = explode(" ", $config_array[1]);
				unset($combo_cabello[0],$combo_cabello[1],$combo_cabello[2],$combo_cabello[3]);

				$combo_sexo = explode(" ", $config_array[2]);
				unset($combo_sexo[0],$combo_sexo[1],$combo_sexo[2]);


				$nuevoCombobox = str_replace("_", " ",array_merge($combo_gafas,$combo_cabello,$combo_sexo));
				echo "<select id='pregunta' onchange='activarBoton()'>";
				echo "<option>----</option>";
					foreach ($nuevoCombobox as $key => $value) {
						echo "<option name='pregunta_combo' value='$value'>$value</option>";
					}
				echo "</select> <br><br>";


				echo "<button id='hacerPregunta' onclick='girarCuandoDeba()' disabled>Fes la pregunta</button>";

				?>


				<br>
				<p id="texto_salida"></p>
				<img  src="botones/BotonRojo.gif" id="botonDeColorRojo">
				<img  src="botones/BotonVerde.gif" id="botonDeColorVerde">

				<br>

				<p id="CuentaAtras"></p>

			</div>
			</div>
			<?php 


			
		}

	?>

	




<!-- Comienza el modal del aviso -->

<div id="AvisoPregunta" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <p id="letra_modal_aviso">Has preguntado sin girar carta!</p>
	<button class="cerrar_Aviso">Ok</button>

  </div>

</div>
<!-- acaba el modal del aviso -->

<!-- Comienza el modal del fin del juego ganando!-->

<div id="Fin_del_juego_bueno" class="modal">

  <!-- Modal content -->
  <div class="modal-content_ganado">
    <p id="letra_modal_aviso_ganado">Felicidades, has ganado!, Quieres guardar tu puntuacion?</p>
	<button class="ganado_Opcion_Si">Si</button>
	<button class="ganado_Opcion_No">No</button>
  </div>
</div>
<!-- acaba el modal del fin del juego ganando!-->

<!-- Comienza el modal del fin del juego prediendo..-->

<div id="Fin_del_juego_malo" class="modal">

  <!-- Modal content -->
  <div class="modal-content_perdido">
    <p id="letra_modal_aviso_perdido">Has perdido.., Quieres guardar tu puntuacion?</p>
	<button class="perdido_Opcion_Si">Si</button>
	<button class="perdido_Opcion_No">No</button>
  </div>
</div>
<!-- acaba el modal del fin del juego perdido..-->

<!-- Comienza el modal de introducir datos -->

<div id="modal_guardar_nombre" class="modal">

  <!-- Contenido del modal de introducir datos -->
  <div class="modal-content">
	    <p id="letra_modal_aviso2">Escribe tu nombre o nick para guardar récord:</p>
	    <p id="contador_preguntas2" hidden></p>
	    <input type="text" name="nombreJugador" id="nombre_para_enviar"><br><br>
	    <button class="enviarNombre">Aceptar</button>
	    <button class="Cerrar_Ventana_Usuario"> Cancelar</button>
  </div>

</div>
<!-- acaba el modal de introducir datos -->

</body>
</html>