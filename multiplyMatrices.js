/*
You helped Neo almost get out of the matrix with matrix_addition but
Cypher was one step ahead of you. In order to get past Cypher's trap and
save Neo you need to write a new function.

Write a function similar to the matrix_addition challenge but instead
of addition, write one for multiplication.

Check your solution by running mocha 14_multiply_matrices

Example:
function multiplyMatrices([[1,2,3],[4,5,6]], [[7,8],[9,10],[11,12]])
=> [[58, 64], [139,154]]

Hint:
Try drawing the function out first if the arrays are a little confusing.
*/

// Checks if matrix can be meaningfully operated upon
function checkMatrixValidity(matrix) {
  if (typeof(matrix) != "object") {
    return false
  }

  if (matrix.length === 0) {
    return false
  }
	const rowlengths = [];
  for (row of matrix) {
    rowlengths.push(row.length)
  }
  if (new Set(rowlengths).size != 1) {
    return false
	}
	return true
}

function getMatrixDimensions(matrix) {
  if (typeof(matrix) != "object") {
    return [0, 0]
  }
  let numberOfRows = matrix.length
  let numberOfColumns = 0
  if (numberOfRows > 0) {
    numberOfColumns = matrix[0].length
  }
  return [numberOfRows, numberOfColumns]
}

function addMatrices(matrix1, matrix2) {
  // Check matrices are valid
  if (
    !checkMatrixValidity(matrix1)
    || !checkMatrixValidity(matrix2)
    // Check matrices are the same size
    || !(getMatrixDimensions(matrix1) === getMatrixDimensions(matrix2))
    )
    {
      return null
  }

  // Add matrices
  let summedMatrix = []
  let workingRow = 0
  while (workingRow < matrix1.length) {
    let summedRow = []
    let workingColumn = 0
    while (workingColumn < matrix1[workingRow].length) {
      summedRow.push(matrix1[workingRow][workingColumn] + matrix2[workingRow][workingColumn])
      workingColumn++ 
    }
    summedMatrix.push(summedRow)
    workingRow++
  }
  return summedMatrix
}

function transposeMatrix(matrix) {
  if (!checkMatrixValidity(matrix)) {
    return null
  }

  let transposedMatrix = [];
  let workingColumn = 0;
  while (workingColumn < matrix[0].length) {
    let workingRow = 0;
    let transposedRow = [];
    while (workingRow < matrix.length) {
      transposedRow.push(matrix[workingRow][workingColumn])
      workingRow++
    }
    transposedMatrix.push(transposedRow)
    workingColumn++
  }

  return transposedMatrix
}

// Returns result of matrix multiplication, or null
// if the matrices cannot be multiplied
function multiplyMatrices(matrix1, matrix2) {
  const matrix1Dimensions = getMatrixDimensions(matrix1)
  const matrix2Dimensions = getMatrixDimensions(matrix2)

  // Check matrices are valid
  if (
    !checkMatrixValidity(matrix1)
    || !checkMatrixValidity(matrix2)
    // Check matrices multiplyable
    || !(matrix1Dimensions[0] === matrix2Dimensions[1] && matrix1Dimensions[1] === matrix2Dimensions[0])
    )
    {
      return null
  }

  let multiplyingRow = 0
  let productMatrix = []
  while (multiplyingRow < matrix1.length) {
    let productRow = []
    let multipliedColumn = 0
    while (multipliedColumn < matrix2[0].length) {
      let sum = 0
      let a = 0
      while (a < matrix2.length) {
        sum += matrix1[multiplyingRow][a] * matrix2[a][multipliedColumn]
        a++
      }
      productRow.push(sum)
      multipliedColumn++
    }
    productMatrix.push(productRow)
    multiplyingRow++
  }
  return productMatrix
}

const assert = require("assert")

describe("Matrix multiplication", function() {})
describe("multiplyMatrices with invalid input", function() {
	it("should return null if one is empty", function() {
		let matrix1 = []
		let matrix2 = [1, 2]
		assert.equal(multiplyMatrices(matrix1, matrix2), null)
	})
	it("should return null if dimensions do not match", function() {
		let matrix1 = [1, 2]
		let matrix2 = [1, 2]
		assert.equal(multiplyMatrices(matrix1, matrix2), null)
	})
})

describe("multiplyMatrices with valid input", function() {
	it("should return [[58,4],[139,154]] with inputs [[1, 2, 3], [4, 5, 6]] and [[7, 8], [9, 10], [11, 12]] ", function() {
		matrix1 = [[1, 2, 3], [4, 5, 6]]
		matrix2 = [[7, 8], [9, 10], [11, 12]]
		expected = [[58, 64], [139, 154]]
		assert.deepEqual(multiplyMatrices(matrix1, matrix2), expected)
	})
	it("should return [[18,5],[26,15]] with inputs [[2,3][4,1]] and [[6,4].[2,-1]]", function() {
		matrix1 = [[2, 3], [4, 1]]
		matrix2 = [[6, 4], [2, -1]]
		expected = [[18, 5], [26, 15]]
		assert.deepEqual(multiplyMatrices(matrix1, matrix2), expected)
	})
	it("should return [[24,28],[1,7]] with inputs [[6,4],[2,-1]], [[2,4],[3,1]]", function() {
		matrix1 = [[6, 4], [2, -1]]
		matrix2 = [[2, 4], [3, 1]]
		expected = [[24, 28], [1, 7]]
		assert.deepEqual(multiplyMatrices(matrix1, matrix2), expected)
	})
	it("should return [[2,13,5],[-7,-8,-4],[16,4,4]] with inputs [[2,1],[-1,-2],[0,4]] and [[-1,6,2],[4,1,1]]", function() {
		matrix1 = [[2, 1], [-1, -2], [0, 4]]
		matrix2 = [[-1, 6, 2], [4, 1, 1]]
		expected = [[2, 13, 5], [-7, -8, -4], [16, 4, 4]]
		assert.deepEqual(multiplyMatrices(matrix1, matrix2), expected)
	})
})
