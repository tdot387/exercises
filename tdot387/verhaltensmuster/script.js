class ValidationStrategy {
  validate(value) {
    throw new Error("ValidationStrategy will be implemented later");
  }
}

class EmailValidation extends ValidationStrategy {
  validate(value) {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(value) ? "" : "Ungültige E-Mail-Adresse.";
  }
}

class PasswordValidation extends ValidationStrategy {
  validate(value) {
    if (value.length < 8) return "Passwort muss mindestens 8 Zeichen lang sein.";
    if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) return "Passwort muss Buchstaben und Zahlen enthalten.";
    return "";
  }
}

class PhoneValidation extends ValidationStrategy {
  validate(value) {
    const re = /^\+[1-9]+$/;
    return re.test(value) ? "" : "Ungültige Telefonnummer.";
  }
}

class Validator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  validate(value) {
    return this.strategy.validate(value);
  }
}

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const emailValidator = new Validator(new EmailValidation());
  const passwordValidator = new Validator(new PasswordValidation());
  const phoneValidator = new Validator(new PhoneValidation());

  const emailError = emailValidator.validate(document.getElementById('email').value);
  const passwordError = passwordValidator.validate(document.getElementById('password').value);
  const phoneError = phoneValidator.validate(document.getElementById('phone').value);

  document.getElementById('emailError').textContent = emailError;
  document.getElementById('passwordError').textContent = passwordError;
  document.getElementById('phoneError').textContent = phoneError;

  if (!emailError && !passwordError && !phoneError) {
    document.getElementById('success-msg').innerText = 'Sent form successfully'
  }
});

