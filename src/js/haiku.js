const clonedeep = require('lodash.clonedeep');
const { syllableCount } = require('./haikuref');
// const clonedeep = require('lodash/clonedeep');

// const objectCopy = clonedeep(originalObject);

const storeState = () => {
  let currentState = {};//fill with current object state and hang on to it
  return (stateChangeFunction) => { //return inner function
    const newState = stateChangeFunction(clonedeep(currentState)); //create new state that can be returned
    currentState = clonedeep(newState);//set current state to new state
    return newState;//return updated clone
  }
}

const stateControl = storeState();

const assignState = (syllableCount) => {
  return (increment) => {
    return (state)({
      ...state,
      [syllableCount]: (state[syllableCount] || 0) + increment
    })
  }
}
//STARTING HERE/////////////////////////////////////////////////////////////////////////////////
// Check if word is three letters or less, if so, 1 syllable (check length of word, create array if needed)
// Count vowel groups, they usually count as one syllable (have list of vowels, make comparison somehow?)
// End of word 'e' is often silent, unless le (check length-1 and length-2)
// End of word ends in y += 1 syllable
// prefix and suffix usually count as syllables (hard code some prefixes and suffixes to check)
//////////////////////////////////////////////////////////////////////////////////////////////

function countSyllables(word) {
  // debugger;

  if (word.length >= 1 && word.length <= 3) {
    return 1; //1 by default for small words
  }

  const exceptions = {//example, can be filled out more later
    'weave': 1,
    'bread': 1,
    'head': 1,
    'steak': 1,
    'friend': 1,
    'shield': 1,
    'said': 1,
    'again': 2,
    'radio': 3,
    'scorpion': 3,
    'shoe': 1,
    'does': 1,
    'guarantee': 3,
    'guard': 1,
    'idea':2,
  };

  if (exceptions[word.toLowerCase()] !== undefined) {
    return exceptions[word.toLowerCase()];
  }

  const vowels = 'aeiou';
  const twoSyllableVowels = ['ia', 'ea', 'ie', 'ai', 'oa', 'oe', 'io', 'ua'];//


  const incrementSyllableCount = (syllableCount, index = 0, previousCharWasVowel) => {
    if (index >= word.length) {
      return syllableCount;//end
    }

    const currentChar = word[index].toLowerCase();
    const isVowel = vowels.includes(currentChar);

    console.log(`Index: ${index}, Char: ${currentChar}, IsVowel: ${isVowel}, SyllCount: ${syllableCount}, PrevVowel: ${previousCharWasVowel}`);


    if (index > 0 && twoSyllableVowels.includes(word[index - 1].toLowerCase() + currentChar)) {
      if (previousCharWasVowel) {
        syllableCount += 1;
      } else {
        syllableCount += 2;
      }

      return incrementSyllableCount(syllableCount, index + 1, false);
    } else if (isVowel && !previousCharWasVowel) {
      syllableCount++;
    }

    return incrementSyllableCount(syllableCount, index + 1, isVowel); //continue recursion w next letter
  }

  let syllableCount = incrementSyllableCount(0, 0, false); //no longer breaks everything

  if (word.endsWith('e') && !word.endsWith('le') && syllableCount > 1) {
    syllableCount--;
  }

  if (word.endsWith('y') && word.length > 1) {
    const secondLastChar = word[word.length - 2].toLowerCase();
    if (!vowels.includes(secondLastChar)) {
      syllableCount++
    }
  }
  return syllableCount;;
}

// checkHaiku("Delightful display, Snowdrops bow their pure white heads, to the suns glory");
// checkHaiku("Marionette dance, Strings weave a silent story, Shadows in moonlight")  TO CHECK EDGE CASES

function countSyllablesInLine(line) {
  let words = line.split(' ');
  let totalSyllables = words.map(countSyllables).reduce((a, b) => a + b, 0);
  return totalSyllables;
}

export function checkHaiku(haiku) {
  let lines = haiku.split(',');  //test
  let syllablePattern = [5, 7, 5];
  return lines.map(countSyllablesInLine).every((count, index) => count === syllablePattern[index]);
}

//REFERENCE STUFF------------------------------------
const recurseReverse = (words) => {
  const wordsArray = words.split(" ");

  if (wordsArray.length === 1 && wordsArray[0] === "") {
    return "";
  } else {
    const remainingWords = wordsArray.slice(1).join(" ");
    const reversedWords = recurseReverse(remainingWords);
    return (reversedWords ? reversedWords + " " : "") + wordsArray[0];
  }
}

const words = "Hello World in JavaScript";
const reversedWords = recurseReverse(words);

console.log(reversedWords);

const rgrString = (num) => {
  if (num > 0) {
    return "red green refactor " + rgrString(num - 1);
  }
  else {
    return "";
  }
}
