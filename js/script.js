var cards;
var cartasSinRotar = [];
var botonHacerPregunta;
var contadorVolteo = 0;
var respuestasPosiblesCBox;
var contadorPreguntas = 0;
var cartaServidor;
var totalTiempo = 20;//funcion de girar carta
var intervalo1;//funcion de girar carta
var state = 0;
var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];  
var botonHacerPregunta = document.getElementById("hacerPregunta");
var cartas = []; // Listado de todas las cartas

//para saber si la carta ganadora ha sido bajada ya.
var haGanado=true;

//easy y very easy se quedaran en false hasta que sean activados
var easy=false;
var veryeasy=false;

//Le da un ID al back de la carta para que se gire con el easy.
var asignarid=0;

//Es un contador que se utiliza para las posiciones del array de atributos
var contador_array=0;

//Array de atributos para pasarlos al javascript
var array_atributos = {};


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
        var element = event.currentTarget || event;
        if (element.className != "card cardE") {
            if(!isCardFlipped(element)) {
                flipCard(element);
                
                contadorVolteo++;
                flipCardSound.play();
            }
        }
    }

    // saberSiHaGanado();
}

function obtenerListadoCartas() {
    cartas = document.getElementsByClassName("card-container");
}
function actualizarListadoCartasSinRotar() {
    cartasSinRotar = [];
    for (var c = 0; c < cartas.length; c++) {
        var carta = cartas[c];
        if (!isCardFlipped(carta)) {
            cartasSinRotar.push(carta);
        }
    }

    return cartasSinRotar;
    // cartas = document.getElementsByClassName("card");
}
function instanciarClicsCartas() {
    for (var i = 0; i < cartas.length; i++) {
        var carta = cartas[i];
        carta.addEventListener("click", puedeGirarCarta);
    }
}

function giraCartaV2(i){
    flipCard(document.getElementById(i));
    contadorVolteo++;
}

function asignarID(){
    //Le da un ID al back de la carta para que se gire.
    while (asignarid<12){
        document.getElementById('$c').id=asignarid;
        asignarid++;
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
    obtenerListadoCartas();
    instanciarClicsCartas();
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

        //modal
        var modal_Egg = document.getElementById('AvisoEasterEgg');
        var cerrarEgg = document.getElementsByClassName("cerrarEgg")[0];

        modal_Egg.style.display = "block";
            
        cerrarEgg.onclick = function() {            
            modal_Egg.style.display = "none";
            location.reload(true);
            }

        // Cuando el usuario clica en cualquier otro lado que no sea el modal, lo cierra
        window.onclick = function(event) {
            if (event.target == modal_Egg) {
                modal_Egg.style.display = "none";
            }
        }
        window.removeEventListener("keydown", konamiCode, true);
    }
}

activarEasterEgg();

function botonActivado() {
    desaparecerBotonEasy();
    preguntarAlServer();
    if (veryeasy==true){
        eliminarOpcion();
    } else {
        resetearComboBox();
    }
    
    activarBoton()
}

function eliminarOpcion(){
    var x = document.getElementById("pregunta");
    x.remove(x.selectedIndex);
    x.selectedIndex = 0;
    botonHacerPregunta.disabled = true;

}

