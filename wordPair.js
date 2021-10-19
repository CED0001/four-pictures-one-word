const WordPair = class {
  constructor(word0, word1, word2, word3) {
    // console.log(`test: ${word0}, ${word1}, ${word2}, ${word3}`);
    word0 = word0.toString();
    word1 = word1.toString();
    word2 = word2.toString();
    word3 = word3.toString();

    word0 = word0.trim();
    word1 = word1.trim();
    word2 = word2.trim();
    word3 = word3.trim();

    word0 = word0.toLowerCase();
    word1 = word1.toLowerCase();
    word2 = word2.toLowerCase();
    word3 = word3.toLowerCase();

    this.words = [word0, word1, word2, word3];
  }
  toString() {
    let s = this.words.toString();
    return s;
  }
};
export default WordPair;
