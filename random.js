const RandomNumber = class {
  constructor(max) {
    this.number;
    this.init(max);
  }
  init(max) {
    console.log(`randomNumber init`);
    this.randomize(max);
  }
  randomize(max) {
    console.log(`randomnumber randomize`);
    console.log(`max: ${max} - random number will be between 0 and ${max - 1}`);
    this.number = Math.floor(Math.random() * max);
    console.log(`random number is now ${this.number}`);
  }
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  getRandomCharsArray(length = 1) {
    //https://www.codegrepper.com/code-examples/javascript/javascript+random+character+generator
    //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    let result = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    //returns object??
    return result;
  }
};

export default RandomNumber;
