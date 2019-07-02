// Counts the number of integers between rangeStart and rangeEnd (inclusive)
// that can be divided evenly by N. All three values must be integers.
const divisibleCount = (rangeStart, rangeEnd, n) => {
  let divisibleNumbers = 0
  while (rangeStart <= rangeEnd) {
    if (rangeStart % n === 0) {
      divisibleNumbers++
    }
    rangeStart++
  }
  return divisibleNumbers
}