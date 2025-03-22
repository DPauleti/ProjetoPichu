// Let's go gambling!!!
// BlackJack with Jack Black


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


//FUNCTIONS
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
function dealRandomCard(player) {
    console.log("Dealing random card to " + player);

    if (player === "user") {
        handUser.push(randomCard());
    } else if (player === "dealer") {
        handDealer.push(randomCard());
    } else {
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
}

//Show current gamestate
function showGamestate() {
    console.log("User hand: " + handUser);
    console.log("Dealer hand: " + handDealer);
}

//Create score array (LUCAS)

//Calculate score (LUCAS)

//Ace value (LUCAS)

//Blackjack

//Bust

//Check winner

//Turn order
let turnActive = "";

function dealerTurn() {
    console.log("Dealer turn");
    turnActive = "dealer";
}

function userTurn() {
    console.log("User turn");
    turnActive = "user";
}

//Game start function
function startGame() {
    resetGamestate();

    for (let i = 0; i < 2; i++) { //Deal 2 cards to each player
        dealRandomCard("user");
        dealRandomCard("dealer");
    }

    showGamestate();
    userTurn();
    console.log("Game started");
}

//House algorithm

//Hidden cards

//TESTING
// dealRandomCard("user");
// dealRandomCard("dealer");
// showGamestate();
// console.log(deck);
// resetGamestate();
// showGamestate();
// console.log(deck);
startGame();
console.log(deck);