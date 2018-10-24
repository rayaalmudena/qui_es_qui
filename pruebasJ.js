var cards;
var botonHacerPregunta;
var contadorVolteo = 0;


/* pruebas girar carta

function flip(event){
    var element = event.currentTarget;
    if (element.className === "card") {
    if(element.style.transform == "rotateY(180deg)") {
      element.style.transform = "rotateY(0deg)";
      
    }
    else {
      element.style.transform = "rotateY(180deg)";
    }
  }
};*/


function flip() {
    var elemento = this;
    elemento.setAttribute("card", elemento.getAttribute("src"));
    elemento.setAttribute("src", "cartas/back.png");
    contadorVolteo++;
}

document.addEventListener('DOMContentLoaded', function(){ 
    cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        card.addEventListener("click", flip);
    }
});

document.addEventListener('DOMContentLoaded', function(){//Hacer pregunta y deshabilitar boton "Easy"
    botonHacerPregunta = document.getElementById("hacerPregunta");
    botonHacerPregunta.addEventListener("click", botonActivado);
    botonHacerPregunta.addEventListener("click", desaparecerBotonEasy2);
});

document.addEventListener('DOMContentLoaded', function(){//Activar modo Easy
    botonHacerPregunta = document.getElementById("buttonEasy");
    botonHacerPregunta.addEventListener("click", desaparecerBotonEasy);
});

function prueba(){

    nombre_carta=document.getElementById("nombre1").innerHTML;
    gafas_carta=document.getElementById("gafas1").innerHTML;
    cabello_carta=document.getElementById("cabello1").innerHTML;
    sexo_carta=document.getElementById("sexo1").innerHTML;
    if (document.getElementById('gafas')[document.getElementById('gafas').selectedIndex].value==gafas_carta) {
        alert("Acertaste");
        //document.getElementById('texto_salida').innerHTML = "Acertaste";
    }
    /*else{
        document.getElementById('texto_salida').innerHTML = "No Acertaste"
    }*/
    if(document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value==cabello_carta){
        //alert(document.getElementById('sexo')[document.getElementById('sexo').selectedIndex].value);
        alert("Acertaste");
        //document.getElementById('texto_salida').innerHTML = "Acertaste";
    }
    /*else{
        document.getElementById('texto_salida').innerHTML = "No Acertaste"
    }*/
    if(document.getElementById('sexo')[document.getElementById('sexo').selectedIndex].value==sexo_carta){
        alert("Acertaste");
        //document.getElementById('texto_salida').innerHTML = "Acertaste";
    }
    /*else{
        document.getElementById('texto_salida').innerHTML = "No Acertaste"
    }*/

}

function botonActivado() {
    preguntarAlServer();

    if (contadorVolteo >= 11) {

    }
}

function desaparecerBotonEasy() {//Si activamos el boton easy, aparecera un texto diciendolo.
    document.getElementById("buttonEasy").style.display="none";
    document.getElementById("textoEasy").innerHTML = "Modo Easy Activado";
}
function desaparecerBotonEasy2() {//Si hacemos la pregunta, simplemente desactivara el boton
    document.getElementById("buttonEasy").style.display="none";
}

function preguntarAlServer() {

    var respuestasPosiblesCBox = [].slice.call(document.getElementsByClassName("cbox"));

    // Si no han respondido = 3, si han respondido una = 2, si han respondido mas de una = 0 o 1
    var semaforo = 0;
    var atributo;
    var id;
    for (var i = 0; i < respuestasPosiblesCBox.length; i++) {
        if (respuestasPosiblesCBox[i].value != "---" && semaforo <= 1) {
            //atributo = respuestasPosiblesCBox[i].value; <--- no lo uso pero está bien saber que existe
            id = respuestasPosiblesCBox[i].getAttribute("class")
            id = id.replace("cbox ","");
        } else {
            semaforo++;            
        }
    }

    if (semaforo == 3) {
        document.getElementById('texto_salida').innerHTML = "No hay nada seleccionado";
    
    } else if (semaforo == 2) {
        // Esto es correcto
        //alert(id); // dice el ID de la pregunta (ESTO SIRVE PARA SABER CON QUÉ COMPARAR CON EL SERVER)
        nombre_carta=document.getElementById("nombre1").innerHTML;
        gafas_carta=document.getElementById("gafas1").innerHTML;
        cabello_carta=document.getElementById("cabello1").innerHTML;
        sexo_carta=document.getElementById("sexo1").innerHTML;
        if (document.getElementById('gafas').selectedIndex.value=="si") {
            alert("holi");
        }
    } else if (semaforo == 1 || semaforo == 0) {
        document.getElementById('texto_salida').innerHTML = "No se pueden seleccionar más de dos elementos";

    } else {
        document.getElementById('texto_salida').innerHTML = "ERROR";
    }

    resetearComboBox(id);
}

function resetearComboBox(id) {
    var clear = document.getElementById(id);
    clear.selectedIndex = 0;
    
    // Hay que editar este bucle para que haga el clear de arriba
    for (var i = 0; i < respuestasPosiblesCBox.length; i++) {
        if (respuestasPosiblesCBox[i].value != "---" && semaforo <= 1) {
            atributo = respuestasPosiblesCBox[i].value;
            id = respuestasPosiblesCBox[i].getAttribute("class")
            id = id.replace("cbox ","");
        }
    }
}

/*

<?php

// definimos un array de valores en php

$arrayPHP=array("casa","coche","moto");

?>

<script type="text/javascript">

    // obtenemos el array de valores mediante la conversion a json del

    // array de php

    var arrayJS=<?php echo json_encode($arrayPHP);?>;

 

    // Mostramos los valores del array

    for(var i=0;i<arrayJS.length;i++)

    {

        document.write("<br>"+arrayJS[i]);

    }

</script>
*/