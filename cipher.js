var cipher = {

  encrypt: {
    caesar: function(str, amount) {
      // Wrap Amount:
      if(amount < 0) {
        return cipher.encrypt.caesar(str, amount + 26);
      }

      var output = ``;

      for (var i = 0; i < str.length; i ++) {
        // Get the character we'll be appending:
        var c = str[i];

        // If it's a letter:
        if (c.match(/[a-z]/i)) {
          // Get its code:
          var code = str.charCodeAt(i);

          // Uppercase letters:
          if ((code >= 65) && (code <= 90)) {
            c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
          } else if ((code >= 97) && (code <= 122))
            c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
        output += c;
      }
      return output;
    },
    reverseString: function(string) {
      var answer = ''
      if(spaces == true) {
        var words = str.split(' ');
        words = words.reverse()
        return words.join(' ')
      } else if (spaces == false) {
        var letters = str.split(' ');
        letters = letters.reverse()
        return letters.join('')
      } else {
        return 'Don\'t speak to me like that. (Try adding true or false on the end).'
      }
    }
  },

  decrypt: {
    caesar: function(str, amount) {
      return cipher.encrypt.caesar(str, -amount)
    },
    caesarGuess: function(str) {
      var freqAnalysis = cipher.tools.frequency(str)
      var mostCommonLetter = freqAnalysis["mostUsedLetter"]
      var shifts = {
        e: cipher.tools.alphabetNum(mostCommonLetter) - cipher.tools.alphabetNum('e'),
        a: cipher.tools.alphabetNum(mostCommonLetter) - cipher.tools.alphabetNum('a'),
        t: cipher.tools.alphabetNum(mostCommonLetter) - cipher.tools.alphabetNum('t'),
        o: cipher.tools.alphabetNum(mostCommonLetter) - cipher.tools.alphabetNum('o')
      }
      console.log(`A shift of ${shifts[letter]} was used`)
      return cipher.decrypt.caesar(str, shifts[letter])
    },
    reverseString: function(string) {
      var answer = ''
      if(spaces == true) {
        var words = str.split(' ');
        words = words.reverse()
        return words.join(' ')
      } else if (spaces == false) {
        var letters = str.split(' ');
        letters = letters.reverse()
        return letters.join('')
      } else {
        return 'Don\'t speak to me like that. (Try adding true or false on the end).'
      }
    }
  },
  tools: {
    alphabetNum: function(letter) {
      var lowerCase = letter.toLowerCase()
      return lowerCase.charCodeAt() - 96
    },
    stringNum: function(str) {
      var strArray = str.split('');
      var answerArray = []
      for(var i = 0; i < strArray.length; i++) {
        answerArray.push(alphabetNum(strArray[i]))
      }
      return answerArray
    },
    frequency: function(str) {
      var freq = {};
      str = str.toLowerCase()
      for (var i=0; i<str.length;i++) {
          var character = str.charAt(i);
          if (freq[character]) {
             freq[character]++;
          } else {
             freq[character] = 1;
          }
        }

        delete freq[" "]

        console.log(freq)

        var arr = Object.keys( freq ).map(function ( key ) { return freq[key]; });
        var max = Math.max.apply( null, arr );
        var min = Math.min.apply( null, arr );
        var range = max-min
        var score = (range*str.length)/100
        var mostUsedLetter = Object.keys(freq).reduce(function(a, b){ return freq[a] > freq[b] ? a : b })

        return {
          consistency: score,
          mostUsedLetter: mostUsedLetter,
          maxAmountOfTimesALetterAppeared: max,
          minAmountOfTimesALetterAppeared: min,
          range: range
        }
      }
    }
  }
