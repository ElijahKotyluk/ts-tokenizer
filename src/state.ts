import { IToken } from './token';

export interface IState {
    consumed: string;
    remaining: string;
    input: string;
    tokens: IToken[];
    index: number;
    position: number;
}

export default class State implements IState {
    public consumed: string;
    public remaining: string;
    public input: string;
    public tokens: IToken[];
    public index: number;
    public position: number;

    constructor(input?: string) {
        this.consumed = '';
        this.input = input || '';
        this.remaining = '';
        this.tokens = [];
        this.index = 0;
        this.position = 0;
    }

    /**
     * Resets the state's properties to default values
     */
    public reset(): void {
        this.consumed = '';
        this.input = '';
        this.remaining = '';
        this.tokens = [];
        this.index = 0;
        this.position = 0;
    }
}
