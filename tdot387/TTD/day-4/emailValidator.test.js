const { validateEmail } = require('./emailValidator');

// These tests are all happy path - no edge cases!
// Your task: Add at least 10 edge case tests.

describe('validateEmail - Happy Path', () => {
  test('should accept valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  test('should accept email with subdomain', () => {
    expect(validateEmail('user@mail.example.com')).toBe(true);
  });

  test('should accept email with numbers', () => {
    expect(validateEmail('user123@example.com')).toBe(true);
  });
});

describe('Length of E-Mail addresses', () => {
  test('should be shorter than 256 characters', () => {
    expect(validateEmail('089tJi9DEc4MBXjX46RvDF2CJrDOgCeoKCQlF8nm13gYSGkkFXEjIf7WQlisgMr6PBKv8rRvou6WWtf9fOXnlLt86C7LnASMoabQCqKj6rILN6FhVl6iggyZl9CDIRJvgXCfQabrlMSS3hleijsZ1@4zOgQqQxqNFl8ZhBsBMQaiZxah76hB7pkQz86rP8kGyyrs6DQ6ZNuRNv4HT3lSRJosTipIDuLiSGxfdDYNInKiKkOTFyoTCwDqca.de'))
    .toBe(true);
  });

  test('should be at least four characters', () => {
    expect(validateEmail('i@u')).toBe(false);
  });
})

describe('Edge-Cases', () => {
  test('should not contain more than one @', () => {
    expect(validateEmail('ich@@web.de')).toBe(false)
  });

  test('should reject email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  test('should reject email without locale', () => {
    expect(validateEmail('@web.de')).toBe(false);
  });

  test('should contain a dot', () => {
    expect(validateEmail('ich@webde')).toBe(false);
  });
  
  test('should not contain an empty space', () => {
    expect(validateEmail('ich@ web.de')).toBe(false);
  });


})


// TODO: Add your edge case tests here!
//
// Use the checklists from the article:
// 1. Boundary Cases (very short/long emails)
// 2. Null/Undefined/Empty Cases
// 3. Invalid Format Cases (no @, multiple @, etc.)
// 4. Special Characters
//
// Example:
// describe('validateEmail - Boundary Cases', () => {
//   test('should accept minimum length email', () => {
//     expect(validateEmail('a@b.c')).toBe(true);
//   });
//
//   test('should reject email that is too short', () => {
//     expect(() => validateEmail('a@b')).toThrow('Invalid email format');
//   });
// });
