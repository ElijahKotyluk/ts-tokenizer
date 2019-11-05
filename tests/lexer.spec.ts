import Lexer from '../src/lexer';

describe('Lexer', () => {

    it('should match snapshot', () => {
        const lexer = new Lexer();
        lexer.input = 'random string of random strings';

        expect(lexer).toMatchSnapshot();
    });

    it('should have an optional input on instantiation', () => {
        const lexer = new Lexer('random string of random strings');

        expect(lexer.input).toBe('random string of random strings');
    });

    describe('addRule method', () => {
        const lexer = new Lexer();

        it('Should add a new rule to the array of rules', () => {
            lexer.addRule('newline', /\n/);
            expect(lexer.rules).toHaveLength(1);
        });

        it('should convert regex string to RegExp object', () => {
            lexer.addRule('newline', '/\n/');

            expect(lexer.rules).toHaveLength(2);
        });

        it('should match snapshot', () => {
            expect(lexer).toMatchSnapshot();
        });
    });

    describe('setInput method', () => {
        const lexer = new Lexer();
        const input = 'some random input string';

        it('should set the given input on the lexer class', () => {

            lexer.setInput(input);

            expect(lexer.input).toBe(input);
        });

        it('should match snapshot', () => {
            expect(lexer).toMatchSnapshot();
        });
    });
});
