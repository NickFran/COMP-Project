// Server-side password policy checker
// Server-side password policy checker
// Returns an object with `valid` and `reasons` so callers can present detailed feedback.
function checkPasswordStrength(password) {
  const reasons = [];
  const results = {};

  if (typeof password !== 'string') {
    reasons.push('Password must be a string');
    return { valid: false, reasons, results };
  }

  results.length = password.length >= 12;
  results.uppercase = /[A-Z]/.test(password);
  results.lowercase = /[a-z]/.test(password);
  results.number = /[0-9]/.test(password);
  results.special = /[!@#$&_?]/.test(password);

  if (!results.length) reasons.push('At least 12 characters');
  if (!results.uppercase) reasons.push('At least one uppercase letter');
  if (!results.lowercase) reasons.push('At least one lowercase letter');
  if (!results.number) reasons.push('At least one number');
  if (!results.special) reasons.push('At least one special character (e.g. !@#$%)');

  return { valid: reasons.length === 0, reasons, results };
}

module.exports = { checkPasswordStrength };
