<link rel="stylesheet" type="text/css" href="style.css">	
	<script type="text/javascript" src="js/script.js"></script>
	<script type="text/javascript" src="js/fireworks.js"></script>
	
<?php
session_start();
?>
<!DOCTYPE html>
<html>
<body>

<?php
// remove all session variables
session_unset(); 

// destroy the session 
session_destroy(); 
?>