# TS-Lexer

[![Build Status](https://travis-ci.com/ElijahKotyluk/lexer.svg?branch=master)](https://travis-ci.com/ElijahKotyluk/lexer)
[![codecov](https://codecov.io/gh/ElijahKotyluk/lexer/branch/master/graph/badge.svg)](https://codecov.io/gh/ElijahKotyluk/lexer)

> A simple Lexer written in TypeScript

## Getting Started

`yarn add ts-lexer`
`npm install --save ts-lexer`

## API

### Lexer

Create a Lexer.

`Params`

* `input` **{String}** (Optional): Pass an input string.

``` js
// es5
var Lexer = require('lexer');

var lexer = new Lexer();

// es6
import { Lexer } from "ts-lexer";

const input = "random string";

// Optional `input` param
const lexer = new Lexer(input);

```

### setInput()

`Params`

* `input` **{String}** : Pass an input string.

``` js
const input = 'a string';

lexer.setInput(input);

console.log(lexer.state.input); // 'a string'
```

### loadInput()

`Params`

* `input` **{String}** : Pass an input string.

``` js
const lexer = new Lexer("hello ");
const input = 'a string';

lexer.loadInput(input);

console.log(lexer.state.input); // 'hello a string'
```

### addRule()

Add a rule to the Lexer.

`Params`

* `type` **{String}**
* `pattern` **{RegExp}**
* `fn` **{Function}** (Optional)

``` js
// Example
lexer.addRule('text', /^\w+/);

// With optional `fn` passed
lexer.addRule('text', /^\w+/, (lexeme) => {
    console.log(lexeme);
});

```

### addRules()

Add an array of rules to the Lexer.

`Params`

* `rules` **{Array<Rule>}**

``` js
// Example
const rulesArr = [
    {
        type: 'newline',
        regex: /\n/
    },
    {
        type: 'digit',
        regex: /\d/,
        fn: (lexeme) => return lexeme;
    }
]

lexer.addRules(rulesArr);
```

### consume()

Consume the given length of the input string.

`Params`

* `length` **{Number}**

``` js
// Example
lexer.setInput('some string');

lexer.consume(3);

console.log(lexer.state.input); // 'e string'
console.log(lexer.state.consumed); // 'som'
```

### match()

Match the string with the passed RegExp pattern.

`Params`

* `regex` **{RegExp}**

``` js
// Example
lexer.setInput('some string');

lexer.match(/^w{3}/); // ["som", index: 0, input: "some string", groups: undefined]
```

### scan()

Scan the Lexer's input and return an array of tokens.

``` js
// Example
const rulesArr = [
    {
        type: 'two_digit_number',
        regex: /^[0-9]{2}/
    },
    {
        type: 'four_letter_word',
        regex: /^[a-zA-Z]{4}/
    }
]

// Set Lexer rules
lexer.addRules(rulesArr)

// Set Lexer input
lexer.setInput('some 24 character string');

lexer.scan() // [{length: 2, type: 'two_digit_number', value: 24}, {length: 4, type: four_letter_word, value: 'some'}]
```

### bos()

Beginning of Source; returns true if the input has not been consumed at all.

### eos()

End of Source; returns true if the input has been entirely consumed.
