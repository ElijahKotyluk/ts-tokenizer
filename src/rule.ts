export interface IRule {
    type: string;
    regex: RegExp;
    fn?: () => any;
    begin: number[];
}

export default class Rule implements IRule {
    public type: string;
    public regex: RegExp;
    public fn?: () => any;
    public begin: number[];

    constructor(type: string, regex: RegExp, fn?: () => any, begin?: number[]) {
        this.type = type;
        this.regex = regex;
        this.fn = fn;
        this.begin = [] || begin;
    }
}
