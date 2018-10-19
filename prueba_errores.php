<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<?php
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
				if (strpos($config_array[0], " ")){//sirve para encontrar si existe el espacio para poder meterlo en un array
					list($config_gafas_1, $config_gafas_2, $config_gafas_3) = explode(" ", $config_array[0]);
					//$config_array_gafas[0]=$config_gafas_1;
					$config_array_gafas[1]=$config_gafas_2;
					$config_array_gafas[2]=$config_gafas_3;
				}
				//guarda en un array el archivo de configuracion, es el array del cabello
				if (strpos($config_array[1], " ")){//sirve para encontrar si existe el espacio para poder meterlo en un array
					list($config_cabello_1, $config_cabello_2, $config_cabello_3, $config_cabello_4) = explode(" ", $config_array[1]);
					//$config_array_cabello[0]=$config_cabello_1;
					$config_array_cabello[1]=$config_cabello_2;
					$config_array_cabello[2]=$config_cabello_3;
					$config_array_cabello[3]=$config_cabello_4;
				}
				//guarda en un array el archivo de configuracion, es el array del sexo
				if (strpos($config_array[2], " ")){//sirve para encontrar si existe el espacio para poder meterlo en un array
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
				$array[$i]=trim(str_replace(":", "",(str_replace(" ,", "",(fgets($file))))));//Quita los dos puntos, la coma y los espacios en blanco.

				if (strpos($array[$i], " ")){//sirve para encontrar si existe el espacio para poder meterlo en un array
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
			foreach ($repeated as $key => $value) {
			    echo "ERROR, consulte el log.txt";
				fwrite($flog, "Dia y Hora del error:\t" . date("d/m/Y\tH:i" . PHP_EOL));
				fwrite($flog, "La imagen '$key' se repite $value veces" . PHP_EOL);
				fwrite($flog, PHP_EOL);
			    return false;
			}
			for ($i=0; $i < count($nombre_foto); $i++) { 
				for ($x=$i+1; $x < count($nombre_foto); $x++) { 
					if ($respuesta_gafas[$i]==$respuesta_gafas[$x] && $respuesta_cabello[$i]==$respuesta_cabello[$x] && $respuesta_sexo[$i]==$respuesta_sexo[$x]){
						
						echo "ERROR, consulte el log.txt";
					    fwrite($flog, "Dia y Hora del error:\t" . date("d/m/Y\tH:i" . PHP_EOL));
					    fwrite($flog, "La foto con nombre '$nombre_foto[$x]' tiene los atributos repetidos" . PHP_EOL);
					    fwrite($flog, PHP_EOL);
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

		errores();

		?>
</body>
</html>