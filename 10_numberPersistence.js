/*
1. Write a function, "persistence", that takes in a positive parameter "num"
and returns its multiplicative persistence, which is the number of times
you must multiply the digits in num until you reach a single digit.

Examples:
persistence(39) === 3 
Because 3*9 = 27, 2*7 = 14, 1*4=4 and 4 has only one digit

persistence(999) === 4 
Because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and 1*2 = 2

2. What are some corner cases you could test? Write at least two.
*/

function persistence(num) {
    // Base case, triggers when number is one digit along.
    if (Math.floor(num / 10) === 0) {
        return 0
    }
    
    // Split into digits
    let digits = []
    while (num) {
        digits.push(num % 10);
        num = Math.floor(num/10);
    }

    // Multiply digits together
    let newnum = digits.reduce((product, digit) => product * digit)

    // Try the function again with new number
    return persistence(newnum) + 1
}


var assert = require('assert');

describe('Initial Tests', function () {
    it('Should return a single digit number', function () {
        assert.equal(persistence(39), 3);
        assert.equal(persistence(25), 2);
        assert.equal(persistence(999), 4);
    })
    it('Should return zero if num is a one digit number', function () {
        assert.equal(persistence(4), 0);
        assert.equal(persistence(9), 0);
    })
});