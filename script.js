var cards;
var botonHacerPregunta;
var contadorVolteo = 0;
var respuestasPosiblesCBox;
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
        alert(id); // dice el ID de la pregunta
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