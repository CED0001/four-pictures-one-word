//tested on chrome & firefox, works best on Firefox 👍

// import(s)
import DataController from "./dataController.js";
import RandomNumber from "./random.js";
// import WordPair from "./wordPair.js";

$(function () {
  // jquery on load
  console.log("is this thing even on?");
  alert("this is for educational purposes ONLY");
  //variables init
  let audio = new Audio(); //https://stackoverflow.com/questions/8489710/play-an-audio-file-using-jquery-when-a-button-is-clicked
  audio.src = "./sound.mp3";
  //set example search terms
  let dataController = new DataController(
    "technology",
    "computer",
    "keyboard",
    "processor"
  );
  dataController.addWord("fashion", "purse", "dress", "ootd");
  dataController.addWord("sea", "dolphin", "whale", "shark");
  let index = 0;
  let guessedWord = "";
  /**
   * variables init: pick a secret word from the list
   */
  let randomNumber = new RandomNumber(dataController.wordList.length);
  let wordPair = dataController.getWordArray(randomNumber.number);
  let secretWord = wordPair[0].toUpperCase();
  let amountOfButtons;
  let arr;
  /**
   * get everything ready: use setup function
   */
  setup();

  /**
   * event listeners ⚡🎬⚡
   */

  //refreshBtn event 💦

  $(".refreshBtn").on("click", function () {
    setup();
  });

  //   click on letter event ✍

  $("body").on("click", ".alphabetBtn", function (e) {
    //na delete en append werkte deze niet meer -> event listener gebound aan body zou moeten fixen https://www.codewall.co.uk/jquery-on-click-function-not-working-after-appending-html/
    console.log("clicked");
    // e.target.hide;
    let $target = $(e.target);
    $target.hide();
    console.log($target);
    if (index < 0) return;
    let value = e.currentTarget.innerHTML;
    guessedWord += value;
    console.log(`guessedword is ${guessedWord}`);
    $(".word").eq(index).html(value);
    index++;
    console.log(index);
    // ❗ todo: verwijder element uit html na click
    // e.target.html("");
    if (guessedWord === secretWord) {
      audio.play();
      alert("winner!");
      setup();
    }
  });

  //click on delete button event 💥💣 "https://stackoverflow.com/questions/952924/javascript-chop-slice-trim-off-last-character-in-string

  $("#delete").on("click", () => {
    console.log("delete clicked");
    console.log(`guessedWord is ${guessedWord}`);
    console.log(`index is ${index}`);
    //remove last letter form .word
    if (index === 0) return;
    $(".word")
      .eq(index - 1)
      .html("");
    //remember last letter
    let lastLetter = guessedWord.charAt(index - 1);
    console.log(`lastletter is ${lastLetter}`);
    // $(".alphabet").append(`<button class='alphabetBtn'>${arr[i]}</button>`);

    //add last letter to end of alphabet
    $(".alphabet").append(`<button class='alphabetBtn'>${lastLetter}</button>`); //this works but the eventlistener does not apply on appended letters 😭

    //find hidden element and toggle it to show again
    $(".alphabetBtn");

    guessedWord = guessedWord.slice(0, -1);
    console.log(`guessedword = ${guessedWord}`);
    index--;
    console.log(index);

    //re-apply event listener(s) to changed alphabetbtn class❔❓
  });

  //dissalow jibberish in inputs https://stackoverflow.com/questions/19508183/how-to-force-input-to-only-allow-alpha-letters
  $("input").on("input", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^a-z]/gi, "")
    );
  });

  //click on add word button event 🆕
  $("form").submit(function (event) {
    // --> prevent default    https://api.jquery.com/input-selector/
    event.preventDefault();

    console.log("clicked");
    let word0 = $(".secondaryContent input").eq(0).val().toLowerCase();
    let word1 = $(".secondaryContent input").eq(1).val().toLowerCase();
    let word2 = $(".secondaryContent input").eq(2).val().toLowerCase();
    let word3 = $(".secondaryContent input").eq(3).val().toLowerCase();

    //empty inputs
    $(".secondaryContent input").val("");

    if (word0 == "" || word1 == "" || word2 == "" || word3 == "") {
      alert("search term must contain value");
      return;
    }
    $(".inputs").empty(); //empty inputs
    dataController.addWord(word0, word1, word2, word3);
    console.log(dataController.show());
  });

  /**
   * 🔁 Function(s) 🔁
   */

  function cleanSheets() {
    //clean the sheets: empty images, inputs and aphabet btns, set variables in starting position
    $(".images").empty();
    $(".inputs").empty();
    $(".alphabet").empty();
    index = 0;
    guessedWord = "";
    amountOfButtons = 15;
    randomNumber = new RandomNumber(dataController.wordList.length);
    wordPair = dataController.getWordArray(randomNumber.number);
    secretWord = wordPair[0].toUpperCase();
    console.log("the secret word is " + secretWord);
  }
  function guessTheWordSetup() {
    for (let i = 0; i < secretWord.length; i++) {
      $(".inputs").append(`<button class='word'> </button>`);
    }
  }
  function imagesSetup() {
    //randomize image order//
    console.log(wordPair);
    wordPair = randomNumber.shuffleArray(wordPair);
    console.log(wordPair);

    //change html -> pictures
    for (let i = 0; i < wordPair.length; i++) {
      $(".images").append(`
    <div id="image0">
     <img
     src="https://source.unsplash.com/352x240/?${wordPair[i]}"
     alt="image"
     width="353"
     height="240"
     />
    </div>`);
    }
  }

  function alphabetBtnSetup() {
    arr = secretWord.split("");
    console.log(arr);
    console.log(amountOfButtons - secretWord.length);
    for (let i = 0; i < amountOfButtons - secretWord.length; i++) {
      if (i < 0) return;

      arr += "," + randomNumber.getRandomCharsArray();
    }
    arr = arr.split(",");
    console.log(arr, arr.length);
    arr = randomNumber.shuffleArray(arr);
    console.log(arr, arr.length);
    //place the chars as buttons in html
    for (let i = 0; i < arr.length; i++) {
      $(".alphabet").append(`<button class='alphabetBtn'>${arr[i]}</button>`);
    }
  }

  function setup() {
    /**
     * get Everything ready: take out the trash 💩 https://www.w3schools.com/jquery/html_empty.asp#:~:text=The%20empty()%20method%20removes,use%20the%20remove()%20method.
     */
    //clean the sheets: empty images, inputs and aphabet btns
    cleanSheets();
    /**
     * get Everything ready: prepare the images
     */
    imagesSetup();
    /**
     * get Everything ready: set buttons for each letter in secret word
     */
    guessTheWordSetup();
    /**
     * get Everything ready: change html -> alphabet buttons

     */
    alphabetBtnSetup();
  }

  /**
   * testing area 💀⚡🧪
   */
  console.log("------------------");
  // console.log("i am hungry");
  // let fantasticFour = new WordPair("fish", "sea", "swim", "water");
  // console.log(fantasticFour.words[0]); //log is "fish" 👍

  // let test = new WordPair("fish", "sea", "swim", "water");
  // console.log(test.toString());
  // let test1 = new DataController("fish", "sea", "swim", "water");
  // test1.addWord("technology", "iPad", "dell", "laptop");
  // console.log(test1.show());

  // console.log(test1.getWordArray(0));

  // console.log(test1.getWordArray(1));
});
