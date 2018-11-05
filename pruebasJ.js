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
var botonHacerPregunta = document.getElementById("hacerPregunta");

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

//La primera vez los atributos no salen ordenados, asi que los guardamos en una segunda variable:
var array_atributos_ordenados = {};


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
                ///Es necesario para el contador, para que no se junte con el easy
                id_elemento=element.id;
                document.getElementById(id_elemento).id="card rotated";
                document.getElementById(id_elemento).id="card rotated";
                ///
                contadorVolteo++;
                flipCardSound.play();
            }
        }
    }

    if (contadorVolteo >= 11) {
        saberSiHaGanado();
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

function pasaNombre(posicion,nombre,gafas,cabello,sexo){
    //guarda los atributos
    array_atributos[contador_array]=posicion+nombre+gafas+cabello+sexo;

    buscaindex = array_atributos[contador_array].indexOf("_");

    while (buscaindex>0){//quitamos las barras bajas
        array_atributos[contador_array]=array_atributos[contador_array].replace("_", " ");
        buscaindex = array_atributos[contador_array].indexOf("_");
    }
    contador_array++;
}

function ordenarArrayDeAtributos(){
    //en el primer intento, el array sale desordenado, asi que lo ordenaremos para que funcione bien tanto easy como very easy
    posicion_nuevo_array=0;
    while(array_atributos_ordenados[11]==null){
        for (var i = 0; i < 12; i++) {
            buscaindex = array_atributos[i].indexOf("posicion:"+posicion_nuevo_array+" ");
            if (buscaindex>-1) {
                array_atributos_ordenados[posicion_nuevo_array]=array_atributos[i];
                posicion_nuevo_array++;
            }
        }    
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
    if (veryeasy==true){
        eliminarOpcion();
    }
    else{
        resetearComboBox();
    }
    botonHacerPregunta.disabled = true;
}

function eliminarOpcion(){
    var x = document.getElementById("pregunta");
    x.remove(x.selectedIndex);
    x.selectedIndex = 0;
}

function sacarMensajeAlertaSinVolteo() {

    if (easy==false && veryeasy==false) {

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

    if (easy==true){
        //si el modo easy esta activado, sumara de 3 en 3
        contadorPreguntas=contadorPreguntas+3;
    }
    else if (veryeasy==true){
        //si el modo very easy esta activado, sumara de 4 en 4
        contadorPreguntas=contadorPreguntas+4;
    }
    else{
        //si no, solamente sumara 1
        contadorPreguntas++;
    }
    document.getElementById('contador_preguntas').innerHTML = contadorPreguntas;
}

function desaparecerBotonEasy() {
    //Si hacemos la pregunta, simplemente desactivara el boton
    document.getElementById("dificultad").style.display="none";
    document.getElementById("parrafoElegirDificultad").style.display="none";
}

function cogerDatos(){
    nombre_carta=document.getElementById("nombre_php-js").innerHTML;
    gafas_carta=document.getElementById("gafas_php-js").innerHTML;
    cabello_carta=document.getElementById("cabello_php-js").innerHTML;
    sexo_carta=document.getElementById("sexo_php-js").innerHTML;
}

function preguntarAlServer() {


    cogerDatos();
    pregunta_combo = document.getElementById('pregunta').value;

    var i=0;

    if (pregunta_combo == "hombre" && sexo_carta == "hombre") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("sexo:mujer");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaCorrecta();
    }

    else if (pregunta_combo == "hombre" && sexo_carta == "mujer") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("sexo:hombre");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "mujer" && sexo_carta == "mujer") {
        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("sexo:hombre");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaCorrecta();
    }

    else if (pregunta_combo == "mujer" && sexo_carta == "hombre") {
        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("sexo:mujer");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "si" && gafas_carta == "si") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("gafas:no");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaCorrecta();
    }

    else if (pregunta_combo == "si" && gafas_carta == "no") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("gafas:si");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "no" && gafas_carta == "no") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("gafas:si");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaCorrecta();
    }

    else if (pregunta_combo == "no" && gafas_carta == "si") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("gafas:no");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "rubio" && cabello_carta == "rubio") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:moreno");
                buscaindex2 = array_atributos_ordenados[i].indexOf("cabello:pelirrojo");
                if (buscaindex>0 || buscaindex2>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaCorrecta();
    }

    else if (pregunta_combo == "rubio" && cabello_carta == "moreno") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:rubio");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "rubio" && cabello_carta == "pelirrojo") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:rubio");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "moreno" && cabello_carta == "moreno") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:rubio");
                buscaindex2 = array_atributos_ordenados[i].indexOf("cabello:pelirrojo");
                if (buscaindex>0 || buscaindex2>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaCorrecta();
    }

    else if (pregunta_combo == "moreno" && cabello_carta == "rubio") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:moreno");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "moreno" && cabello_carta == "pelirrojo") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:moreno");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "pelirrojo" && cabello_carta == "pelirrojo") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:moreno");
                buscaindex2 = array_atributos_ordenados[i].indexOf("cabello:rubio");
                if (buscaindex>0 || buscaindex2>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaCorrecta();
    }

    else if (pregunta_combo == "pelirrojo" && cabello_carta == "rubio") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:pelirrojo");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }

    else if (pregunta_combo == "pelirrojo" && cabello_carta == "moreno") {

        if (easy==true || veryeasy==true){
            while (i<12){
                buscaindex = array_atributos_ordenados[i].indexOf("cabello:pelirrojo");
                if (buscaindex>0) {
                    if (document.getElementById(i)) {
                        giraCartaV2(i);
                        document.getElementById(i).id="card rotated";
                        document.getElementById(i).id="card rotated";
                        
                    }
                }
                i++;
            }
        }

        preguntaIncorrecta();
    }
    else {
        document.getElementById('texto_salida').innerHTML = "Esa pregunta no estaba prevista.";
        document.getElementById("botonDeColorRojo").style.display = "none";
        document.getElementById("botonDeColorVerde").style.display = "none";
    }
}

