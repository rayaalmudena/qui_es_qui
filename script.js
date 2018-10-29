var cards;
var botonHacerPregunta;
var contadorVolteo = 0;
var respuestasPosiblesCBox;
var contadorPreguntas = 0;
var cartaServidor;

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


// CODIGO DEL EASTER EGG, IR CON CUIDADO PORQUE NO ESTÁ IMPLEMENTADO! 
if ( window.addEventListener ) {  
    var state = 0, konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];  
    window.addEventListener("keydown", function(e) {  
      if ( e.keyCode == konami[state] ) state++;  
      else state = 0;  
      if ( state == 11 )  {
        flipCardSound = "easter_egg/konamiFlip3.mp3";
        winSound = "easter_egg/konamiWin.mp3";
        loseSound = "easter_egg/konamiLose.mp3";
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
    funcionContadorPreguntas();
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
    respuestasPosiblesCBox = [].slice.call(document.getElementsByClassName("cbox"));

    // Si no han respondido = 3, si han respondido una = 2
    // Si han respondido mas de una = 0 o 1
    var semaforo = 0;
    var id;
    for (var i = 0; i < respuestasPosiblesCBox.length; i++) {
        if (respuestasPosiblesCBox[i].value != "---") {
            id = respuestasPosiblesCBox[i].getAttribute("class");
            id = id.replace("cbox ","");
        } else {
            semaforo++;            
        }
    }
    //Si no se deshabilita el gif, aparecera doble cuando se vuelva a hacer otra pregunta
    document.getElementById("botonDeColorVerde").style.display = "none";
    document.getElementById("botonDeColorRojo").style.display = "none";

    if (semaforo == 3) {
        document.getElementById('texto_salida').innerHTML =
        "No hay nada seleccionado";
    
    } else if (semaforo == 2) {
        // Esto es correcto
        responderAlJugador(id);
        
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
        id = respuestasPosiblesCBox[i];
        id.selectedIndex = 0;
    }
}

function responderAlJugador(id) {
    nombre_carta = document.getElementById("nombre_php-js").innerHTML;
    gafas_carta = document.getElementById("gafas_php-js").innerHTML;
    cabello_carta = document.getElementById("cabello_php-js").innerHTML;
    sexo_carta = document.getElementById("sexo_php-js").innerHTML;

    llevaGafas = document.getElementById('gafas')[document.getElementById('gafas').selectedIndex];
    llevaCabello = document.getElementById('cabello')[document.getElementById('cabello').selectedIndex];
    llevaSexo = document.getElementById('sexo')[document.getElementById('sexo').selectedIndex];

    if (id == "gafas") {
        if (llevaGafas.value == gafas_carta && llevaGafas.value != "---") {
            document.getElementById('texto_salida').innerHTML = "SI";
            document.getElementById("botonDeColorVerde").style.display = "block";
            winSound.play();

        } else {
            document.getElementById('texto_salida').innerHTML = "NO";
            document.getElementById("botonDeColorRojo").style.display = "block";
            loseSound.play();
        }
    
    } else if (id == "cabello") {
        if (llevaCabello.value == cabello_carta && llevaCabello.value != "---") {
            document.getElementById('texto_salida').innerHTML = "SI";
            document.getElementById("botonDeColorVerde").style.display = "block";
        } else {
            document.getElementById('texto_salida').innerHTML = "NO";
            document.getElementById("botonDeColorRojo").style.display = "block";
        }
    } else if (id == "sexo") {
        if (llevaSexo.value == sexo_carta && llevaSexo.value != "---") {
            document.getElementById('texto_salida').innerHTML = "SI";
            document.getElementById("botonDeColorVerde").style.display = "block";
        } else {
            document.getElementById('texto_salida').innerHTML = "NO";
            document.getElementById("botonDeColorRojo").style.display = "block";
        }
    } else {
        document.getElementById('texto_salida').innerHTML = "ERROR";
        document.getElementById("botonDeColorVerde").style.display = "none";
        document.getElementById("botonDeColorRojo").style.display = "none";
    }
}

function hasAcabado(){
    mostrarCartaServer();
    var endGame = compararServerConUsuario();
    if (endGame == true) {
        document.getElementById("canvas").style.visibility = "visible";
        // Aqui va el modal de haber ganado
    } else {
        // Modal diciendole al jugador que perdió, hacer refresh de la página
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
