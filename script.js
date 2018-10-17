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
