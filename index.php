<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<?php 
	$imagesDir = 'cartas/*';

	$images = glob($imagesDir . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);

	$randomImage = $images[array_rand($images)];
	echo "<img src='$randomImage'>\n";


	 ?>

</body>
</html>