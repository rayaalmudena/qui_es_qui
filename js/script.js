var cards;
var botonHacerPregunta;
var contadorVolteo = 0;
var respuestasPosiblesCBox;
var contadorPreguntas = 0;
var cartaServidor;
var totalTiempo=20;//funcion de girar carta
var intervalo1;//funcion de girar carta
var state = 0;
var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];  


// Audios
var flipCardSound = new Audio('sounds/flipCardSound.mp3');
var winSound = new Audio("sounds/victory_theme.mp3");
var loseSound = new Audio("sounds/defeat_theme.mp3");

// estas dos variables son para preguntar
// "Segur que vols realitzar un altre pregunta sense girar cap carta?"
var pregunta_clicada=0;
var pregunta_sinGirarCarta=0;


function girarCarta(event) {
    if (contadorVolteo >= 11) {
        return false;
    }
    else{
        var element = event.currentTarget;
        if (element.className != "card cardE") {
            if(!isCardFlipped(element)) {
                flipCard(element);
                contadorVolteo++;
                flipCardSound.play();
            }
        }
    }

    if (contadorVolteo >= 11) {
        // Rotamos la carta del servidor
        flipCard(document.getElementById('cartaElegida'));
        finDelJuego();
    }
}

function flipCard(card) {
    card.classList.toggle('rotated');
}

function isCardFlipped(card) {
    return card.classList.contains('rotated');
}

document.addEventListener('DOMContentLoaded', function(){
    // Activa el botón y todas las funciones que hay dentro de él
    botonHacerPregunta = document.getElementById("hacerPregunta");
    botonHacerPregunta.addEventListener("click", botonActivado);
});

function activarEasterEgg() {
    if ( ! window.addEventListener ) {
        return false;
    }
    // Arriba, Arriba, Abajo, Abajo, Deracha, Izquierda, Derecha, Izquierda, B, A, Enter
    window.addEventListener("keydown", konamiCode, true);   
}

function konamiCode(e) {
    if ( e.keyCode == konami[state] ) state++;  
    else state = 0;  
    if ( state == 11 )  {            
        // cambiamos los sonidos del programa
        flipCardSound = new Audio("easter_egg/konamiFlip3.mp3");
        winSound = new Audio("easter_egg/konamiWin.mp3");
        loseSound = new Audio("easter_egg/konamiLose.mp3");
        var backgroundMusic = new Audio("easter_egg/konamiBackground.mp3");
        
        backgroundMusic.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        backgroundMusic.play();

        window.removeEventListener("keydown", konamiCode, true);
    }
}

activarEasterEgg();

function botonActivado() {
    desaparecerBotonEasy();
    preguntarAlServer();
}

function sacarMensajeAlertaSinVolteo() {
    if (pregunta_clicada == 1 && pregunta_sinGirarCarta == contadorVolteo) {

        var modal_aviso = document.getElementById('AvisoPregunta');
        var boton_cerrar = document.getElementsByClassName("cerrar_Aviso")[0];

        modal_aviso.style.display = "block";
        
        boton_cerrar.onclick = function() {
            modal_aviso.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal_aviso) {
                modal_aviso.style.display = "none";
            }
        }
    }
    else if (pregunta_clicada >= 1 && pregunta_sinGirarCarta == contadorVolteo) {
        //nada
    }
    else{
        pregunta_clicada=0;
    }
    pregunta_sinGirarCarta = contadorVolteo;
    pregunta_clicada++;
}

function funcionContadorPreguntas() {
    contadorPreguntas++;
    document.getElementById('contador_preguntas').innerHTML = contadorPreguntas;
}

function desaparecerBotonEasy() {
    //Si hacemos la pregunta, simplemente desactivara el boton
    document.getElementById("dificultad").style.display="none";
    document.getElementById("parrafoElegirDificultad").style.display="none";
}

function preguntarAlServer() {

    nombre_carta=document.getElementById("nombre_php-js").innerHTML;
    gafas_carta=document.getElementById("gafas_php-js").innerHTML;
    cabello_carta=document.getElementById("cabello_php-js").innerHTML;
    sexo_carta=document.getElementById("sexo_php-js").innerHTML;

    var pregunta_combo = document.getElementById('pregunta')[document.getElementById('pregunta').selectedIndex].value;

    if (pregunta_combo == "Es Hombre?" && sexo_carta == "hombre") {
        preguntaCorrecta();
    }
    else if (pregunta_combo == "Es Mujer?" && sexo_carta == "mujer") {
        preguntaCorrecta();
    }
    else if (pregunta_combo == "Tiene Gafas?" && gafas_carta == "si") {
        preguntaCorrecta();
    }
    else if (pregunta_combo == "No Tiene Gafas?" && gafas_carta == "no") {
        preguntaCorrecta();
    }
    else if (pregunta_combo == "Es Rubio?" && cabello_carta == "rubio") {
        preguntaCorrecta();
    }
    else if (pregunta_combo == "Es Moreno?" && cabello_carta == "moreno") {
        preguntaCorrecta();
    }
    else if (pregunta_combo == "Es Pelirrojo?" && cabello_carta == "pelirrojo") {
        preguntaCorrecta();
    }
    ///Esta, con el cambio del ultimo sprint, ya no hará falta.
    /*else if (pregunta_combo == "----") {
        document.getElementById('texto_salida').innerHTML = "Selecciona una pregunta";
        document.getElementById("botonDeColorRojo").style.display = "none";
        document.getElementById("botonDeColorVerde").style.display = "none";
    }*/
    else if (pregunta_combo != "Es Hombre?" && pregunta_combo != "Es Mujer?" && pregunta_combo != "Tiene Gafas?" && 
        pregunta_combo != "No Tiene Gafas?" && pregunta_combo != "Es Rubio?" && pregunta_combo != "Es Moreno?" && pregunta_combo != "Es Pelirrojo?" && pregunta_combo != "----"){
        document.getElementById('texto_salida').innerHTML = "Esa pregunta no estaba prevista.";
        document.getElementById("botonDeColorRojo").style.display = "none";
        document.getElementById("botonDeColorVerde").style.display = "none";
    }
    else{
        preguntaIncorrecta();
    }
}

