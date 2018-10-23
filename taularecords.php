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
						array_push($records,$record);
					} 	
		  		}
		    		fclose($file);
		    		sort($records);
		    	
		    	foreach ($records as $record) {
						$recordNueva;
						$record=explode(' ',$record);						
						$puntuacion=array_shift($record);
						$nombre=implode(" ", $record);;
						$recordNueva= array("nombre"=>$nombre,"puntuacion"=>$puntuacion);
						$recordFinal[]=$recordNueva;	
		    	}
				return $recordFinal;
			}
		
			function tableroCartas($records){

				$tablaRec='<table id="records"> <tr><th>Nombre</th><th>Puntuación</th></tr>';
				foreach ($records as $r) {
					$numero="$r[nombre]";
					$nombre="$r[puntuacion]";
					$tablaRec .="<tr><td>$numero</td><td>$nombre</td></tr>\n";
				}
				$tablaRec .='</table>';
				return $tablaRec;
			}
			
			$tablarecord=tableroCartas(ordenarRecords());
			echo "$tablarecord";
	?>


</body>
</html>