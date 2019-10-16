export function limitToScale(numStr, scale) {
  let str = '';
  for (let i = 0; i < scale; i += 1) {
    str += numStr[i] || '';
  }
  return str;
}

export function addCommas(v, scale = 2) {
  const value = `${v}`; // converts any type:number to string

  if (value === '') {
    return '';
  }

  // limit to only numbers, commas, and decimal
  if (/^[.,0-9\b]+$/.test(value)) {
    const hasDecimalSeparator = value.indexOf('.') !== -1;
    // spilt a float number into different parts beforeDecimal, afterDecimal, and negation
    const numParts = value.replace(/,/gi, '').split('.');
    let beforeDecimal = numParts[0];
    // adds a comma every 3 places
    beforeDecimal = beforeDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    // limits the numbers after decimal to scale
    const afterDecimal =
      hasDecimalSeparator && scale !== 0
        ? `.${limitToScale(numParts[1], scale)}`
        : '';

    return `${beforeDecimal}${afterDecimal}`;
  }

  return null;
}
