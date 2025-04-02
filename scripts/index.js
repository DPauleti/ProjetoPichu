// Let's go gambling!!!
// BlackJack with Jack Black
// Chicken Jockey

//CONSTANTS
//Create deck array
const deckBase = ['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC',
    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD',
    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH',
    'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS'];

//Operate on clone
let deck = deckBase.slice();

//Create hands
let handUser = [];
let handDealer = [];

//Deck creator
//Shouldn't be needed, unless deck array is deleted by chimps    
/* 
function createDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["C", "D", "H", "S"];

    suits.forEach(element => {
        values.forEach(suit => {
            deckBase.push(suit + element);
        });
    });
} */


//FUNCTIONS - Backend
//Deal random card
function randomCard() {
    //console.log("Dealing random card")

    const randomIndex = Math.floor(Math.random() * deck.length); //Random index
    const card = deck[randomIndex]; //Random card
    deck.splice(randomIndex, 1); //Remove card from deck
    //console.log(card);
    //console.log(deck);
    return card;
}

//Deal to hand
function dealRandomCard(player, hidden = false) {
    console.log("Dealing random card to " + player);

    const card = randomCard();
    //Function will not work unless turnActive is set
    //turnActive = "user";

    if (player === "user") { //Checks to see if player and turn line up
        if (turnActive === "user" || turnActive === "start") {
            handUser.push(card);
            displayCard(card, "user");
            //log(); //Log dealing card message
            log(cardMessage(card));}
        else {
            console.log("User turn not active");}} //Prints for easier debugging
    else if (player === "dealer") {
        if (turnActive === "dealer" || turnActive === "start") {
            handDealer.push(card);
            displayCard(card, "dealer", hidden);}
        else {
            console.log("Dealer turn not active");}}
    else {
        console.log("Invalid player");
    }
}

//Reset deck
function resetDeck() {
    deck = deckBase.slice();
    //console.log("Deck reset");
}

//Reset hands
function resetHands() {
    handUser = [];
    handDealer = [];
    //console.log("Hands reset");
}

//Reset gamestate
function resetGamestate() {
    resetDeck();
    resetHands();
    console.log("Gamestate reset");
    //Reset visual aspects
}

//Show current gamestate (debug)
function showGamestate() {
    console.log("User hand: " + handUser);
    console.log("Dealer hand: " + handDealer);
}

//Create score array (LUCAS) - Dicionário de valores

//Calculate score (LUCAS) - Calcula valor total dado uma mão e o dicionário de valores

//Ace value (LUCAS) - Se um jogador tiver um Ás, ele pode ser 1 ou 11. Se o jogador tiver um Ás e o valor total for maior que 21, o Ás vale 1. Se o jogador não tiver um Ás, o valor total é a soma dos valores das cartas.

//Blackjack - Calculate score
function blackjack() {
};

//Bust - Calculate score

//End Game
//1. User blackjack
//2. User bust
//3. Dealer wins
//4. Dealer bust
function endGame(player) {
};

//Turn order
function dealerTurn() {
    console.log("Dealer turn");
    turnActive = "dealer";
}

function userTurn() {
    console.log("User turn");
    turnActive = "user";
}

//Stand (UNFINISHED)
function stand() {
    console.log("User stand");
    log(messageDictionary("stand", "user"));
    dealerTurn();
    //Reveal hidden card
    //Validate dealer score
}

//Game start function
function startGame() {
    resetGamestate();

    log(messageDictionary("start"));

    turnActive = "start"; //Set turn to user

    dealRandomCard("user"); //Deal 2 cards to each player
    dealRandomCard("dealer");
    dealRandomCard("user");
    dealRandomCard("dealer", true); //Dealer gets hidden card

    showGamestate();
    userTurn();
    console.log("Game started");
}

//Stand

//House algorithm

//TESTING
// dealRandomCard("user");
// dealRandomCard("dealer");
// showGamestate();
// console.log(deck);
// resetGamestate();
// showGamestate();
// console.log(deck);
// startGame();
// console.log(deck);


//FUNCTIONS - Frontend
//Display card
function displayCard(card, player, hidden = false) {
    let imageSection;
    if (player == "user") { //Check if player is user or dealer
        imageSection = document.getElementById("userBoard");
    } else if (player == "dealer") {
        imageSection = document.getElementById("dealerBoard");
    }

    const cardImage = document.createElement("img");

    if (hidden) {
        cardImage.src = "../img/baralho.webp"; //Hidden card image
        cardImage.setAttribute("data-card", card); //Store card name
        cardImage.classList.add("hidden-card"); //Add class for selection later
    } else {
        cardImage.src = `../img/${card}.jpg`; //Get card image
    }

    cardImage.classList.add("card"); //Add class to card
    imageSection.appendChild(cardImage); //Add card to image section
}

//Reveal hidden card
function revealHiddenCards() {
    document.querySelectorAll(".hidden-card").forEach((img) => {
        const cardName = img.getAttribute("data-card"); //Get stored card name
        img.src = `../img/${cardName}.jpg`; //Update src to show the actual card
        img.classList.remove("hidden-card"); //Remove hidden class
    });
}

//Log messages - Function to display messages in the log section
function log(message) {
    const logSection = document.getElementById("logContent");
    const logMessage = document.createElement("p");
    logMessage.textContent = message;
    logSection.appendChild(logMessage);
}

//Clear log messages (UNFINISHED)
function clearLog () {

}

//Card to message - Function to convert card name to message
function cardMessage(card) {
    let cardValue = card.slice(0, -1); //Get the value of the card
    let cardSuit = card.slice(-1); //Get the suit of the card
    
    var suits = { //Get suit name
        'C': 'Paus',
        'D': 'Ouros',
        'H': 'Copas',
        'S': 'Espadas'
    };

    var values = { //Get value name
        '2': "2",
        '3': "3",
        '4': "4",
        '5': "5",
        '6': "6",
        '7': "7",
        '8': "8",
        '9': "9",
        '0': "10",
        'J': "Valete",
        'Q': "Rainha",
        'K': "Rei",
        'A': "Ás"
    };

    return `${values[cardValue]} de ${suits[cardSuit]}`;
}

//Message dictionary (UNFINISHED) -  Function called to return messages based on game events
function messageDictionary(trigger, player = "") {
    var messageBase = { //Implement better dictionary
        "start": "O jogo começou!",
        "hit": `pediu mais uma carta!`,
        "stand": `parou!`,
        "bust": `estourou!`,
        "blackjack": `fez um blackjack!`,
        "win": `ganhou!`,
        "lose": `perdeu!`, //Add messages to every relevant function
    };

    var playerName = {
        "user": "Você ",
        "dealer": "A casa ",
        "" : ""
    }

    return `${playerName[player]}${messageBase[trigger]}`
}

//Change score display

//Dealer hidden score

//Win / Lose display