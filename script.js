var cards;
var botonHacerPregunta;
var contadorVolteo = 0;
var respuestasPosiblesCBox;
var flipCardSound = new Audio('sounds/flipCardSound.mp3');
var contadorPreguntas = 0;

//estas dos variables son para preguntar "Segur que vols realitzar un altre pregunta sense girar cap carta?"
var pregunta_clicada=0;
var pregunta_sinGirarCarta=0;

// [[[[[[ELIMINAR ATRIBUTO SI NO SE VA A UTILIZAR (FUNCION PARA EL BOTON)]]]]]

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
    // Aplicamos sonido de giro y contamos el volteo
    if (elemento.getAttribute("src") != "cartas/back.png") {
        flipCardSound.play();
        contadorVolteo++;
    }
    // Ahora volteamos la carta
    elemento.setAttribute("card", elemento.getAttribute("src"));
    elemento.setAttribute("src", "cartas/back.png");
    
}

document.addEventListener('DOMContentLoaded', function(){ 
    cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        card.addEventListener("click", flip);
    }
});

document.addEventListener('DOMContentLoaded', function(){//Hacer pregunta, deshabilitar boton "Easy" y sumar al contador de preguntas
    botonHacerPregunta = document.getElementById("hacerPregunta");
    botonHacerPregunta.addEventListener("click", botonActivado);
    botonHacerPregunta.addEventListener("click", desaparecerBotonEasy2);
});
document.addEventListener('DOMContentLoaded', function(){//Activar modo Easy
    botonHacerPregunta = document.getElementById("buttonEasy");
    botonHacerPregunta.addEventListener("click", desaparecerBotonEasy);
});

function botonActivado() {
    //Todo esto es para el mensaje "Segur que vols realitzar un altre pregunta sense girar cap carta?"
    if (pregunta_clicada==1 && pregunta_sinGirarCarta==contadorVolteo) {
        alert("Segur que vols realitzar un altre pregunta sense girar cap carta?")
    }
    else if (pregunta_clicada>=1 && pregunta_sinGirarCarta==contadorVolteo) {
        //nada
    }
    else{
        pregunta_clicada=0;
    }
    pregunta_sinGirarCarta=contadorVolteo;
    pregunta_clicada+=1;
    //hasta aqui

    funcionContadorPreguntas();
    
    preguntarAlServer();

    if (contadorVolteo >= 11) {

    }
}

function funcionContadorPreguntas() {
    contadorPreguntas+=1;
    document.getElementById('contador_preguntas').innerHTML = contadorPreguntas;
}

function desaparecerBotonEasy() {//Si activamos el boton easy, aparecera un texto diciendolo.
    document.getElementById("buttonEasy").style.display="none";
    document.getElementById("textoEasy").innerHTML = "Modo Easy Activado";
}
function desaparecerBotonEasy2() {//Si hacemos la pregunta, simplemente desactivara el boton
    document.getElementById("buttonEasy").style.display="none";
}

function preguntarAlServer() {

    respuestasPosiblesCBox = [].slice.call(document.getElementsByClassName("cbox"));

    // Si no han respondido = 3, si han respondido una = 2
    // Si han respondido mas de una = 0 o 1
    var semaforo = 0;
    var atributo;
    var id;
    for (var i = 0; i < respuestasPosiblesCBox.length; i++) {
        if (respuestasPosiblesCBox[i].value != "---") {
            // atributo = respuestasPosiblesCBox[i].value;
            // no lo uso pero está bien saber que existe
            id = respuestasPosiblesCBox[i].getAttribute("class")
            id = id.replace("cbox ","");
        } else {
            semaforo++;            
        }
    }

    if (semaforo == 3) {
        document.getElementById('texto_salida').innerHTML =
        "No hay nada seleccionado";
    
    } else if (semaforo == 2) {
        // Esto es correcto
        nombre_carta=document.getElementById("nombre_php-js").innerHTML;
        gafas_carta=document.getElementById("gafas_php-js").innerHTML;
        cabello_carta=document.getElementById("cabello_php-js").innerHTML;
        sexo_carta=document.getElementById("sexo_php-js").innerHTML;

        //////////////////////////////// ESTO SE PODRIA REFACTORIZAR SI SE PUDIESE IGUALAR EL .VALUE A LA VARIABLE, PERO DANDO EL MISMO RESULTADO, AL COMPARAR EL PROGRAMA DICE QUE ES DIFERENTE
        if (document.getElementById('gafas')[document.getElementById('gafas').selectedIndex].value=="si" && gafas_carta=="si") {
            document.getElementById('texto_salida').innerHTML = "SI";
        }
        if (document.getElementById('gafas')[document.getElementById('gafas').selectedIndex].value=="no" && gafas_carta=="no") {
            document.getElementById('texto_salida').innerHTML = "SI";
        }
        if (document.getElementById('gafas')[document.getElementById('gafas').selectedIndex].value=="no" && gafas_carta=="si") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('gafas')[document.getElementById('gafas').selectedIndex].value=="si" && gafas_carta=="no") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="moreno" && cabello_carta=="moreno") {
            document.getElementById('texto_salida').innerHTML = "SI";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="rubio" && cabello_carta=="rubio") {
            document.getElementById('texto_salida').innerHTML = "SI";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="pelirrojo" && cabello_carta=="pelirrojo") {
            document.getElementById('texto_salida').innerHTML = "SI";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="moreno" && cabello_carta=="rubio") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="moreno" && cabello_carta=="pelirrojo") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="rubio" && cabello_carta=="moreno") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="rubio" && cabello_carta=="pelirrojo") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="pelirrojo" && cabello_carta=="moreno") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('cabello')[document.getElementById('cabello').selectedIndex].value=="pelirrojo" && cabello_carta=="rubio") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('sexo')[document.getElementById('sexo').selectedIndex].value=="hombre" && sexo_carta=="hombre") {
            document.getElementById('texto_salida').innerHTML = "SI";
        }
        if (document.getElementById('sexo')[document.getElementById('sexo').selectedIndex].value=="mujer" && sexo_carta=="mujer") {
            document.getElementById('texto_salida').innerHTML = "SI";
        }
        if (document.getElementById('sexo')[document.getElementById('sexo').selectedIndex].value=="hombre" && sexo_carta=="mujer") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }
        if (document.getElementById('sexo')[document.getElementById('sexo').selectedIndex].value=="mujer" && sexo_carta=="hombre") {
            document.getElementById('texto_salida').innerHTML = "NO";
        }




        // ESTO SIRVE PARA SABER CON QUÉ COMPARAR CON EL SERVER
    } else if (semaforo == 1 || semaforo == 0) {
        document.getElementById('texto_salida').innerHTML =
        "No se pueden seleccionar más de dos elementos";

    } else {
        document.getElementById('texto_salida').innerHTML = "ERROR";
    }

    resetearComboBox(id);
}

function resetearComboBox(id) {
    for (var i = 0; i < respuestasPosiblesCBox.length; i++) {
        id = respuestasPosiblesCBox[i]
        id.selectedIndex = 0;
    }
}
