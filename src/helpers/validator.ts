export abstract class Validator {
    public static isNumberAndPositive(number: string): number | false {
        if(isNaN(parseInt(number)) || parseInt(number) < 0){
            return false;
        }
        return parseInt(number);
    }
}