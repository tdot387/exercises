const { add, subtract, multiply, divide } = require('./calculator');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('subtracts 1 - 2 to equal -1', () => {
  expect(subtract(1, 2)).toBe(-1);
});

test('multiplies 2 * 2 to equal 4', () => {
  expect(multiply(2, 2)).toBe(4);
});

test('divides 4 / 2 to equal 2', () => {
  expect(divide(4, 2)).toBe(2);
});

// division by zero handling the output of calculation
test('divides 2 / 0 to throw error', () => {
  expect(divide(2, 0)).toBe(Infinity);
});

// divison by zero handling correct error message
test('Dividing by zero throws an error', () => {
  try {
    divide(10, 0);
  } catch (error) {
    expect(error.message).toBe('Cannot divide by zero');
  }
});

// correctly multiplying decimal numbers
test('multiplies 2 * 0.5 to equal 0.25', () => {
    expect(multiply(0.5, 0.5)).toBe(0.25);
});

// handling big numbers
test('multiply 99999999999999999999 * 100 to equal 1e22', () => {
    expect(multiply(99999999999999999999, 100)).toBe(1e22);
});