function preguntaCorrecta(){
    document.getElementById('texto_salida').innerHTML = "SI";
    document.getElementById("botonDeColorRojo").style.display = "none";
    document.getElementById("botonDeColorVerde").style.display = "block";
    funcionContadorPreguntas();
    sacarMensajeAlertaSinVolteo();
    
}
function preguntaIncorrecta(){
    document.getElementById('texto_salida').innerHTML = "NO";
    document.getElementById("botonDeColorVerde").style.display = "none";
    document.getElementById("botonDeColorRojo").style.display = "block";
    funcionContadorPreguntas();
    sacarMensajeAlertaSinVolteo();
    
}

function activarBoton(){

    var lista = document.getElementById("pregunta");
    var boton = document.getElementById("hacerPregunta");
    if(lista.selectedIndex !=0 )
      boton.disabled = false;
    else{
      boton.disabled = true;
    }

}

function fijarDificultad(){

    var lista = document.getElementById("dificultad");
    document.getElementById("textoEasy").innerHTML = "Modo "+document.getElementById("dificultad").value+ " Activado";
    //devuelve en texto el combo que has seleccionado

    if(lista.selectedIndex !=0 ) {
        lista.disabled = true;
        document.getElementById("parrafoElegirDificultad").style.display="none";
    }
}

function resetearComboBox(id) {
    for (var i = 0; i < respuestasPosiblesCBox.length; i++) {
        id = respuestasPosiblesCBox[i];
        id.selectedIndex = 0;
    }
}

function girarCuandoDeba(){
    clearTimeout(intervalo1);
    //Para parar el contador, sino volvera a llamar a la funcion y se restara de 2 en 2
    totalTiempo=20;
    //Cuando llamemos a la funcion, el contador vuelve a estar en 20
    tiempoRecursivo();
}

function tiempoRecursivo(){
    document.getElementById('CuentaAtras').innerHTML = "Te quedan "+totalTiempo+" segundos para girar una carta";
    if(totalTiempo==0){
        document.getElementById('CuentaAtras').innerHTML = "Se ha acabado tu tiempo, vuelve a preguntar <br> para poder seguir volteando cartas! <br> (Te quedan "+totalTiempo+" segundos)";
    }
    else{
        /* Restamos un segundo al tiempo restante */
        totalTiempo--;
        /* Ejecutamos nuevamente la función al pasar 1000 milisegundos (1 segundo) */
        intervalo1 = setTimeout("tiempoRecursivo()",1000);
    }
}

function puedeGirarCarta(event){
    if(totalTiempo != 0) {
        girarCarta(event);
    }
}

function finDelJuego(){
    
    //if ganado:
    juegoGanado();
    //if perdido:
    //juegoPerdido();
    
}

function juegoGanado(){
    winSound.play();
    document.getElementById("canvas").style.visibility = "visible";
    
    var modal_fin_juego = document.getElementById('Fin_del_juego_bueno');
    var boton_NoGuardar = document.getElementsByClassName("ganado_Opcion_No")[0];
    var boton_Guardar = document.getElementsByClassName("ganado_Opcion_Si")[0];

    modal_fin_juego.style.display = "block";
        
    boton_NoGuardar.onclick = function() {
        modal_fin_juego.style.display = "none";
    }
    boton_Guardar.onclick = function(){
        modal_fin_juego.style.display = "none";
        guardarUsuario();
    }
}


function juegoPerdido(){
    loseSound.play();
    var modal_fin_juego = document.getElementById('Fin_del_juego_malo');
    var boton_NoGuardar = document.getElementsByClassName("perdido_Opcion_No")[0];
    var boton_Guardar = document.getElementsByClassName("perdido_Opcion_Si")[0];

    modal_fin_juego.style.display = "block";
        
    boton_NoGuardar.onclick = function() {
        modal_fin_juego.style.display = "none";
    }
    boton_Guardar.onclick = function(){
        modal_fin_juego.style.display = "none";
        guardarUsuario();
    }

}

//guardar datos
function guardarUsuario() {        
        var modal_guardar_nombre = document.getElementById('modal_guardar_nombre');

        var Cerrar_Ventana_Usuario = document.getElementsByClassName("Cerrar_Ventana_Usuario")[0];

        var enviarNombre = document.getElementsByClassName("enviarNombre")[0];

        modal_guardar_nombre.style.display = "block";
        
        Cerrar_Ventana_Usuario.onclick = function() {
            modal_guardar_nombre.style.display = "none";
        }

        enviarNombre.onclick = function() {

            var nombreJugador = document.getElementById('nombre_para_enviar').value;
            alert(nombreJugador);
            alert(contadorPreguntas);
            modal_guardar_nombre.style.display = "none";
        }
}
