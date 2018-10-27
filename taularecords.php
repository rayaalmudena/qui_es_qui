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
			function ordenarRecords(){
				$records=[];
				$file = fopen("taularecords.txt", "r");
				while (!feof($file)) {
					$record =fgets($file);
					$record=rtrim($record, "\n");
					if (empty($record)) {
						# salto
					} else {
						$recordArray;
						$record=explode(' ',$record);						
						$puntuacion=array_shift($record);
						$nombre=implode(" ", $record);
						$recordArray[$nombre]=$puntuacion;
						$records=$records+$recordArray;

					} 	
		  		}
		    		fclose($file);
		    		asort($records);
		    		return $records;
		    	
			}

			function tableroCartas($records){

				$tablaRec='<div id="tablaRecords"><table id="records"> <tr><th>Nombre</th><th>Puntuación</th></tr>';
				foreach ($records as $nombre=> $puntuacion) {
					$tablaRec .="<tr><td>$nombre</td><td>$puntuacion</td></tr>\n";
				}
				$tablaRec .='</table></div>';
				return $tablaRec;
			}
			$tablarecord=tableroCartas(ordenarRecords());
			echo "$tablarecord";
	?>


</body>
</html>