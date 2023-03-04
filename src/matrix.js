
export const generateMatrix = (size) => {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push([]);
    for (let j = 0; j < size; j++) {
      if (i === j) {
        matrix[i].push(1);
      } else {
        matrix[i].push(Math.floor(Math.random() * 2) ? 1 : -1);
      }
    }
  }
  return matrix;
}

const matrixDeterminant = (matrix) => {
  if (matrix.length === 1) {
    return matrix[0][0];
  }
  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  let determinant = 0;
  for (let i = 0; i < matrix.length; i++) {
    const subMatrix = [];
    for (let j = 1; j < matrix.length; j++) {
      const row = [];
      for (let k = 0; k < matrix.length; k++) {
        if (k !== i) {
          row.push(matrix[j][k]);
        }
      }
      subMatrix.push(row);
    }
    determinant += matrix[0][i] * matrixDeterminant(subMatrix) * (i % 2 === 0 ? 1 : -1);
  }
  return determinant;
}

const isMatrixValid = (matrix) => {
  return matrixDeterminant(matrix) !== 0;
}

export const generateValidMatrix = (size, maxAttempts = 30) => {
  let matrix = generateMatrix(size);
  let attempts = 0;
  while (!isMatrixValid(matrix) && attempts < maxAttempts) {
    matrix = generateMatrix(size);
    attempts++;
  }
  if (!isMatrixValid(matrix)) {
    throw new Error('Could not generate valid matrix');
  }
  return matrix;
}

// Path: matrix.js
