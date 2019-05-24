/*
1. Given an array of numbers, determine whether the sum
of all of the numbers is odd or even.

Give your answer in string format as 'odd' or 'even'.

If the input array is empty consider it as: [0] (array with a zero).
2. What other edge cases should you consider? Add at least 2 more tests
for edge cases.
*/

function oddOrEven(array) {
    // Push a zero to handle the empty array.
    array.push(0)
    
    sum = array.reduce((sum, number) => sum + number)
    
    if (sum === NaN || typeof(sum) != "number") {
        throw new TypeError("Invalid item in array.")
    }

    return (sum % 2 === 0) ? 'even' : 'odd'
}

var assert = require('assert');

describe('oddOrEven', function () {
    it('Should "odd" or "even" depending on the number', function () {
        assert.equal(oddOrEven([0]), 'even');
        assert.equal(oddOrEven([1]), 'odd')
        assert.equal(oddOrEven([]), 'even')
    });
    it('Even tests', function () {
        assert.equal(oddOrEven([0, 1, 5]), 'even')
        assert.equal(oddOrEven([0, 1, 3]), 'even')
        assert.equal(oddOrEven([1023, 1, 2]), 'even')
    });
    it('Negative Even tests', function () {
        assert.equal(oddOrEven([0, -1, -5]), 'even')
        assert.equal(oddOrEven([0, -1, -3]), 'even')
        assert.equal(oddOrEven([-1023, 1, -2]), 'even')
    });
    it('Odd tests', function () {
        assert.equal(oddOrEven([0, 1, 2]), 'odd')
        assert.equal(oddOrEven([0, 1, 4]), 'odd')
        assert.equal(oddOrEven([1023, 1, 3]), 'odd')
    });
    it('Negative Odd tests', function () {
        assert.equal(oddOrEven([0, -1, 2]), 'odd')
        assert.equal(oddOrEven([0, 1, -4]), 'odd')
        assert.equal(oddOrEven([-1023, -1, 3]), 'odd')
    });
    it('Throws an error if passed a non-array', function () {
        assert.throws(() => oddOrEven("string"), TypeError);
        assert.throws(() => oddOrEven(1), TypeError);
        assert.throws(() => oddOrEven(NaN), TypeError);
    })
    it('Throws an error if passed nothing', function () {
        assert.throws(() => oddOrEven(), TypeError);
    })
    it('Throws an error if array contains non-numeric values', function () {
        assert.throws(() => oddOrEven([1, 2, "string"]), TypeError);
        assert.throws(() => oddOrEven([1, [2], 3]), TypeError);
        assert.throws(() => oddOrEven([5, 6, {}]), TypeError);
    })
});