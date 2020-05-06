import * as actions from '../actions/actionCalcCurr';

describe('actions', () => {
    it('should create an action', () => {
        const result = 123;
        const expectedAction = {
            type: 'CALCULATE_TOTAL_AMOUNT',
            result: 123
        }
        expect(actions.calculateResult(result)).toEqual(expectedAction);
    });
});
