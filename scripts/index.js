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

//Game started and ended flag
let gameStarted = false;
let gameEnded = false;

//Aces value flag
let acesLow = false;

//Score variables
let scoreUser = 0;
let scoreDealer = 0;

//Create score array (LUCAS) - Dicionário de valores
cardsScoreBase = {
    "A": 11, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 10, "J": 10, "Q": 10, "K": 10
}

//Set score array to base array
cardsScore = {...cardsScoreBase}; //Create a copy of the base array to operate on

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

//Deal to hand (UNFINISHED)
function dealRandomCard(player, hidden = false, logDraw = true) {
    //console.log("Dealing random card to " + player);

    const card = randomCard();
    //Function will not work unless turnActive is set
    //turnActive = "user";

    if (player === "user") { //Check if player is user or dealer    
        handUser.push(card);
        displayCard(card, "user");
        //log(messageDictionary("hit", player));
        if (logDraw) { //Log dealing card message
            log(cardMessage(card)); //Log dealing card message
        } 
    } 
    else if (player === "dealer") {
        handDealer.push(card);
        displayCard(card, "dealer", hidden);
        if (logDraw) { //Log dealing card message
            log(cardMessage(card));}
    } 
    else {
        console.log("Invalid player");
    }
}

//Show current gamestate (debug)
function showGamestate() {
    console.log("User hand: " + handUser);
    console.log("Dealer hand: " + handDealer);
}
//Retrieve card value from array
function getCardValue(card) {
    return cardsScore[card[0]];
}

//Calculate score (LUCAS) - Calcula valor total dado uma mão e o dicionário de valores
function calculateScore(player = "") {
    let hand = player === "user" ? handUser : handDealer; //Get hand based on player
    let score = 0;
    hand.forEach(card => score += getCardValue(card)); //Sum values of cards in hand
    updateScore(player, score); //Update score variable
    if (!(turnActive == "user" & player == "dealer")) { //Prevent score message for dealer on game start
        log(messageDictionary("score", player) + scoreMessage(score)); //Log score message
    }
    if (bust(score)) { //Check if score is bust 
        if (aces(hand) & !acesLow) { //Check if hand has aces and if ace value has not been altered
            switchAceValue(); //Switch ace value to 1
            return calculateScore(player); //Recalculate score
        } else {
            log(messageDictionary("bust", player))//Log bust message
            endGame(player === "user" ? false : true)//End game, checking who busted
        }
    }
    if (blackjack(score)) {
        if (!(turnActive != "dealer" & player == "dealer")) { //Prevent dealer blackjack on game start
            log(messageDictionary("blackjack", player)); //Log blackjack message
            endGame(player === "user" ? true : false); //End game, checking who has blackjack
        }     
    }
    return score;
}

//Update score variables
function updateScore(player, score) {
    if (player === "user") { //Check if player is user or dealer
        scoreUser = score; //Set user score
    } else if (player === "dealer") {
        scoreDealer = score; //Set dealer score
    }
}

//Ace checker
function aces(hand) {
    return hand.filter(card => card.startsWith("A")).length > 0; //Boolean to check if there are Aces in hand
}

//Ace value (LUCAS) - Se um jogador tiver um Ás, ele pode ser 1 ou 11. Se o jogador tiver um Ás e o valor total for maior que 21, o Ás vale 1. Se o jogador não tiver um Ás, o valor total é a soma dos valores das cartas.
function switchAceValue() {
    acesLow = true; //Set ace value to low
    cardsScore["A"] = 1; //Set ace value to 1
    //console.log("Ace value switched to low");
};

//Blackjack - Calculate score
function blackjack(score) {
    if (score == 21) { //Check if score is blackjack
        return true
    } else { //Check if dealer has blackjack
        return false; //Return false if not blackjack
    }
};

//Bust - Calculate score
function bust(score) {
    if (score > 21) { //Check if score is greater than 21
        return true; //Return true if bust
    } else {
        return false; //Return false if not bust
    }
}

//Game start function
function startGame() {
    log(messageDictionary("start"));

    turnActive = "start"; //Set turn to start

    dealRandomCard("user", false, false); //Deal 2 cards to each player
    dealRandomCard("dealer", false, false); 
    dealRandomCard("user", false, false);
    dealRandomCard("dealer", true, false); //Dealer gets hidden card

    //showGamestate();
    userTurn(); //Set turn to user
    gameStarted = true; //Set game started flag to true
    displayScore("user"); //Display user score
    displayScore("dealer", true); //Display dealer score with hidden cards
    //console.log("Game started");
}

