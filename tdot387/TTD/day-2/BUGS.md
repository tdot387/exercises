Test 1: toBeTruthy durch toBe('hello') ersetzt. Error bekommen. 
Alter Test:
test('removes whitespace', () => {
    const result = trim('  hello  ');
    expect(result).toBeTruthy();
  });
Neuer Test:
test('removes whitespace', () => {
    const result = trim('  hello  ');
    expect(result).toBe('hello');
  });
Test wird grün, weil ich in der stringUtils.js den Code geändert habe

Test 2: 
Alter Test:
test('returns empty string for empty input', () => {
    const result = trim('');
    expect(result == '').toBe(true);
  });
Neuer Test:
test('returns empty string for empty input', () => {
    const result = trim('');
    expect(result).toBe('');
  });

Test 3:
Alter Test:
test('works with string without spaces', () => {
    const result = trim('hello');
    expect(typeof result).toBe('string');
  });
Neuer Test:
test('works with string without spaces', () => {
    const result = trim('hello');
    expect(result).toBe('hello');
  });

Test 4:
Alter Test:
test('makes first letter uppercase', () => {
    const result = capitalize('hello');
    expect(result.charAt(0)).toBe('H');
  });
Neuer Test:
test('makes first letter uppercase', () => {
    const result = capitalize('hello');
    expect(result).toBe('Hello');
  });

Test 5:
Alter Test:
test('works with single character strings', () => {
    const result = capitalize('a');
    expect(result.length).toBe(1);
  });
Neuer Test:
test('works with single character strings', () => {
    const result = capitalize('a');
    // TODO: Only checks length, not the actual value
    expect(result).toBe('A');
  });

Test 6:
Alter Test:
 test('capitalizes UPPERCASE correctly', () => {
    const result = capitalize('HELLO');
    // TODO: Only checks first character - misses that rest should be lowercase
    expect(result.charAt(0)).toBe('H');
  });
Neuer Test:
test('capitalizes UPPERCASE correctly', () => {
    const result = capitalize('HELLO');
    // TODO: Only checks first character - misses that rest should be lowercase
    expect(result).toBe('Hello');
  });

Bug gefixt, indem ich str.slice(1) ein toLowerCase() angehängt habe, was die restlichen Buchstaben klein macht.
function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

Test 7:
Alter Test:
test('replaces spaces with dashes', () => {
    const result = slugify('Hello World');
    // TODO: Too broad - only checks if dash exists somewhere
    expect(result).toContain('-');
  });
Neuer Test:
test('replaces spaces with dashes', () => {
    const result = slugify('Hello World');
    // TODO: Too broad - only checks if dash exists somewhere
    expect(result).toBe('hello-world');
  });

Test 8 ist ähnlich wie Test 7, es wird getestet, ob der String in Kleinbuchstaben geändert wurde

Test 9:
Alter Test:
test('works with multiple words', () => {
    const result = slugify('Hello  Beautiful  World');
    // TODO: Only checks if dash exists - doesn't catch double dashes
    expect(result).toContain('-');
  });
Neuer Test:
test('works with multiple words', () => {
    const result = slugify('Hello  Beautiful  World');
    // TODO: Only checks if dash exists - doesn't catch double dashes
    expect(result).toBe('hello-beautiful-world');
  });
Error bekommen, Bug gefixed, indem ich die Regex erweitert habe: .replace(/\s+/g, '-'); anstatt .replace(/ /g, '-');

Test 10:
Alter Test:
test('returns empty string for empty input', () => {
    const result = slugify('');
    // TODO: Boolean comparison instead of checking the actual value
    expect(result == '').toBe(true);
  });
Neuer Test:
test('returns empty string for empty input', () => {
    const result = slugify('');
    // TODO: Boolean comparison instead of checking the actual value
    expect(result).toBe('');
  });