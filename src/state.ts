import { IToken } from './token';

export interface IState {
    consumed: string;
    remaining: string;
    input: string;
    tokens: IToken[];
    index: number;
    column: number;
    row: number;
}

export default class State implements IState {
    public consumed: string;
    public remaining: string;
    public input: string;
    public tokens: IToken[];
    public index: number;
    public column: number;
    public row: number;

    constructor(input?: string) {
        this.consumed = '';
        this.input = input || '';
        this.remaining = '';
        this.tokens = [];
        this.index = 0;
        this.column = 0;
        this.row = 0;
    }

    /**
     * Resets the state's properties to default values
     */
    public reset() {
        this.consumed = '';
        this.input = '';
        this.remaining = '';
        this.tokens = [];
        this.index = 0;
        this.column = 0;
        this.row = 0;
    }
}
