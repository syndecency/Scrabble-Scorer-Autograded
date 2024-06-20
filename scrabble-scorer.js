// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");



const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


      function oldScrabbleScorer(word) {
         word = word.toUpperCase();
         let letterPoints = "";
      
         for (let i = 0; i < word.length; i++) {
      
         for (const pointValue in oldPointStructure) {
      
            if (oldPointStructure[pointValue].includes(word[i])) {
               letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            }
      
         }
         }
         return letterPoints;
      }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let wordToScore = input.question("Enter a word to score: ");
   
   return wordToScore;
};

let newPointStructure = transform(oldPointStructure);

function simpleScorer(word) {
   return word.length;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   let wordCount = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         wordCount += 3;
      } else {
         wordCount += 1;
      }
   }
   return wordCount;
}

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
   }
   return score;
}

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {  name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

    

function scorerPrompt(word) {
   console.log("Which scoring algorithm do you prefer?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses the Scrabble point system\n")
   let userAlgChoice = input.question("Enter 0, 1, or 2: ");
   let chosenScoringAlgorithm = scoringAlgorithms[userAlgChoice].scorerFunction;
   return console.log(`You chose the ${scoringAlgorithms[userAlgChoice].name} algorithm.\nScore for your word: ${chosenScoringAlgorithm(word)}`);
}

function transform(oldStructure) {
   let newStructure = {};
   for (const pointValue in oldPointStructure) {
      let letters = oldPointStructure[pointValue];
      for (let letter of letters) {
         newStructure[letter.toLowerCase()] = Number(pointValue);
      }
   }
   return newStructure;
};

function runProgram() {
   let word = initialPrompt();
   scorerPrompt(word);
   
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
