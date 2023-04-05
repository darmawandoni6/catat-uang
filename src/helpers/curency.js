// Input: number
// Output: formatted currency string
export const getCurrencyString = (number, options = {}) => {
  const {
    locale = 'id-ID',
    currency = 'IDR',
    minimumSignificantDigits = 1,
    rounding = 'FLOOR', // 'FLOOR', 'CEIL', null
  } = options;
  let usedNumber;
  switch (rounding) {
    case 'FLOOR':
      usedNumber = Math.floor(number);
      break;
    case 'CEIL':
      usedNumber = Math.ceil(number);
      break;
    default:
      usedNumber = number;
      break;
  }
  const currencyFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumSignificantDigits,
  });
  return currencyFormat.format(usedNumber);
};

// Input: formatted currency string (has been rounded)
// Output: string without currency format
export const getValueAsString = (currencyString) => currencyString.replace(/\D/g, '');

// Input: formatted currency string
// Output: number without currency format, if NaN return 0
export const getValue = (currencyString) => {
  const valueAsString = getValueAsString(currencyString);
  return parseInt(valueAsString, 10) || 0;
};
