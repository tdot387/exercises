const { add, subtract, multiply, divide } = require("./calculator");

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});

test("subtracts 2 - 1 to equal 1", () => {
  expect(subtract(2, 1)).toBe(1);
});

test("multiplies 2 * 4 to equal 8", () => {
  expect(multiply(2, 4)).toBe(8);
});

test("divides 2 / 2 to equal 1", () => {
  expect(divide(2, 2)).toBe(1);
});

test("divides 2 / 2 to equal 1", () => {
  expect(divide(4, 0)).toThrow("Division by zero");
});
