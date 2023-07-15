/* Table of Contents
1. Global Variables
2. Utility Functions
3. Game Functions
4. Test Functions
*/

function main() {
    intializeGame();
}

// 1. Global Variables
let fullDeck = [];
let DOM = document.getElementById("message");
let player1 = false;
let player1Deck = [];
let player1DeckSize = 0;
let player2 = false;
let player2Deck = [];
let player2DeckSize = 0;


//2. Utility Functions

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function replaceHtml( html, targetID){
    /// find our target
    var i, tmp, elm, last, target = document.getElementById(targetID);
    /// create a temporary div or tr (to support tds)
    tmp = document.createElement(html.indexOf('<td')!=-1?'tr':'div');
    /// fill that div with our html, this generates our children
    tmp.innerHTML = html;
    /// step through the temporary div's children and insertBefore our target
    i = tmp.childNodes.length;
    /// the insertBefore method was more complicated than I first thought so I 
    /// have improved it. Have to be careful when dealing with child lists as  
    /// they are counted as live lists and so will update as and when you make
    /// changes. This is why it is best to work backwards when moving children 
    /// around, and why I'm assigning the elements I'm working with to `elm` 
    /// and `last`
    last = target;
    while(i--){
      target.parentNode.insertBefore((elm = tmp.childNodes[i]), last);
      last = elm;
    }
    /// remove the target.
    target.parentNode.removeChild(target);
  }

  function displayMessage(str) {
    replaceHtml("<h2 id='message'>" + str + "</h2>", "message");
  }

//3. Game Functions

function intializeGame() {
    buildNewDeck();
    console.log("Deck built");

    dealCards();
    console.log("Cards dealt");

    deckSize();
    displayMessage("Game has been started, please click 'War' when you are ready to play the first hand!");
}

function newGame() {
    intializeGame();
}

function buildNewDeck() {
    fullDeck = [];
    player1Deck = [];
    player2Deck = [];
    //Build a deck of 52 cards for the game
    let suit = ["Heart", "Spade", "Diamond", "Club"]
    let number = ["Ace", "2", "3", "4" ,"5" ,"6" ,"7", "8", "9", "10", "Jack", "Queen", "King"]
    let value = [1, 2, 3, 4,5,6,7,8,9,10,11,12,13];

    for (let cardSuits = 0; cardSuits < 4; cardSuits++) {
        for (let cardNumber = 0; cardNumber < 13; cardNumber++) {
            let card = new Object();
            card.suit = suit[cardSuits];
            card.number = number[cardNumber];
            card.value = value[cardNumber];
            fullDeck.push(card);
        }
    }
    return;
}

function dealCards() {
    let temp = shuffle(fullDeck);
    for (let i = 0; i<temp.length; i++) {
        player1Deck.push(temp[i]);
        i++;
        player2Deck.push(temp[i]);
    }
}

function switchArrayElement (losingArray, gainingArray) {
    let element = losingArray[0];
    gainingArray.push(element);
    losingArray.shift();
  }

function superwar() {
    num = 100;
    for (let i=0; i<num; i++) {
        war();
    }
}

function war() {
    let playerOneCard = player1Deck[0];
    let playerTwoCard = player2Deck[0];

    replaceHtml("<h3 id='playerOneCard'> Player 1 has a "+playerOneCard.number+" of "+playerOneCard.suit+"</h3>", "playerOneCard");
    replaceHtml("<h3 id='playerTwoCard'> Player 2 has a "+playerTwoCard.number+" of "+playerTwoCard.suit+"</h3>", "playerTwoCard");

    replaceHtml("<h3 id='tieCardsOne'></h3>","tieCardsOne")
    replaceHtml("<h3 id='tieCardsTwo'></h3>","tieCardsTwo")
    

    if (playerOneCard.value > playerTwoCard.value) {
        switchArrayElement(player2Deck,player1Deck);
        player1Deck = shuffle(player1Deck);
        displayMessage("Player One Wins!");
    }
    else if (playerOneCard.value < playerTwoCard.value) {
        switchArrayElement(player1Deck,player2Deck);
        player2Deck = shuffle(player2Deck);
        displayMessage("Player Two Wins!");
    }
    else {
        displayMessage("Tie!");
        tie(1);
    }

    player1Deck = shuffle(player1Deck);
    player2Deck = shuffle(player2Deck);
    deckSize();

    checkWinner();
}

function tie(iteration) {
    let playerOneCardTwo = player1Deck[iteration*3];
    let playerTwoCardTwo = player2Deck[iteration];

    if (playerOneCardTwo.value > playerTwoCardTwo.value) {
        for(let i = 0; i < (iteration * 3 + 1); i++) {switchArrayElement(player2Deck, player1Deck)}
        player1Deck = shuffle(player1Deck);
        displayMessage("Player One Wins the Tie!");
        replaceHtml("<h3 id='tieCardsOne'>"+ "WAR! " + player1Deck[iteration + 2].number + " of " + player1Deck[iteration + 2].suit + "<br>" + player1Deck[iteration + 1].number + " of " + player1Deck[iteration + 1].suit + "<br>" + player1Deck[iteration].number + " of " + player1Deck[iteration].suit + "</h3>","tieCardsOne")
        replaceHtml("<h3 id='tieCardsTwo'>"+ "WAR! " + player2Deck[iteration + 2].number + " of " + player2Deck[iteration + 2].suit + "<br>" + player2Deck[iteration + 1].number + " of " + player2Deck[iteration + 1].suit + "<br>" + player2Deck[iteration].number + " of " + player2Deck[iteration].suit + "</h3>","tieCardsTwo")
    }
    else if (playerOneCardTwo.value < playerTwoCardTwo.value) {
        for(let i = 0; i < (iteration * 3 + 1); i++) {switchArrayElement(player1Deck, player2Deck)}
        player1Deck = shuffle(player1Deck);
        displayMessage("Player Two Wins the Tie!");
        replaceHtml("<h3 id='tieCardsOne'>"+player1Deck[iteration + 2].number + player1Deck[iteration + 1].number + player1Deck[iteration].number + "</h3>","tieCardsOne")
        replaceHtml("<h3 id='tieCardsTwo'>"+player2Deck[iteration + 2].number + player2Deck[iteration + 1].number + player2Deck[iteration].number + "</h3>","tieCardsTwo")
    }
    else {
        displayMessage("Another Tie! There were " + (iteration) + "ties!");
        tie(iteration+1);
    }
}

function deckSize() {
    player1DeckSize = player1Deck.length;
    player1DeckSize = player1DeckSize + "";
    player2DeckSize = player2Deck.length;
    player2DeckSize = player2DeckSize + "";

    
    replaceHtml("<h1 id='playerOneCardCount'> Player 1 has "+player1DeckSize+" cards</h1>", "playerOneCardCount");
    replaceHtml("<h1 id='playerTwoCardCount'> Player 2 has "+player2DeckSize+" cards</h1>", "playerTwoCardCount");
}

function checkWinner() {
    if (player1DeckSize == 0) {
        displayMessage("Player Two has won the game! Press 'New Game' to play again.");
    }
    else if (player2DeckSize == 0) {
        displayMessage("Player One has won the game! Press 'New Game' to play again.");
    }
    return;
}

//4. Test Functions
function test() {
    let testOne = [
        {name: "one", value: 1},
        {name: "one", value: 2}
    ]
    let testTwo = [
        {name: "two", value: 1},
        {name: "two", value: 2}
    ]

    switchArrayElement(testOne, testTwo, 0);
    console.log(testOne);
    console.log(testTwo);

}

window.onload = main();