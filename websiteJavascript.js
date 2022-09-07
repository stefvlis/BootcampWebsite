var toPay = 0;
const knop = document.getElementById("betaalKnop")

function addItem(x) {
    toPay += x
}

function computeTotal() {
    var paragraph = document.createElement("p"); 
    var message = document.createTextNode("Your total is " + toPay.toFixed(2) + " euros");
    paragraph.appendChild(message);
    var betalenMessage = document.getElementById("toPay")
    betalenMessage.appendChild(paragraph); 
    knop.style.display = "none"
}
