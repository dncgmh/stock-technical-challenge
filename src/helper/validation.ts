function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && !Number.isNaN(value);
}

export const validation = {
  isString,
  isNumber
};
