module.exports = function toReadable(number) {
    const digits = new Map([
        [0, "zero"],
        [1, "one"],
        [2, "two"],
        [3, "three"],
        [4, "four"],
        [5, "five"],
        [6, "six"],
        [7, "seven"],
        [8, "eight"],
        [9, "nine"],
    ]);
    const firstDecade = new Map([
        [10, "ten"],
        [11, "eleven"],
        [12, "twelve"],
        [13, "thirteen"],
        [14, "fourteen"],
        [15, "fifteen"],
        [16, "sixteen"],
        [17, "seventeen"],
        [18, "eighteen"],
        [19, "nineteen"],
    ]);
    const tens = new Map([
        [2, "twenty"],
        [3, "thirty"],
        [4, "forty"],
        [5, "fifty"],
        [6, "sixty"],
        [7, "seventy"],
        [8, "eighty"],
        [9, "ninety"],
    ]);
    const ranks = new Map([
        [0, ""],
        [3, "thousand"],
        [6, "million"],
        [9, "billion"],
    ]);

    let result = "";
    let rank = 0;

    if (number === 0) {
        return "zero";
    } else {
        do {
            if (number % 1000 !== 0) {
                result =
                    stringifyTriplet(number) +
                    " " +
                    ranks.get(rank) +
                    " " +
                    result;
            }
            rank += 3;
            number = (number - (number % 1000)) / 1000;
        } while (number !== 0);
    }

    function stringifyTriplet(number) {
        let stringNumber = "";
        const tensOfNumber = number % 100;
        if (tensOfNumber < 10) {
            stringNumber = tensOfNumber ? digits.get(tensOfNumber) : "";
        } else if (tensOfNumber >= 10 && tensOfNumber < 20) {
            stringNumber = firstDecade.get(tensOfNumber);
        } else {
            const zeroRank = tensOfNumber % 10;
            const ones = zeroRank !== 0 ? digits.get(zeroRank) : "";
            const firstRank = (tensOfNumber - (tensOfNumber % 10)) / 10;
            stringNumber = tens.get(firstRank) + " " + ones;
        }
        const thousandsOfNumber = number % 1000;
        const hundredsDigit =
            (thousandsOfNumber - (thousandsOfNumber % 100)) / 100;
        if (hundredsDigit) {
            stringNumber =
                digits.get(hundredsDigit) + " hundred " + stringNumber;
        }
        return stringNumber.trim();
    }

    return result.trim();
};
