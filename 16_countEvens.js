/*

Working individually or in pairs write out differnt tests which will
count the number of even numbers in an array. 

Try to have at least three different tests which test differnt values
put into your method, such as an empty array.

Once you have done done this, write out the method and check if it passes. 

Example: countEvens = ([1,2,3,4]) => 2

Hint:
If you're having trouble writing tests, look up some of the previous challenges or try
Google - mocha tests to get an idea.

*/

const countEvensOld = (arr) => {
  if (arr.every(e => typeof(e) === "number")) {
    return arr.filter(e => e % 2 == 0).length
  } else {
    throw new TypeError("Invalid item in array.")
  }
}

const countEvens = (arr) => {
  let evens = 0
  for (let e of arr) {
    if (typeof(e) != "number") {
      throw new TypeError(`Item of type ${typeof(e)} found in array.`)
    }
    if (e % 2 === 0) {
      evens++
    }
  }
  return evens
}

// Your tests here
const assert = require('assert');

describe('countEvens', function () {
  context('Should count the number of evens in a valid array', function () {
    it('Should return 2 with [1,2,3,4]', function () {
      assert.equal(countEvens([1, 2, 3, 4]), 2)
    })
    it('Should return 4 with [2,2,3,3,4,4]', function () {
      assert.equal(countEvens([2, 2, 3, 3, 4, 4]), 4)
    })
    it('Should return 3 with [1,2,3,4,5,6]', function () {
      assert.equal(countEvens([1, 2, 3, 4, 5, 6]), 3)
    })
    it('Should return 0 with [1,3,5,7,9,11]', function () {
      assert.equal(countEvens([1, 3, 5, 7, 9, 11]), 0)
    })
  })
  context('Should return 0 if passed an empty array', function () {
    it('Should return 0 if passed an empty array', function () {
      assert.equal(countEvens([]), 0)
    })
  })
  context('Should throw errors when passed garbage input', function () {
    it('Throws an error if passed nothing', function () {
      assert.throws(() => countEvens(), TypeError);
    })
    it('Throws an error if passed a non-array', function () {
      assert.throws(() => countEvens("string"), TypeError);
      assert.throws(() => countEvens(1), TypeError);
      assert.throws(() => countEvens(NaN), TypeError);
  })
    it('Throws an error if passed an array containing non-numeric values', function () {
      assert.throws(() => countEvens([1, 2, "string"]), TypeError);
      assert.throws(() => countEvens([1, [2], 3]), TypeError);
      assert.throws(() => countEvens([5, 6, {}]), TypeError);
    })
  })
})