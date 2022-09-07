var toPay = 0;
var count = [0,0,0,0,0,0,0,0,0,0,0];
const knop = document.getElementById("betaalKnop");

function addItem(x) {
    toPay += x;
}

function computeTotal() {
    var paragraph = document.createElement("p"); 
    var message = document.createTextNode("Your total is " + toPay.toFixed(2) + " euros");
    paragraph.appendChild(message);
    var betalenMessage = document.getElementById("toPay");
    betalenMessage.appendChild(paragraph); 
    knop.style.display = "none";
}

function updateCount(id) {
    count[id]+=1;
    //let newCount =count[id];
    document.getElementById(id).innerHTML = count[id];
}