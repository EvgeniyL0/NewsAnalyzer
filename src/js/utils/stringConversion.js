export function dateConversion(originalString) {
  const dateInMs = new Date(Date.parse(originalString));

  return `${dateInMs.toLocaleString('ru', { day: 'numeric', month: 'long'})}, ${dateInMs.getFullYear()}`;
}