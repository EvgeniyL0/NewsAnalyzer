export function conversionDate(originalString) {
  const dateInMs = new Date(Date.parse(originalString));

  return `${dateInMs.toLocaleString('ru', { day: 'numeric', month: 'long'})}, ${dateInMs.getFullYear()}`;
}