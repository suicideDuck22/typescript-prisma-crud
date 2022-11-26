import { Validator } from "../../src/helpers/validator"

describe('Unit tests for isNumberAndPositive method', () => {
    it('Must be return false, because have letters.', () => {
        const response = Validator.isNumberAndPositive('2S');

        expect(response).toBe(false);
    })
    it('Must be return false, because is passed an empty string.', () => {
        const response = Validator.isNumberAndPositive('');

        expect(response).toBe(false);
    })
    it('Must be return false, because is a negative number.', () => {
        const response = Validator.isNumberAndPositive('-3');

        expect(response).toBe(false);
    })
    it('Must be return the passed numer, because is positive valid number.', () => {
        const response = Validator.isNumberAndPositive('306');

        expect(response).toBe(306);
    })
})