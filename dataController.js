import WordPair from "./wordPair.js";
const DataController = class{
    // constructor(wordPairArg){
    //     console.log(`datacontroller constructor, 1 obj`);
    //     if(!(typeof wordPairArg === WordPair )){
    //         console.log("[Datacontroller constructor] datacontroller needs wordpair obj!");
    //         // alert("[Datacontroller constructor] datacontroller needs wordpair obj!");
    //         return;
    //     }
    //     this.wordList = [];
    //     this.init(wordPairArg);
    // }
    constructor(word0, word1,word2, word3){
        console.log(`datacontroller constructor`);
        this.wordList = [];
        this.init(word0, word1,word2, word3);
        
    }
    init(word0, word1,word2, word3){
        console.log('dataController init');
        this.addWord(word0, word1,word2, word3);
    }
    addWord(word0, word1, word2, word3){
        // word = word.toLowerCase();
        // word = word.trim();
        // this.wordList.push(word);
        // console.log(`word added`);
        // console.log(this.wordList);


        // for (let i = 0; i < 4; i++) {
        //     wordPair.words[i] = wordPair.words[i].trim();
        //     wordPair.words[i] = wordPair.words[i].toLowerCase();
        //     wordList.push(wordPair.words[i]);
        //     console.log("word added" + wordPair.words[i]);
        // }

        let bundle = new WordPair(word0, word1,word2, word3);
        
        this.wordList.push(bundle);
        // console.log(this.show());
    }
    show(){
        let arr = [];
        for (let i = 0; i < this.wordList.length; i++) {
           arr.push("wordpair " + i +":" +this.wordList[i].toString());    
        }
       
        return arr;
    }
    getWordArray(index){
        index = parseInt(index);
        if(index > this.wordList.length && index < 0 || isNaN(index || index == null)){
            console.log(`index must be smaller then wordlist!`);
            return;
        }
        let arr = this.wordList[index].toString().split(',');
        // console.log(arr); 
        return arr;
    }
}

export default DataController;