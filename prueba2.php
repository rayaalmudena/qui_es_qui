<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="style.css">	
	<script type="text/javascript" src="script.js"></script>
</head>
<body>

	<?php 
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
				$config_array_gafas[2]=substr($config_gafas_3, 0, -2);//siempre tiene saltos de linea
			}

			//guarda en un array el archivo de configuracion, es el array del cabello
			if (strpos($config_array[1], '_')){//si no pongo esto, la ultima linea no me la compara
				list($config_cabello_1, $config_cabello_2, $config_cabello_3, $config_cabello_4) = explode("_", $config_array[1]);
				$config_array_cabello[0]=$config_cabello_1;
				$config_array_cabello[1]=$config_cabello_2;
				$config_array_cabello[2]=$config_cabello_3;
				$config_array_cabello[3]=substr($config_cabello_4, 0, -2);//siempre tiene saltos de linea
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
				$respuesta_sexo[$i]=substr($sexo2, 0, -2);//coge dos valores de mas, asi que se los quitamos
			}
			$i=$i+1;
		}
		fclose($file);

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
			}
			if (in_array($respuesta_cabello[$key], $config_array_cabello)) {
			    /*echo "existe el cabello: $key, de: $value <br>";*/
			}
			else{
				echo "No existe el cabello: $respuesta_cabello[$key], de: $value <br>";
			}
			if (in_array($respuesta_sexo[$key], $config_array_sexo)) {
			    /*echo "existe el sexo: $key, de: $value <br>";*/
			}
			else{
				echo "No existe el sexo: $respuesta_sexo[$key], de: $value <br>";
			}
		}
	 ?>

</body>
</html>