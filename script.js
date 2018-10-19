var cards;

function flip() {
	var elemento = this;
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



function preguntarAlServer() {
	var selector1 = document.getElementById('gafas');
    var value1 = selector1[selector1.selectedIndex].value;

    var selector2 = document.getElementById('cabello');
    var value2 = selector2[selector2.selectedIndex].value;

    var selector3 = document.getElementById('sexo');
    var value3 = selector3[selector3.selectedIndex].value;

    if ((value1 != "---" && value2 != "---") || (value1 != "---" && value3 != "---") || (value2 != "---" && value3 != "---") ){
    	document.getElementById('texto_salida').innerHTML = "No se puede seleccionar mas de uno";
    }
    else if (value1 != "---"){
    	document.getElementById('texto_salida').innerHTML = value1;
    }
    else if (value2 != "---"){
    	document.getElementById('texto_salida').innerHTML = value2;
    }
    else if (value3 != "---"){
    	document.getElementById('texto_salida').innerHTML = value3;
    }
    else{
    	document.getElementById('texto_salida').innerHTML = "No hay nada seleccionado";
    }
}