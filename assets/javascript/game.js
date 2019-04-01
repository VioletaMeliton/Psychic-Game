
var currentWord = "";
var lettersForCurrentWord = [];
var numBlanks = 0;
var blankAndSuccess = 0;
var wrongGuess = [];
var winCounter = 0;
var lossCounter = 0;
var numGuess = 9;

function randomWord() {
    var words = ["apple", "watermelon", "strawberry", "bannana", "kiwi", "pear", "peach"];

    return words[Math.floor(Math.random() * words.length)];
}


function start() {

    wrongGuess = [];
    document.getElementById('guessed-letters').innerHTML = "";
    numGuess = 9;
    blankAndSuccess = [];
    currentWord = randomWord();
    lettersForCurrentWord = currentWord.split("");
    numBlanks = lettersForCurrentWord.length;

   
    for(var i = 0; i< currentWord.length;i++){
        blankAndSuccess.push("_");
    }
    console.log(blankAndSuccess);
    document.getElementById('current-word').innerHTML = blankAndSuccess.join(" ");
    document.getElementById('guesses-remaining').innerHTML = String(numGuess);
    document.getElementById('wins').innerHTML = String(winCounter);
    document.getElementById('losses').innerHTML = String(lossCounter);

}

function checkLetter(letter){

    var letterInWord = false;
    for(var i = 0; i < numBlanks; i++){
        if(currentWord[i] === letter){
            letterInWord = true;
        }
    }
    if(letterInWord){
        for( i = 0; i < numBlanks; i++){
            if(currentWord[i] === letter){
                blankAndSuccess[i] = letter;
            }
        }
    }
    else {
        if(wrongGuess.length == 0) {
            wrongGuess.push(letter);
            numGuess--;
        }else if(wrongGuess.indexOf(letter) < 0){
            wrongGuess.push(letter);
            numGuess--;
        }
        else{
            alert(letter + ' has been used.')
            document.getElementById('wrong').innerHTML = String(letter + ' has been used.');
        }
    }
}

function roundComplete(){
    /*
    function roundComplete verifies the game is over by either win or loss
     */
    document.getElementById('current-word').innerHTML = blankAndSuccess.join(' ');
    document.getElementById('guesses-remaining').innerHTML = numGuess;
    document.getElementById('guessed-letters').innerHTML = wrongGuess.join(' ');

    if(lettersForCurrentWord.join(' ') === blankAndSuccess.join(' ')){
        winCounter++;
        document.getElementById('wins').innerHTML = winCounter;
        alert('You win the word is ' + lettersForCurrentWord.join(''));
        start();

    }
    else if(numGuess == 0){
        lossCounter++;
        document.getElementById('losses').innerHTML = String(lossCounter);
        alert('You lose, the word was:  '+ currentWord);
        start();
    }
}


start();
document.onkeyup = function (event) {
    var guessLetter = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetter(guessLetter);
    roundComplete()
};