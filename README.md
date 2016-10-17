# cipher.js
A javascript decryption libary.

This library is an attempt at not cheating the [UK National Cipher Challenge](https://www.cipherchallenge.org/), whilst also serving a purpose to the open source community. *(That was a joke; I would only ever think about myself)*

(Have a play-a-round on [Codepen](http://codepen.io/ollybritton/pen/LRJKAN?editors=0010))

## Wanna learn how to use it?
I've coded it into three categories: `encrypt`, `decrypt` and `tools`. These are all stored in the object `cipher`. So, if I wanted to get to the tools section, I would do: `cipher.tools.BLAH`.

### The encrypt section.
As you can probably tell, the encrypt section is all about encrypting things. Although not the primary idea of the library, I've included these anyway.

#### caesar(str, amount)
This takes two arguments - `str` and `amount`. `str` is the phrase that you want to be encrypted, and `amount` is a number of letters to shift. Example:
```
  cipher.encrypt.caesar('abc', 1) // Returns 'bcd'

  var secretMessage = cipher.encrypt.caesar('Momma, I just killed a man-', 13);
  console.log(secretMessage) // Logs 'Zbzzn, V whfg xvyyrq n zna-'
```

#### reverseString(str, spaces)
This too takes two arguments - `str` and `spaces`. `str` is the phrase you want to be reversed, whilst `spaces` is a boolean. If true, the `str` will be reversed including spaces. If false, it will disregard all spaces and reverse it that way. Example:
```
  cipher.encrypt.reverseString('abc def', true); // returns 'def abc'
  cipher.encrypt.reverseString('abc def', false); // returns 'defabc'
```

### The decrypt section.
This section is the primary focus of the library – allowing you to easily decipher text. This section references `cipher.tools` a lot.

#### caesar(str, amount)
However visually symmetrical to the `cipher.encrypt.caesar`, it has one difference. Instead of moving the letters forward by the amount, it moves them backwards. Example:
```
  cipher.decrypt.caesar('abc', 1) // returns 'zab'
  var decodedMessage = cipher.decrypt.caesar('Zbzzn, V whfg xvyyrq n zna-', 13);
  console.log(decodedMessage) // Logs 'Momma, I just killed a man-'
```

#### caesarGuess(str, letter)
This is my favourite bit of the library. It can take any string (the second argument isn't required) and guess a shift, then decode it into English.

To understand its use, you need to know how it works. These are the steps it follows:
- Find the most common letter, using a call to the `cipher.tools.frequency()`.
- Work out the difference between it and the most common letters in English (e,a,t,o).
- Store these in an object.
- Decrypt the text using the `cipher.decrypt.caesar()` function using an amount of the chosen letter.
- Display result.

Usually it works when `letter` is 'e', because it's the mostest most common letter in English. Examples:
```
  var words = 'Hello! this is a very large piece of text containing a lot of vowels. Hey, look at that I\'m using e so much. I like e. Did you know that in mathematics e^n is a transcendental number?'
  var secretMessage = cipher.encrypt.caesar(words,18)
  cipher.decrypt.caesarGuess(secretMessage); // Returns what is the same as the words variable.
```

#### reverseString(str, spaces)
This is 100% the same as the `cipher.encrypt.reverseString()` function. Scroll up to read the documentation for that.

### Tools
These do not encrypt or decrypt, but are common resuable bits of code.

#### alphabetNum(letter)
This function takes one argument - letter - and returns the number of that letter in the alphabet. Examples:
```
  cipher.tools.alphabetNum('a') // Returns 1.
```

#### stringNum(str)
This function does the same as the `alphabetNum()`, but instead turns a string into an array of numbers corresponding to the letters at that point. Examples:
```
  cipher.tools.stringNum('abc') // Returns ['1','2','3']
```

#### frequency(str)
This function returns an object of information about a given string. In total, it returns 5 things.
```
  cipher.tools.frequency(str)

  // Returns
  {
    consisency: // Equal to (range*str.length)/100 - the higher the number the more 'diverse' a string is. Used to check if                   // its been encrypted with a shift cipher.
    mostUsedLetter: // Funnily enough, the most used letter.
    maxAmountOfTimesALetterAppeared: // Have a guess.
    minAmountOfTimesALetterAppeared: // ""         ""
    range: // The range of the amount of times letters occured. If 'a' had been used 3 times and 'b' had been used once, the
           // range would be 2 (3-1).
  }
```
