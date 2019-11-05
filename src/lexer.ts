import Rule, { IRule } from './rule';

/**
 * @class `Lexer`
 */
export default class Lexer {
    public column: number;
    public input: string;
    public line: number;
    public rules: IRule[];
    public tokens: object[];

    private index: number;

    constructor(input?: string) {
        this.column = 1;
        this.input = input || '';
        this.line = 1;
        this.index = 0;
        this.rules = [];
        this.tokens = [];
    }

    /**
     *
     * @name addRule
     * @param {RegExp} regex
     * @param {Function} action
     * @param {Array<number>} begin
     * @returns {Lexer}
     */
    public addRule(type: string, regex: RegExp | string, action?: () => any, begin?: number[]) {

        // If begin parameter not given, set it to [0](active rule);
        if (!begin) {
            begin = [0];
        }

        // If regex given is a string, strip the quotes before instantiating a new `Rule`
        if (typeof regex === 'string') {
            regex.replace(/"|'/g, '');
        }

        const rule = new Rule(type, regex, action, begin);
        this.rules.push(rule);

        return this;
    }

    /**
     * @name setInput
     * @param {String} input
     * @returns {Lexer}
     */
    public setInput(input: string) {
        this.input += input;

        return this;
    }
}
