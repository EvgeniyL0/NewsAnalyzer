function dateConversion(originalString) {
  const dateInMs = new Date(Date.parse(originalString));

  return `${dateInMs.toLocaleString('ru', { day: 'numeric', month: 'long'})}, ${dateInMs.getFullYear()}`;
}

function cutDown(originalString, newStringLength) {
  if (originalString.length > newStringLength) {
    return `${originalString.substr(0, newStringLength)}...`;
  } else {
    return originalString;
  }
}

export {
  dateConversion,
  cutDown
}