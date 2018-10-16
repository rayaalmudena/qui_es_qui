<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="style.css">	
	<script type="text/javascript" src="script.js"></script>
</head>
<body>

	<?php 
	/*$imagesDir = 'cartas/*';
*
*	$images = glob($imagesDir . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);
*
*	$randomImage = $images[array_rand($images)];
*	echo "<img src='$randomImage'>\n";
*
*
*/	 ?>

	
	<div class="flip">
		<img src="magooscuro.jpg" class="card" name="mago" onclick="flip(0)"/>
		<img src="blueeyes.jpg" class="card" name="back" onclick="flip(1)"/>
		<img src="exodia.jpg" class="card" name="exodia" onclick="flip(2)"/>
	</div>




</body>
</html>