import Lexer from '../src/lexer';

describe('Lexer', () => {

    it('should match snapshot', () => {
        const lexer = new Lexer('random string of random strings');

        expect(lexer).toMatchSnapshot();
    });

    it('should have an optional input on instantiation', () => {
        const lexer = new Lexer('random string of random strings');

        expect(lexer.state.input).toBe('random string of random strings');
    });

    describe('addRule method', () => {
        const lexer = new Lexer();

        it('Should add a new rule to the array of rules', () => {
            lexer.addRule('newline', /\n/);
            expect(lexer.rules).toHaveLength(1);
        });

        it('should match snapshot', () => {
            expect(lexer).toMatchSnapshot();
        });
    });

    describe('addRules method', () => {
        const lexer = new Lexer();

        it('should push each rule in an array of rules to the lexer class rules', () => {
            const rulesArray = [
              {
                regex: /\n/,
                type: 'newline'
              },
              {
                fn: () => null,
                regex: /[0-9]/,
                type: 'numbers'
              },
              {
                begin: [1],
                fn: () => null,
                regex: /[a-zA-Z]/,
                type: 'letters'
              }
            ];

            lexer.addRules(rulesArray);

            expect(lexer.rules).toHaveLength(3);
        });
    });

    describe('setInput method', () => {
        const lexer = new Lexer();
        const input = 'some random input string';

        it('should set the given input on the lexer class', () => {

            lexer.setInput(input);

            expect(lexer.state.input).toBe(input);
        });

        it('should match snapshot', () => {
            expect(lexer).toMatchSnapshot();
        });
    });

    describe('loadInput method', () => {
        const lexer = new Lexer('a');
        const input = ' string'

        lexer.loadInput(input);

        expect(lexer.state.input).toHaveLength(8);
    });

    describe('consume method', () => {
        it('should update the input based on passed length', () => {
            const lexer = new Lexer();
            lexer.setInput('hello');

            const consumed = lexer.consume(1);

            expect(lexer.state.input).toBe('ello');
            expect(lexer.state.consumed).toBe('h');
            expect(lexer.state.position).toBe(1);
        });
    });

    describe('match method', () => {
        it('should match the passed regex to the input of the Lexer', () => {
        const lexer = new Lexer();
        lexer.setInput('some string');

        const match = lexer.match(/[a-z]/);

        expect(match![0]).toBe('s');
        });

        it('should throw an error when an empty string is matched', () => {
            const lexer = new Lexer();
            lexer.setInput('');

            expect(() => lexer.match(/^$/)).toThrow();
        });

        it('should return undefined if no match', () => {
            const lexer = new Lexer();
            lexer.setInput('hello');

            expect(lexer.match(/[0-9]/)).toBe(undefined);
        });
    });

    describe('scan method', () => {
        const input = 'some 12 random 343 input';

        it('should return an array of matched tokens.', () => {
            const lexer = new Lexer();

            lexer.setInput(input);
            lexer.addRule('numbers', /[0-9]/);
            lexer.scan();

            expect(lexer.state.tokens).toHaveLength(1);
        });

        it('should return undefined if no matches', () => {
            const lexer = new Lexer();

            lexer.setInput('hello');
            lexer.addRule('numbers', /[0-9]/);

            expect(lexer.scan()).toBe(undefined);
        });

        it('should throw an error', () => {
            const lexer = new Lexer();

            lexer.setInput('');
            lexer.addRule('numbers', /^$/);

            expect(() => lexer.scan()).toThrow();
        });
    });

    describe('bos{Beginning of Source} method', () => {
        
        it('should return false if the portion of the input has been consumed', () => {
            const lexer = new Lexer("some string");

            lexer.consume(11);

            expect(lexer.bos()).toBe(false);
        });

        it('should return true if no portion of the input has been consumed', () => {
            const lexer = new Lexer("some string");

            expect(lexer.bos()).toBe(true);
        });
    });

    describe('eos{End of Source} method', () => {
        it('should return false if there is more input to be consumed', () => {
            const lexer = new Lexer("some string");

            expect(lexer.eos()).toBe(false);
        });

        it('should return true if the entire input has been consumed', () => {
            const lexer = new Lexer("some string");

            lexer.consume(11);

            expect(lexer.eos()).toBe(true);
        });
    });
});
