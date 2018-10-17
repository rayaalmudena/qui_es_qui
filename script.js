document.getElementById("myBtn").addEventListener("click", flip);

var cardNames = [
	"mago",
	"dragon",
	"exodia"
];

function flip(num) {
	var carta = cardNames[num];
	
	var elementos = document.getElementsByName(carta)[0];

	elementos.setAttribute(carta, "back");
	elementos.removeAttribute(carta);
	
	document.back.src="back.png";
}