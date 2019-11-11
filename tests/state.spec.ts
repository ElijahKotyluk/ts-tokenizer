import State from '../src/state';

describe('state class', () => {
    it('initializes a new state', () => {
        const state = new State('input string');

        expect(state.input).toBe('input string');
    });

    describe('reset method', () => {
        it('should reset the state', () => {
            const state = new State('input string');
            state.reset();

            expect(state.input).toBe('');
        });
    });
});
