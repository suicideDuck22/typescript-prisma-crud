export abstract class Validator {
    public static isNumberAndPositive(number: string): number | false {
        const regexPattern = /[^0-9]/g
        if(number.match(regexPattern)){
            return false;
        }
        if(isNaN(parseInt(number)) || parseInt(number) < 0){
            return false;
        }
        return parseInt(number);
    }
}