//End Game
//1. User blackjack
//2. User bust
//3. Dealer wins
//4. Dealer bust
function endGame(userWin) { //Boolean to check if user won or lost
    if (userWin) {
        log(messageDictionary("win", "user"));
    } else {
        log(messageDictionary("lose", "user"));
    }
    gameEnded = true;//Toggle game ended flag
};

//Turn order
function dealerTurn() {
    //console.log("Dealer turn");
    turnActive = "dealer";
}

function userTurn() {
    //console.log("User turn");
    turnActive = "user";
}

//Stand
function stand() {
    //console.log("User stand");
    if (turnActive === "user" & !gameEnded) { //Check if turn is user
        log(messageDictionary("stand", "user"));
        dealerTurn();
        revealHiddenCards(); //Reveal hidden card
        displayScore("dealer"); //Validate dealer score
        setTimeout(houseAction, 1000);} //Run house algorithm after 1 second delay
}

//House algorithm
function houseAction() {
    let player = "dealer"; //Set player to dealer
    if (!gameEnded) {
        if (scoreUser >= scoreDealer) {
            log(messageDictionary("hit", player)); //Log hit message
            dealRandomCard(player); //Deal card to dealer
            displayScore(player); //Update score display
            setTimeout(houseAction, 1000); //Recursion for dealer action
        } else {
            endGame(false) //End game on dealer win
        }}
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

function resetAces() {
    acesLow = false; //Reset ace value
    cardsScore = {...cardsScoreBase}; //Reset score array to base array
    //console.log("Aces reset");
}

//Reset gamestate
function resetGamestate() {
    resetDeck();
    resetHands();
    resetAces(); //Reset ace value
    gameStarted = false; //Reset game started flag
    gameEnded = false; //Reset game ended flag
    turnActive = ""; //Reset turn active flag
    resetScoreDisplay(); //Reset score display
    resetCardDisplay(); //Reset cards on board
    log(messageDictionary("reset")); //Log reset message
    //console.log("Gamestate reset");
}





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
        cardImage.src = "../img/verso.jpg"; //Hidden card image
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

//Clear cards - Function to clear cards from the board
function resetCardDisplay() {
    document.getElementById("userBoard").innerHTML = "";
    document.getElementById("dealerBoard").innerHTML = "";
}


//Log messages - Function to display messages in the log section
function log(message) {
    const logSection = document.getElementById("logContent");
    const logMessage = document.createElement("p");
    logMessage.textContent = message;
    logMessage.classList.add("log-message"); //Add class to message
    logSection.appendChild(logMessage);
}

//Reset log - Function to clear log messages
function resetLog() {
    document.getElementById("logContent").innerHTML = ""; //Clear log messages
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

//Score to message - Function to convert score to message
function scoreMessage(score) {
    return `${score} pontos`;
}

//Message dictionary - Function called to return messages based on game events
function messageDictionary(trigger, player = "") {
    var messageBase = { //Implement better dictionary
        "start": "O jogo começou!", //Add messages to every relevant function
        "hit": `pediu mais uma carta!`,
        "stand": `parou!`,
        "bust": `estourou!`,
        "blackjack": `fez um blackjack!`,
        "win": `ganhou!`,
        "lose": `perdeu!`, 
        "reset": `Preparando um novo jogo...`,
        "score": "tem um total de ",
    };

    var playerName = {
        "user": "Você ",
        "dealer": "A casa ",
        "" : ""
    }

    return `${playerName[player]}${messageBase[trigger]}`
}

//Change score display
function displayScore(player, hiddenCards = false) {   
    let score = calculateScore(player); //Calculate score
    let handId = player === "user" ? "userScore" : "dealerScore"; //Get hand id based on player

    if (hiddenCards) { //If hidden cards are present, set score to "??"
        score = "??";
    }

    document.getElementById(handId).textContent = score;
}

//Reset score display
function resetScoreDisplay() {
    document.getElementById("userScore").textContent = ""; //Reset user score display
    document.getElementById("dealerScore").textContent = ""; //Reset dealer score display
}

//Deck clicked
function deckClicked() {
    if (gameStarted) {
        if (turnActive === "user" && !gameEnded) { //Check if turn is user
            log(messageDictionary("hit", "user")); //Log hit message
            dealRandomCard("user"); //Deal card to user
            displayScore("user"); //Update score display
        }
    }
    else {
        startGame(); //Start game if not started
    }
}