<?php 
session_start();

//destruye la sesion
session_unset();
session_destroy();  
header("Location:index.php");
?>