//Find the divisors!
/*
Problem Description: Create a function named divisors that takes an integer and returns an array with all of the 
integer's divisors(except for 1 and the number itself). If the number is prime return the string '(integer) is prime'
(use Either String a in Haskell).
Example:
divisors(12); //should return [2,3,4,6]
divisors(25); //should return [5]
divisors(13); //should return "13 is prime"
You can assume that you will only get positive integers as inputs.
*/

const divisors = (n) => {
  const largestPossibleDivisor = n / 2
  let divisors = []
  
  let i = 2
  while (i <= largestPossibleDivisor) {
    if (n % i === 0) {
      divisors.push(i)
    }
    i++
  }

  if (divisors.length) {
    return divisors
  } else {
    return `${n} is prime`
  }
}

console.log(divisors(12))