function sacarMensajeAlertaSinVolteo() {

    if (easy==false && veryeasy==false) {

        if (pregunta_clicada == 1 && pregunta_sinGirarCarta == contadorVolteo) {

            var modal_aviso = document.getElementById('AvisoPregunta');
            var boton_cerrar = document.getElementsByClassName("cerrar_Aviso")[0];

            modal_aviso.style.display = "block";
            contadorPreguntas--;
            document.getElementById('contador_preguntas').innerHTML = contadorPreguntas;

            boton_cerrar.onclick = function() {
                modal_aviso.style.display = "none";
            }

            // Cuando el usuario clica en cualquier otro lado que no sea el modal, lo cierra
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
    else if (easy==true) {

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
}

function funcionContadorPreguntas() {
    if (easy == true) {
        contadorPreguntas += 3;
    } else if (veryeasy == true) {
        contadorPreguntas += 4;
    } else {
        contadorPreguntas++;
    }
    document.getElementById('contador_preguntas').innerHTML = contadorPreguntas;
}

function desaparecerBotonEasy() {
    //Si hacemos la pregunta, simplemente desactivara el boton
    document.getElementById("dificultad").style.display="none";
    document.getElementById("parrafoElegirDificultad").style.display="none";
}

function leerDatosCartaServidor(){
    return {
        nombre: document.getElementById("nombre_php-js").innerHTML,
        gafas: document.getElementById("gafas_php-js").innerHTML,
        cabello: document.getElementById("cabello_php-js").innerHTML,
        sexo: document.getElementById("sexo_php-js").innerHTML 
    };
}

function preguntarAlServer() {

    var datosCartaServidor = leerDatosCartaServidor();

    var selectPregunta = document.getElementById('pregunta');    
    var preguntaCombo = selectPregunta.options[selectPregunta.selectedIndex].getAttribute('name');
    var respuestaCombo = selectPregunta.value;
    var respuestaServidor = datosCartaServidor[preguntaCombo];

    var i = 0;

    if (!datosCartaServidor[preguntaCombo]) {
        document.getElementById('texto_salida').innerHTML = "Esa pregunta no estaba prevista.";
        document.getElementById("botonDeColorRojo").style.display = "none";
        document.getElementById("botonDeColorVerde").style.display = "none";
        return false;
    } 
    
    if (datosCartaServidor[preguntaCombo] == respuestaCombo) {
        girarAutomaticamente(preguntaCombo, respuestaServidor, false);
        preguntaCorrecta();
    } else {
        girarAutomaticamente(preguntaCombo, respuestaCombo, true);
        preguntaIncorrecta();
    }

    funcionContadorPreguntas();
    sacarMensajeAlertaSinVolteo();
    saberSiHaGanado();
}

/**
 *  Si no se cambia la condición del timer de 20 segundos no se podrán girar cartas
 *  Si es false girara las que NO coincidan con la respuesta
 *  Si es true girara las que SI coincidan con la respuesta
 */
function girarAutomaticamente(pregunta, respuesta, girarMismaRespuesta) {
    if (easy == true || veryeasy == true) {
        actualizarListadoCartasSinRotar();
        for (var c = 0; c < cartasSinRotar.length; c++) {
            var carta = cartasSinRotar[c];
            var valorCarta = carta.getAttribute(pregunta);

            if (valorCarta == respuesta && girarMismaRespuesta ||
                valorCarta != respuesta && !girarMismaRespuesta) {
                // contadorVolteo++;
                girarCarta(carta);
            }
        }
    }
}

function preguntaCorrecta(){
    document.getElementById('texto_salida').innerHTML = "SI";
    document.getElementById("botonDeColorRojo").style.display = "none";
    document.getElementById("botonDeColorVerde").style.display = "block";
}

function preguntaIncorrecta(){
    document.getElementById('texto_salida').innerHTML = "NO";
    document.getElementById("botonDeColorVerde").style.display = "none";
    document.getElementById("botonDeColorRojo").style.display = "block";
}

function saberSiHaGanado(){
    actualizarListadoCartasSinRotar();
    if (cartasSinRotar.length == 1) {
        //se utiliza para saber el nombre de la carta principal:
        var datosCartaServidor = leerDatosCartaServidor();
        var haGanado = false;
        console.log(datosCartaServidor);
        console.log(datosCartaServidor.nombre, cartasSinRotar[0].getAttribute('name'));
        if (datosCartaServidor.nombre == cartasSinRotar[0].getAttribute('name')) {
            haGanado = true;
        }

        finDelJuego(haGanado);
    } else if (cartasSinRotar.length < 1) {
        finDelJuego(false);
    }
}

function activarBoton() {

    var lista = document.getElementById("pregunta");
    botonHacerPregunta = document.getElementById("hacerPregunta");
    if(lista.selectedIndex !=0 )
      botonHacerPregunta.disabled = false;
    else{
      botonHacerPregunta.disabled = true;
    }

}

function fijarDificultad(){

    var lista = document.getElementById("dificultad");
    document.getElementById("textoEasy").innerHTML = "Modo "
    +document.getElementById("dificultad").value
    +" Activado, ya no podras girar cartas!";
    //devuelve en texto el combo que has seleccionado

    if(lista.selectedIndex == 1 || lista.selectedIndex == 2) {
        lista.disabled = true;  
        if (lista.selectedIndex == 1){
            document.getElementById("parrafoElegirDificultad").style.display="none";
            easy=true;

        }
        if (lista.selectedIndex == 2){
            document.getElementById("parrafoElegirDificultad").style.display="none";
            veryeasy=true;
            var cont = document.getElementsByClassName('container')[0];
        }
    }    
}

function resetearComboBox() {
    var x = document.getElementById("pregunta");
    x.selectedIndex = 0;
}

function girarCuandoDeba(){

    if (easy==false && veryeasy==false) {
        clearTimeout(intervalo1);
        //Para parar el contador, sino volvera a llamar a la funcion y se restara de 2 en 2
        totalTiempo=20;
        //Cuando llamemos a la funcion, el contador vuelve a estar en 20
        tiempoRecursivo();
    }
}

function tiempoRecursivo(){
    document.getElementById('CuentaAtras').innerHTML = "Te quedan "
    +totalTiempo+" segundos para girar una carta";
    if(totalTiempo==0){
        document.getElementById('CuentaAtras').innerHTML = 
        "Se ha acabado tu tiempo, vuelve a preguntar <br> para poder seguir volteando cartas! <br> (Te quedan "
        +totalTiempo+" segundos)";
    }
    else{
        /* Restamos un segundo al tiempo restante */
        totalTiempo--;
        /* Ejecutamos nuevamente la función al pasar 1000 milisegundos (1 segundo) */
        intervalo1 = setTimeout("tiempoRecursivo()",1000);
    }
}

function puedeGirarCarta(event){
     if(easy==true || veryeasy==true || totalTiempo==0){
         //No la podra girar, ya que no tiene tiempo
        }
    else{
        //podra girar la carta
        girarCarta(event);
    }
}

function finDelJuego(haGanado){

    // Rotamos la carta del servidor
    flipCard(document.getElementById('cartaElegida'));
    
    if (haGanado==true) {
        juegoGanado();
    }
    if (haGanado==false){
        juegoPerdido();
    }
    
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
    var boton_NoGuardar = document.getElementsByClassName("perdido_Opcion_Cerrar")[0];
    modal_fin_juego.style.display = "block";
        
    boton_NoGuardar.onclick = function() {
        modal_fin_juego.style.display = "none";
    }
}

//guardar datos
function guardarUsuario() {
        var modal_guardar_nombre = document.getElementById('modal_guardar_nombre');

        var Cerrar_Ventana_Usuario = document.getElementsByClassName("Cerrar_Ventana_Usuario")[0];

        var enviarNombre = document.getElementsByClassName("enviarNombre")[0];

        document.formulario.puntuacionJugador.value = contadorPreguntas;

        modal_guardar_nombre.style.display = "block";
        
        Cerrar_Ventana_Usuario.onclick = function() {
            modal_guardar_nombre.style.display = "none";
        }

        enviarNombre.onclick = function() {
            modal_guardar_nombre.style.display = "none";
            introducirDatos();
        }
}

function introducirDatos() {
        
        var guardar_en_txt = document.getElementById('guardar_en_txt');

        var Cerrar_Guardado = document.getElementsByClassName("Cerrar_Guardado")[0];

        guardar_en_txt.style.display = "block";
        
        Cerrar_Guardado.onclick = function() {
            guardar_en_txt.style.display = "none";
        }
}