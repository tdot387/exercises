/**
 * Email Validator - Basic Implementation
 *
 * This implementation works for normal emails,
 * but has gaps for edge cases. Your task is to
 * add tests that reveal these gaps.
 */

function validateEmail(email) {
  // Basic validation - works for happy path, but has many gaps!
  if (!email || typeof email !== "string") {
    throw new Error("Email is required");
  }

  if (email === " ") {
    throw new Error("Emails with just a space are not allowed");
  }

  const trimmed = email.trim();

  if (trimmed === "") {
    throw new Error("Email is required");
  }

  if (!trimmed.includes("@")) {
    throw new Error("Email must contain @");
  }

  if (trimmed.length >= 254) {
    throw new Error("E-Mail is too long");
  }

  if (trimmed.length <= 3) {
    return false;
  }

   if (trimmed.includes(' ')) {
    return false;
  }

  const parts = trimmed.split("@");

  if (parts.length !== 2) {
    return false;
  }

  const locale = parts[0];
  const domain = parts[1];

  if (domain.length === 0) {
    return false;
  }
  
  if (locale.length === 0) {
    return false;
  }

  if(!domain.includes('.')) {
    return false;
  }

  return true;
}

module.exports = { validateEmail };
