export interface IRule {
    type: string;
    regex: RegExp;
    fn?: () => any;
}

export default class Rule implements IRule {
    public type: string;
    public regex: RegExp;
    public fn?: () => any;

    constructor(type: string, regex: RegExp, fn?: () => any) {
        this.type = type;
        this.regex = regex;
        this.fn = fn;
    }
}
