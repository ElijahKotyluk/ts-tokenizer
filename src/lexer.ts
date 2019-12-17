import Rule, { IRule } from './rule';
import State, { IState } from './state';
import Token from './token';

export interface ILexer {
  column: number;
  line: number;
  rules: IRule[];
  state: IState;
}

/**
 * @class `Lexer`
 */
export default class Lexer implements ILexer {
    public column: number;
    public line: number;
    public rules: IRule[];
    public state: IState;

    private index: number;

    constructor(input?: string) {
        this.column = 1;
        this.index = 0;
        this.line = 1;
        this.rules = [];
        this.state = new State(input);
    }

    /**
     *
     * Add's a rule to the Rules array.
     * @param {String} type
     * @param {RegExp} pattern
     * @param {Function} fn
     * @param {Array<number>} begin
     * @returns {Lexer}
     */
    public addRule(type: string, pattern: RegExp, fn?: () => any, begin?: number[]): Lexer {

        const regex = new RegExp(pattern, 'gmu');
        const rule = new Rule(type, regex, fn, begin);

        this.rules.push(rule);

        return this;
    }

    /**
     * push an array of `Rule` objects to the `Lexer` class rules property
     * @param {IRule[]} `rules`
     */
    public addRules(rules: IRule[]): Lexer {
        for (const rule of rules) {
            this.addRule(
              rule.type,
              rule.regex,
              rule.fn,
              rule.begin
            );
        }

        return this;
    }

    /**
     * Set's the input on the `Lexer` instance
     * @name setInput
     * @param {String} input
     * @returns {Lexer}
     */
    public setInput(input: string): Lexer {
        if (typeof input !== 'string') {
            throw new Error('Expected a string')
        };

        this.state.input = input;

        return this;
    }

    /**
     * Feeds the `Lexer` more data to consume
     * @name loadInput
     * @param {String} input
     * @returns {Lexer}
     */

    public loadInput(input: string): Lexer {
        if (typeof input !== 'string') {
            throw new Error('Expected a string')
        };

        this.state.input += input;

        return this;
    }

    /**
     * Remove the passed length from the lexer state's input
     * @param {Number} length
     * @returns {String} value
     */
    public consume(length: number): string {

        if (typeof length !== 'number') {
            throw new Error('Consume expected a number');
        }

        const value = this.state.input.slice(0, length);
        this.state.consumed += value;
        this.state.position += length;
        this.state.input = this.state.input.slice(length);

        return value;
    }

    /**
     * Finds a match of the passed `RegExp` argument
     * @param {RegExp} regex
     * @return {RegExpExecArray} match
     */
    public match(regex: RegExp): RegExpExecArray | undefined {

        const match = regex.exec(this.state.input);

        if (match) {
            if (match[0] === '') {
                throw new Error('Regex pattern should not match an empty string');
            }

            match.index = this.state.position;

            return match;
        }
    }

    /**
     * Scans the input and returns an array of tokens.
     * @returns {Token[]}
     */
    public scan(): Token[] | undefined {

        for (const rule of this.rules) {
            try {
                const regex = rule.regex;
                const match = this.match(regex);

                if (match) {
                    const token = new Token(rule.type, match[0].length, match[0]);

                    this.consume(token.length);
                    this.state.tokens.push(token);

                    return this.state.tokens;
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }

    /**
     * Return true if `Lexer` has not consumed anything
     * @name bos
     * @return {Boolean}
     */
    public bos(): boolean {
        return !this.state.consumed;
    }

    /**
     * Return true if `Lexer` has consumed the full input
     * @name eos
     * @return {Boolean}
     */
    public eos(): boolean {
        return this.state.input === '';
    }
}
