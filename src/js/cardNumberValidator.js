export function isValid(cardNumber) {
  const formattedNumber = String(cardNumber).replace(/\D/g, "");

  if (formattedNumber.length < 13 || formattedNumber.length > 19) return false;

  let sum = 0;
  let isSecondDigit = false;

  for (let i = formattedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(formattedNumber.charAt(i), 10);

    if (isSecondDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isSecondDigit = !isSecondDigit;
  }

  return sum % 10 === 0;
}