function preguntaCorrecta(){
    document.getElementById('texto_salida').innerHTML = "SI";
    document.getElementById("botonDeColorRojo").style.display = "none";
    document.getElementById("botonDeColorVerde").style.display = "block";
    funcionContadorPreguntas();
    sacarMensajeAlertaSinVolteo();
    girarCuandoDeba();
    saberSiHaGanado();
}

function preguntaIncorrecta(){
    document.getElementById('texto_salida').innerHTML = "NO";
    document.getElementById("botonDeColorVerde").style.display = "none";
    document.getElementById("botonDeColorRojo").style.display = "block";
    funcionContadorPreguntas();
    sacarMensajeAlertaSinVolteo();
    girarCuandoDeba();
    saberSiHaGanado();
}

function saberSiHaGanado(){
    if (contadorVolteo == 11) {

        //se utiliza para saber el nombre de la carta principal:
        cogerDatos();

        for (var i = 0; i < 12; i++) {
            if (isNaN(document.getElementsByClassName("carta card")[i].id)==false){
                //se guardara la ultima carta para luego compararla con la principal:
                nun=array_atributos_ordenados[i].indexOf(nombre_carta);
            }
        }
        if (nun>0) {
            haGanado=true;
        }
        else{
            haGanado=false;
        }
        finDelJuego();
    }
    if (contadorVolteo == 12){
        haGanado=false;
        finDelJuego();

    }
}

function activarBoton(){

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
    document.getElementById("textoEasy").innerHTML = "Modo "+document.getElementById("dificultad").value+ " Activado, ya no podras girar cartas!";
    //devuelve en texto el combo que has seleccionado

    if(lista.selectedIndex == 1 || lista.selectedIndex == 2) {
        lista.disabled = true;  
        if (lista.selectedIndex == 1){
            document.getElementById("parrafoElegirDificultad").style.display="none";
             document.getElementById("textoEasy").innerHTML =  document.getElementById("textoEasy").innerHTML + "<br> (al haber activado el modo easy, se sumaran los intentos de 3 en 3)"
            easy=true;

        }
        if (lista.selectedIndex == 2){
            document.getElementById("parrafoElegirDificultad").style.display="none";
            document.getElementById("textoEasy").innerHTML =  document.getElementById("textoEasy").innerHTML + "<br> (al haber activado el modo very easy, se sumaran los intentos de 4 en 4)"
            veryeasy=true;
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
     if(easy==true || veryeasy==true || totalTiempo==0){
         //No la podra girar, ya que no tiene tiempo
        }
    else{
        //podra girar la carta
        girarCarta(event);
    }
}

function finDelJuego(){

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