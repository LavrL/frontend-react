import Calculator from '../../components/Calculator/Calculator';

describe.only('Calculator testing', () => {
    test.only('should return calculator initial state', () => {
        expect(new Calculator().state).toEqual(
            {
                "result": "0"
            }
        )
    });


});