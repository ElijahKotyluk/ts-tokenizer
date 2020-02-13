import { IToken } from './token';

export interface LexerState {
    consumed: string;
    remaining: string;
    input: string;
    tokens: IToken[];
    position: Position;
}

export type Position = {
    column: number;
    index: number;
    line: number;
}

const defaultPosition = {
    column: 0,
    index: 0,
    line: 1
}

export default class State implements LexerState {
    public consumed: string;
    public remaining: string;
    public input: string;
    public tokens: IToken[];
    public position: Position;

    constructor(input?: string) {
        this.consumed = '';
        this.input = input || '';
        this.remaining = '';
        this.tokens = [];
        this.position = defaultPosition;
    }

    /**
     * Resets the state's properties to default values
     */
    public reset(): void {
        this.consumed = '';
        this.input = '';
        this.remaining = '';
        this.tokens = [];
        this.position = defaultPosition;
    }
}
