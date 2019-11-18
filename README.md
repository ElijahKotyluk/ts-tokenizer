# TS-Lexer

[![Build Status](https://travis-ci.com/ElijahKotyluk/lexer.svg?branch=master)](https://travis-ci.com/ElijahKotyluk/lexer)
[![codecov](https://codecov.io/gh/ElijahKotyluk/lexer/branch/master/graph/badge.svg)](https://codecov.io/gh/ElijahKotyluk/lexer)

> A simple Lexer written in TypeScript

## API

### Lexer

Create a Lexer.

`Params`
* `input` **{String}** (Optional): Pass an input string.
 
``` js
// es5
const Lexer = require('lexer');

const lexer = new Lexer();

// Optional `input` parameter. 
const input = 'some input string';

const lexer = new Lexer(input);

```

### setInput()

### addRule()

### addRules()

### consume()

### match()

### scan()
