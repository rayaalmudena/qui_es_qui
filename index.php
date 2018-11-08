<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>¿Quién es quién?</title>
	<link rel="stylesheet" type="text/css" href="style.css">	
	<script type="text/javascript" src="js/script.js"></script>
	<script type="text/javascript" src="js/fireworks.js"></script>
</head>
<body>
	
	<?php 

	// Comienza la session (F5)
	session_start();
	
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
					list($config_gafas_1, $config_gafas_2, $config_gafas_3, $config_gafas_4) = explode(" ", $config_array[0]);
					$config_array_gafas[0]=$config_gafas_2;
					$config_array_gafas[1]=$config_gafas_3;
					$config_array_gafas[2]=str_replace("_", " ",$config_gafas_4);
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
						$nombre=trim("$carta[0]");
						$gafas=trim("$carta[2]");
						$cabello=trim("$carta[5]");
						$sexo=trim("$carta[8]");
						$contador=$contador+1;
						$cartaNueva= array("nombre"=>$nombre,"gafas"=>$gafas,"cabello"=>$cabello,"sexo"=>$sexo);
						$cartasFinal[]=$cartaNueva;	
		    	}
		    	//Esto es para la session
				if (isset($_SESSION["sesion_cartasFinal"])){
					return $_SESSION["sesion_cartasFinal"];
				}
				else{
					$_SESSION["sesion_cartasFinal"] = $cartasFinal;
					return $cartasFinal;
				}
			}
			function cartaElegida($cartas){
				$cartaElegida = $cartas[array_rand($cartas)];
				$nomCartaElegida = $cartaElegida;
				$cartaElegida= "<img  src='cartas/$cartaElegida[nombre]' class='cartaElegida' carta='front' gafas='$cartaElegida[gafas]' cabello='$cartaElegida[cabello]'sexo='$cartaElegida[sexo]' name='$cartaElegida[nombre]'>";
				$backCarta="<img src='cartas/back.png'>";
				$Elegida='<div id="lateral"><div class="container containerElegida"><div class="card cardE" id="cartaElegida"><div class="front">';
				$Elegida .=$backCarta;
				$Elegida .='</div><div class="back">';
				$Elegida .=$cartaElegida;
				$Elegida .='</div></div></div><br><a id="enlaceRecords" href="taularecords.php" class="button">Taula de records</a></div>';
				$Elegida .='<div id="divjuntos">';
				//Esto es para la session
				if (isset($_SESSION["sesion_carta_elegida"])){
					echo $_SESSION["sesion_carta_elegida"];
				}
				else{
					$_SESSION["sesion_carta_elegida"] = $Elegida;
					echo $Elegida;
					$_SESSION["sesion_nomCartaElegida"] = $nomCartaElegida;
				}
			}
			function tableroCartas($cartas){
				$tabla ="\n";
				$tabla .='<div id="tablero"><table><tr>';
				$c = 0;
				$backCarta="<img src='cartas/back.png'>";
				while ($c< count($cartas)){
					$carta=$cartas[$c];
					$cartaImg="<img src='cartas/$carta[nombre]' id='carta-$c' class='carta card'>";
					$tabla .="\n";	
					$tabla .='<td><div class="container">';
					$tabla .="\n\t\t";
					$tabla .='<div class="card card-container" id="$c" gafas="'.$carta['gafas'].'" cabello="'.$carta['cabello'].'" sexo="'.$carta['sexo'].'" name="'.$carta['nombre'].'"><div class="front">';
					$tabla .=$cartaImg;
					$tabla .='</div>';
					$tabla .="\n\t\t";
					$tabla .='<div class="back">';
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
			$arrayTablero=arrayCartas();

			//Esto es para la session
			if (isset($_SESSION["sesion_tablero"])){
				echo $_SESSION["sesion_tablero"];
			}
			else{
				$_SESSION["sesion_tablero"] = tableroCartas($arrayTablero);
				echo tableroCartas($arrayTablero);
			}

			
			?>
			<div id="divtexto">
			<div id="comboDif">
				<p id="parrafoElegirDificultad">Elige dificultad </p>
				<select id="dificultad" class="cboxdificultad" onchange='fijarDificultad()'>
					<option  name="dificultad" selected="selected" value="--NORMAL--">--NORMAL--</option>
					<option  name="dificultad" value="Easy">EASY</option>
					<option  name="dificultad" value="Very Easy">VERY EASY</option>
				</select>
			</div>
			<p id="textoEasy"></p>	
			<p id="p_contador_preguntas">Contador de preguntas:<p id="contador_preguntas"></p>

			<div id="combobox">

				<?php 

				$config_array=[];
				$file2 = fopen("config.txt", "r");
				$z=0;
				while(!feof($file2)) {
					$config_array[$z]=trim(fgets($file2));
					$z=$z+1;
				}
				fclose($file2);

				foreach ($config_array as $key => $value) {
					$extraccion = explode(":", $config_array[$key]);
					$palabras_clave[$key] = $extraccion[0]; 
					//se queda con la primera posicion ("gafas, cabello y sexo")
					$respuesta_general = ltrim($extraccion[1]); 
					//se queda con lo demas (respuestas[0] y preguntas[1])
					$respuestas = explode(" ", trim(explode(",", $respuesta_general)[0])); 
					//se queda con las respuestas (si, no, rubio, moreno, mujer, hombre...) pero por separado	
					$array_respuestas[$key] =  $respuestas;

					$preguntas = explode(" ", rtrim(explode(", ", $respuesta_general)[1])); 
					//se queda las preguntas (Tiene_Gafas?...)
					$array_preguntas[$key] =  $preguntas;
					$array_preguntas[$key] =  str_replace("_", " ", $array_preguntas[$key]);
					//quita las "_"	de las preguntas
				}

				echo "<select id='pregunta' onchange='activarBoton()'>";
				echo "<option>----</option>";
					foreach ($array_preguntas as $key => $value) {
						foreach ($value as $key2 => $value2) {
							echo "<option name='".$palabras_clave[$key]."' 
							value='".$array_respuestas[$key][$key2]."'>".$value2."</option>";
						}
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
			</div>
			<?php 
			//Esto y el siguiente echo es para pasar datos al JS para la respuesta del server
			$nombre_carta=trim($_SESSION["sesion_nomCartaElegida"]["nombre"]);
			$gafas_carta=trim($_SESSION["sesion_nomCartaElegida"]["gafas"]);
			$cabello_carta=trim($_SESSION["sesion_nomCartaElegida"]["cabello"]);
			$sexo_carta=trim($_SESSION["sesion_nomCartaElegida"]["sexo"]);
			//Este echo se utiliza para guardar o enviar variables entre el php y el javascript.
			echo "<p id='nombre_php-js' hidden>$nombre_carta</p>
			<p id='gafas_php-js' hidden>$gafas_carta</p>
			<p id='cabello_php-js' hidden>$cabello_carta</p>
			<p id='sexo_php-js' hidden>$sexo_carta</p>";
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
  	<canvas id="canvas"></canvas>
    <p id="letra_modal_aviso_ganado">Felicidades, has ganado!, Quieres guardar tu puntuacion?</p>
    <form name="destruir_sesion" action="destroysession.php" method="POST">
		<button type="button" class="ganado_Opcion_Si">Si</button>
		<button class="ganado_Opcion_No">No</button>
	</form>
  </div>
</div>
<!-- acaba el modal del fin del juego ganando!-->

<!-- Comienza el modal del fin del juego prediendo..-->

<div id="Fin_del_juego_malo" class="modal">

  <!-- Modal content -->
  <div class="modal-content_perdido">
    <p id="letra_modal_aviso_perdido">Has perdido.., buena suerte la proxima vez!</p>
    	<form name="destruir_sesion" action="destroysession.php" method="POST">
			<button class="perdido_Opcion_Cerrar">Cerrar</button>
		</form>
  </div>
</div>
<!-- acaba el modal del fin del juego perdido..-->

<!-- Comienza el modal de introducir datos -->

<div id="modal_guardar_nombre" class="modal">

  <!-- Contenido del modal de introducir datos -->
  <div class="modal-content">
  		<form name="formulario" action="taularecords.php" method="POST">
		    <p id="letra_modal_aviso2">Escribe tu nombre o nick para guardar récord:</p>
		    <input type="text" name="nombreJugador" id="nombre_para_enviar"><br><br>
		    <input type="text" id="puntuacionJugador" name="puntuacionJugador" hidden>
		    <button type="button" class="enviarNombre">Aceptar</button>
		    <button type="submit" class="Cerrar_Ventana_Usuario" formaction="destroysession.php"> Cancelar</button>

  </div>

</div>
<!-- acaba el modal de introducir datos -->

<!-- Comienza el modal que se utilizara para guardar los datos introducidos -->

<div id="guardar_en_txt" class="modal">
  <div class="modal-content">
		<p id="letra_modal_aviso2">Tu nombre se ha guardado correctamente!</p>
		<button class="Cerrar_Guardado">Aceptar</button>
	</form>
  </div>
</div>
<!-- acaba el modal que se utilizara para guardar los datos introducidos -->

<!-- Comienza el modal del easter egg -->

<div id="AvisoEasterEgg" class="modal">

  <div class="modal-content">
    <p id="letra_modal_egg">Easter Egg Activado!</p>
    <img class="ryu_egg" src="easter_egg/ryuP.png">
	<!-- <img class="ryu_egg" src="easter_egg/Ryurender.png"> -->
	<button class="cerrarEgg">Ok</button>

  </div>

</div>
<!-- acaba el modal del easter egg -->

</body>
</html>