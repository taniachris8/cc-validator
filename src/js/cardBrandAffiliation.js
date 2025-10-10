export function detectBrand(cardNumber) { 
    const formattedNumber = cardNumber.replace(/\D/g, "");
    const cardLength = formattedNumber.length;

     if (/^3[47]/.test(formattedNumber) && cardLength === 15)
       return "American Express";
     if (
       /^3(?:0[0-5]|[689])/.test(formattedNumber) &&
       (cardLength === 14 || cardLength === 16)
     )
       return "Diners Club";
     if (
       /^4/.test(formattedNumber) &&
       (cardLength === 13 || cardLength === 16 || cardLength === 19)
     )
       return "Visa";
     if (/^(5[1-5])/.test(formattedNumber) && cardLength === 16)
       return "MasterCard";
     if (
       /^(22(?:2[1-9]|[3-9]\d)|2[3-7]\d{2})/.test(formattedNumber) &&
       cardLength === 16
     )
       return "MasterCard";
     if (/^6/.test(formattedNumber) && (cardLength === 16 || cardLength === 19))
       return "Discover";
     if (
       /^35/.test(formattedNumber) &&
       (cardLength === 16 || cardLength === 19)
     )
       return "JCB";
     if (
       /^220[0-4]/.test(formattedNumber) &&
       (cardLength === 16 || cardLength === 19)
     )
       return "MIR";

}