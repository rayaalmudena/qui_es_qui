var cards;
var botonHacerPregunta;
var contadorVolteo = 0;
var respuestasPosiblesCBox;
var contadorPreguntas = 0;
var cartaServidor;
var totalTiempo=20;//funcion de girar carta
var intervalo1;//funcion de girar carta


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
            if(element.style.transform == "rotateY(180deg)") {

            } else {
                element.style.transform = "rotateY(180deg)";
                contadorVolteo++;
                flipCardSound.play();
            }
        }
    }

    if (contadorVolteo >= 11) {
        hasAcabado();
    }
  }

document.addEventListener('DOMContentLoaded', function(){
    // Activa el botón y todas las funciones que hay dentro de él
    botonHacerPregunta = document.getElementById("hacerPregunta");
    botonHacerPregunta.addEventListener("click", botonActivado);
});

document.addEventListener('DOMContentLoaded', function(){
    //Activar modo Easy
    botonHacerPregunta = document.getElementById("buttonEasy");
    botonHacerPregunta.addEventListener("click", activarModoEasy);
});


if ( window.addEventListener ) {
    // Arriba, Arriba, Abajo, Abajo, Deracha, Izquierda, Derecha, Izquierda, B, A, Enter
    var state = 0, konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];  
    window.addEventListener("keydown", function(e) {  
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
      }
  }, true);  
}  


function botonActivado() {
    desaparecerBotonEasy();
    sacarMensajeAlertaSinVolteo();
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

function activarModoEasy() {
    //Si activamos el boton easy, aparecera un texto diciendolo.
    document.getElementById("buttonEasy").style.display="none";
    document.getElementById("textoEasy").innerHTML = "Modo Easy Activado";
}

function desaparecerBotonEasy() {
    //Si hacemos la pregunta, simplemente desactivara el boton
    document.getElementById("buttonEasy").style.display="none";
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
    winSound.play();
}
function preguntaIncorrecta(){
    document.getElementById('texto_salida').innerHTML = "NO";
    document.getElementById("botonDeColorVerde").style.display = "none";
    document.getElementById("botonDeColorRojo").style.display = "block";
    funcionContadorPreguntas();
    sacarMensajeAlertaSinVolteo();
    loseSound.play();
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
                totalTiempo-=1;
                /* Ejecutamos nuevamente la función al pasar 1000 milisegundos (1 segundo) */
                intervalo1 = setTimeout("tiempoRecursivo()",1000);
        }
}

function puedeGirarCarta(event){
    if(totalTiempo==0)
        {
         //No la podra girar, ya que no tiene tiempo
        }
    else{
        //podra girar la carta
        girarCarta(event);
    }
}

function hasAcabado(){

    //if ganado:
    juegoGanado();
    //if perdido:
    //juegoPerdido();
    
}

function juegoGanado(){

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
        //document.getElementById("canvas").style.visibility = "visible";
        
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


function recogerCartaServidor() {
    cartaServidor = document.getElementsByClassName("cartaElegida")[0];
    return cartaServidor.name;
}

function mostrarCartaServer() {
    var chosenOneCard = recogerCartaServidor();
    var elementos = document.getElementsByClassName(cartaElegida)[0];
    element.removeAttribute('src')
    elementos.setAttribute(src, chosenOneCard);
}




function compararServerConUsuario() {
    //var cartaFinal = recogerCartaUsuario();
    cartaServidor = recogerCartaServidor();
    /*
    if (cartaFinal == cartaServidor) {
        return true;
    }
    */
    return false;
}

// No me sale :(
function recogerCartaUsuario() {
    // Aqui compararemos la imagen que tiene el server con la que tiene el usuario
    arrayCartasPosibles = document.getElementsByClassName("card");
    var cartaUsuario;
    for (var i = 0; i < arrayCartasPosibles.length; i++) {
        var elemento = arrayCartasPosibles[i].classList.value
        
        if (elemento == "carta card") {
            cartaUsuario = arrayCartasPosibles[i];
            alert(cartaUsuario);
            return cartaUsuario.name;
        }
    }
}


////Fireworks 
"use strict";

let canvas, width, height, ctx;
let fireworks = [];
let particles = [];

function setup() {
    canvas = document.getElementById("canvas");
    setSize(canvas);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    fireworks.push(new Firework(Math.random()*(width-200)+100));
    window.addEventListener("resize",windowResized);
    document.addEventListener("click",onClick);
}

setTimeout(setup,1);

function loop(){
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    for(let i=0; i<fireworks.length; i++){
        let done = fireworks[i].update();
        fireworks[i].draw();
        if(done) fireworks.splice(i, 1);
    }

    for(let i=0; i<particles.length; i++){
        particles[i].update();
        particles[i].draw();
        if(particles[i].lifetime>90) particles.splice(i,1);
    }

    if(Math.random()<1/60) fireworks.push(new Firework(Math.random()*(width-200)+50));
}
setInterval(loop, 1/50);
class Particle{
    constructor(x, y, col){
        this.x = x;
        this.y = y;
        this.col = col;
        this.vel = randomVec(2);
        this.lifetime = 0;
    }

    update(){
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.vel.y += 0.02;
        this.vel.x *= 0.99;
        this.vel.y *= 0.99;
        this.lifetime++;
    }

    draw(){
        ctx.globalAlpha = Math.max(1-this.lifetime/80, 0);
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

class Firework{
    constructor(x){
        this.x = x;
        this.y = height;
        this.isBlown = false;
        this.col = randomCol();
    }

    update(){
        this.y -= 3;
        if(this.y < 350-Math.sqrt(Math.random()*500)*40){
            this.isBlown = true;
            for(let i=0; i<60; i++){
                particles.push(new Particle(this.x, this.y, this.col))
            }
        }
        return this.isBlown;
    }

    draw(){
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

function randomCol(){
    var letter = '0123456789ABCDEF';
    var nums = [];

    for(var i=0; i<3; i++){
        nums[i] = Math.floor(Math.random()*256);
    }

    let brightest = 0;
    for(var i=0; i<3; i++){
        if(brightest<nums[i]) brightest = nums[i];
    }

    brightest /=255;
    for(var i=0; i<3; i++){
        nums[i] /= brightest;
    }

    let color = "#";
    for(var i=0; i<3; i++){
        color += letter[Math.floor(nums[i]/16)];
        color += letter[Math.floor(nums[i]%16)];
    }
    return color;
}

function randomVec(max){
    let dir = Math.random()*Math.PI*2;
    let spd = Math.random()*max;
    return{x: Math.cos(dir)*spd, y: Math.sin(dir)*spd};
}

function setSize(canv){
    canv.style.width = (innerWidth) + "px";
    canv.style.height = (innerHeight) + "px";
    width = innerWidth;
    height = innerHeight;

    canv.width = innerWidth*window.devicePixelRatio;
    canv.height = innerHeight*window.devicePixelRatio;
    canvas.getContext("2d").scale(window.devicePixelRatio, window.devicePixelRatio);
}

function onClick(e){
    fireworks.push(new Firework(e.clientX));
}

function windowResized(){
    setSize(canvas);
    ctx.fillStyle = "#22264b";
    ctx.fillRect(0, 0, width, height);
}
/////Fin FIREWORKS


////////////MODAL
// Get the modal


document.addEventListener('DOMContentLoaded', function(){

    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});



////////////fin modal
