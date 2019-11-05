export interface IRule {
    type: string;
    regex: RegExp | string;
    action?: () => any;
    begin?: number[];
}

export default class Rule implements IRule {
    public type: string;
    public regex: RegExp | string;
    public action?: () => any;
    public begin?: number[];

    constructor(type: string, regex: RegExp | string, action?: () => any, begin?: number[]) {
        this.type = type;
        this.regex = regex;
        this.action = action;
        this.begin = begin;
    }
}
