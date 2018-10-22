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

document.addEventListener('DOMContentLoaded', function(){
    botonHacerPregunta = document.getElementById("hacerPregunta");
    botonHacerPregunta.addEventListener("click", botonActivado);
});

function botonActivado() {
    preguntarAlServer();

    if (contadorVolteo >= 11) {

    }
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
        alert(id); // dice el ID de la pregunta (ESTO SIRVE PARA SABER CON QUÉ COMPARAR CON EL SERVER)
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
<?php $mivarPhp = "Asignado en PHP"; 
     echo $mivarPhp."\n<br>";
?>
<script type="text/javascript">
var mivarJS ="Asignado en JS";
     alert (mivarJS);
     mivarJS="<?php echo $mivarPhp ?>";
     alert (mivarJS);
</script>
*/

/////Fireworks
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
        ctx.fillStyle = "#000000";
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
            if(particles[i].lifetime>80) particles.splice(i,1);
        }

        if(Math.random()<1/60) fireworks.push(new Firework(Math.random()*(width-200)+100));
    }
    setInterval(loop, 1/60);
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
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
    }
//^Fireworks