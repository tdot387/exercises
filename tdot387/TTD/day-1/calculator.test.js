const { add, subtract, multiply } = require('./calculator');

test('add should return sum of two numbers', () => {
  // Arrange
  const a = 2;
  const b = 3;

  // Act
  const result = add(a, b);

  // Assert
  expect(result).toBe(5);
});

test('subtract should return difference of two numbers', () => {
    // Arrange
    const a = 7
    const b = 3

    // Act
    const result = subtract(a, b)

    // Assert
    expect(result).toBe(4)
})

test('multiply should return 0 when multiplied with 0', () => {
    
    const a = 5;
    const b = 0;

    const result = multiply(a, b);

    expect(result).toBe(0);
})

