import Rule, { IRule } from './rule';
import State, { IState } from './state';

export interface ILexer {
  column: number;
  input: string;
  line: number;
  rules: IRule[];
  state: IState;
}

/**
 * @class `Lexer`
 */
export default class Lexer implements ILexer {
    public column: number;
    public input: string;
    public line: number;
    public rules: IRule[];
    public state: IState;

    private index: number;

    constructor(input?: string) {
        this.column = 1;
        this.index = 0;
        this.input = input || '';
        this.line = 1;
        this.rules = [];
        this.state = new State(input);
    }

    /**
     *
     * Add's a rule to the Rules array.
     * @param {RegExp} pattern
     * @param {Function} fn
     * @param {Array<number>} begin
     * @returns {Lexer}
     */
    public addRule(type: string, pattern: RegExp, fn?: () => any, begin?: number[]) {

        const regex = new RegExp(pattern, 'gmu');
        const rule = new Rule(type, regex, fn, begin);

        this.rules.push(rule);

        return this;
    }

    /**
     * push an array of Rule objects to the `Lexer` class rules
     * @param {IRule[]} `rules`
     */
    public addRules(rules: IRule[]) {
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
    public setInput(input: string) {
        this.input += input;

        return this;
    }

    /**
     * Finds a match of the passed `RegExp` argument
     * @param {RegExp} regex
     */
    public match(regex: RegExp) {
        if (!(regex instanceof RegExp)) {
            throw new Error('match() method expects you to pass a RegExp.');
        }

        try {
            const match = regex.exec(this.input);

            return match;
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Scans the input for matches
     * @returns {Token[]} matches
     */
    public scan() {
        const matches = [];

        for (const rule of this.rules) {
            const regex = rule.regex;

            const result = regex.exec(this.input);

            if (result) {
                matches.push({
                  action: rule.fn,
                  length: result[0].length,
                  result
                });
            }

        }

        return matches;
    }
}
