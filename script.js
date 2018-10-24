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

function flip(event){

    if (contadorVolteo >= 11) {
        return false;
    }
    else{
        var element = event.currentTarget;
        if (element.className === "card") {
            if(element.style.transform == "rotateY(180deg)") {
        
            }
            else {
                element.style.transform = "rotateY(180deg)";
                contadorVolteo++;
                flipCardSound.play();
            }
        }
    }
    if (contadorVolteo==11){
        document.getElementByClassName("cartaElegida").style.transform = "rotateY(180deg)";
    }
  }

    if (contadorVolteo >= 11) {
        hasAcabado();
    }
    
;

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

function desaparecerBotonEasy() {
    //Si activamos el boton easy, aparecera un texto diciendolo.
    document.getElementById("buttonEasy").style.display="none";
    document.getElementById("textoEasy").innerHTML = "Modo Easy Activado";
}
function desaparecerBotonEasy2() {
    //Si hacemos la pregunta, simplemente desactivara el boton
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
            atributo = respuestasPosiblesCBox[i].value;
            id = respuestasPosiblesCBox[i].getAttribute("class")
            id = id.replace("cbox ","");
        } else {
            semaforo++;            
        }
    }

  
    if (semaforo == 3) {
        //alert(gafas_carta);
        document.getElementById('texto_salida').innerHTML =
        "No hay nada seleccionado";
    
    } else if (semaforo == 2) {
        // Esto es correcto
        nombre_carta=document.getElementById("nombre_php-js").innerHTML;
        gafas_carta=document.getElementById("gafas_php-js").innerHTML;
        cabello_carta=document.getElementById("cabello_php-js").innerHTML;
        sexo_carta=document.getElementById("sexo_php-js").innerHTML;

        gafas = document.getElementById('gafas')[document.getElementById('gafas').selectedIndex]

        // if (atributo == gafas?)
        // if (atributo == cabello?)
        // if (atributo == sexo?)

        //////////////////////////////// ESTO SE PODRIA REFACTORIZAR SI SE PUDIESE IGUALAR EL .VALUE A LA VARIABLE, PERO DANDO EL MISMO RESULTADO, AL COMPARAR EL PROGRAMA DICE QUE ES DIFERENTE
        if (gafas.value == gafas_carta) {
            // Esta funciona, creo, pero no sé por qué
            document.getElementById('texto_salida').innerHTML = "SI";
        }
        if (gafas.value=="no" && gafas_carta=="no") {
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

function hasAcabado(){
    alert("Ya has acabado el juego");
}

function resetearComboBox(id) {
    for (var i = 0; i < respuestasPosiblesCBox.length; i++) {
        id = respuestasPosiblesCBox[i]
        id.selectedIndex = 0;
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
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    fireworks.push(new Firework(Math.random()*(width-200)+100));
    window.addEventListener("resize",windowResized);
    document.addEventListener("click",onClick);
}

setTimeout(setup,1);

function loop(){
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#22264b";
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

    if(Math.random()<1/60) fireworks.push(new Firework(Math.random()*(width-200)+100));
}
setInterval(loop, 1/50);
//setInterval(loop, 100/60);
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
