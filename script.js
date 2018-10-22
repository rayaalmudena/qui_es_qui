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
//




document.addEventListener('DOMContentLoaded', function(){ 
	cards = document.getElementsByClassName("card");
	for (var i = 0; i < cards.length; i++) {
		var card = cards[i];
		card.addEventListener("click", flip);
	}
});

document.addEventListener('DOMContentLoaded', function(){
    botonHacerPregunta = document.getElementById("hacerPregunta");
    botonHacerPregunta.addEventListener("click", preguntarAlServer);
});

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

function preguntarAlServer() {

    var respuestasPosiblesCBox = [].slice.call(document.getElementsByClassName("cbox"));

    // Si no han respondido = 3, si han respondido una = 2, si han respondido mas de una = 0 o 1
    var semaforo = 0;
    var atributo;
    var id;
    for (var i = 0; i < respuestasPosiblesCBox.length; i++) {
        if (respuestasPosiblesCBox[i].value != "---" && semaforo <= 1) {
            atributo = respuestasPosiblesCBox[i].value;
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
        alert(id);

    } else if (semaforo == 1 || semaforo == 0) {
        document.getElementById('texto_salida').innerHTML = "No se pueden seleccionar más de dos elementos";

    } else {
        document.getElementById('texto_salida').innerHTML = "ERROR";
    }

    // resetearComboBox();
}