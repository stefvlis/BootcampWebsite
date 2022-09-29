// const cors = require("cors");
// app.use(cors());
let url = 'https://b10bc-weu-jsonreaderstef-fa.azurewebsites.net/api/HelloWorld'
let url2 = 'https://b10bc-weu-jsonreaderstef-fa.azurewebsites.net/api/OrderFunction'
let menu;
const knop = document.getElementById("betaalKnop");
var toPay = 0;
var dishList = new Array();

function getJSON() {
    fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            menu = data;
            console.log(menu);
            printMenu(menu);
        })
        .catch((error) => { console.log(error) });
}
//comment
function printMenu(pMenu) {
    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var menuTable = document.getElementById("menuTable")

    var tableRow = document.createElement("tr");

    var idHeader = document.createElement("td");
    var idHeaderText = document.createTextNode("ID");
    idHeader.appendChild(idHeaderText);

    var nameHeader = document.createElement("td");
    var nameHeaderText = document.createTextNode("Item");
    nameHeader.appendChild(nameHeaderText);

    var priceHeader = document.createElement("td");
    var priceHeaderText = document.createTextNode("Price");
    priceHeader.appendChild(priceHeaderText);

    var countHeader = document.createElement("td");
    var countHeaderText = document.createTextNode("Count");
    countHeader.appendChild(countHeaderText);

    tableRow.appendChild(idHeader);
    tableRow.appendChild(nameHeader);
    tableRow.appendChild(priceHeader);
    tableRow.appendChild(countHeader);

    menuTable.appendChild(tableRow);

    pMenu.forEach(menuItem => {

        var tableRow = document.createElement("tr");

        var idTableData = document.createElement("td");
        var idText = document.createTextNode(menuItem.id);
        idTableData.appendChild(idText)

        var nameTableData = document.createElement("td");
        var nameText = document.createTextNode(menuItem.Dish);
        nameTableData.appendChild(nameText)

        var priceTableData = document.createElement("td");
        var priceText = document.createTextNode(menuItem.Price);
        priceTableData.appendChild(priceText);

        var count = document.createElement("td");
        var countText = document.createTextNode(0);
        count.appendChild(countText);
        count.id = menuItem.id

        var buttonInTable = document.createElement("td");
        var button = document.createElement("input");
        button.type = "button";
        button.value = "Order";
        button.id = menuItem.id
        button.onclick = function () { addItem(pMenu[menuItem.id].Price, pMenu[menuItem.id].Dish); updateCount(menuItem.id); };
        buttonInTable.appendChild(button);

        tableRow.appendChild(idTableData);
        tableRow.appendChild(nameTableData);
        tableRow.appendChild(priceTableData);
        tableRow.appendChild(count);
        tableRow.appendChild(buttonInTable);

        menuTable.appendChild(tableRow);
    })

    function addItem(x, y) {
        toPay += x;
        dishList.push(y);
    }

    function updateCount(id) {
        count[id] += 1;
        document.getElementById(id).innerHTML = count[id];
    }
}

function computeTotal() {
    var paragraph = document.createElement("p");
    var message = document.createTextNode("Your total is " + toPay.toFixed(2) + " euros");
    paragraph.appendChild(message);
    var betalenMessage = document.getElementById("toPay");
    betalenMessage.appendChild(paragraph);
    knop.style.display = "none";
    var dishesList = dishList.toString();
    var output = `{
        "Bedrag":${toPay}, "Dishes":"${dishesList}"
    }`
    console.log(output)

    fetch(url2, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: output,
    })
        .then((response) => alert("Thank you for the order of " + TotalEuro + " Euro"))
        .catch((error) => alert("An error has occured"));
}

