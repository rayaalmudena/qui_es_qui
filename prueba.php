<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	 <?php 

		$file = fopen("imagenes.txt", "r");//abre fichero
		$i=0;//contador para leer el archivo
		$array=[];//array que guarda todo el imagenes.txt
		$palabra =".png"; //se utilizara para splitear el nombre de la imagen
		$array_imagenes=[]; //se guardaran los nombres de las imagenes

		//"feof" es end of file, es para que se ejecute hasta que acabe el fichero
		while(!feof($file)) {

			$array[$i]=fgets($file). PHP_EOL; //guarda en la array la linea entera
			$posicion_coincidencia = strpos($array[$i], $palabra); //guarda la posicion del nombre.png
			if (str_split($array[$i], $posicion_coincidencia)[0] != null){// si encuentra el nombre:
				$array_imagenes[$i] = str_split($array[$i], $posicion_coincidencia)[0];//guarda el nombre de la imagen png en un array
			}
			$i=$i+1;

		}
		fclose($file);

		

		//con esto de aqui, detecta si hay un nombre repetido, y lo indica
		$repeated = array_filter(array_count_values($array_imagenes), function($count) {
		    return $count > 1;
		});
		foreach ($repeated as $key => $value) {
		    echo "La imagen '$key' se repite $value veces <br />";
		}

	?>

</body>
</html>