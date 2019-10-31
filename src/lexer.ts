export interface IRule {
    id: string;
    match: string;
}

/**
 * @class `Lexer`
 */
export default class Lexer {
    public tokens: string[];
    public col: number;
    public rules: IRule[];
    public input: string;
    public line: number;

    private index: number;
    private expression: string;
    private regex?: RegExp;

    constructor() {
        this.col = 1;
        this.input = '';
        this.line = 1;
        this.index = 0;
        this.expression = '';
        this.tokens = [];
        this.rules = [];
    }
}
