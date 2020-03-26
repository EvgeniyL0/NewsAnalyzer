export function conversionDate(originalString) {
  const day = originalString.substr(8, 2);
  const month = originalString.substr(5, 2);
  const year = originalString.substr(0, 4);
  let monthInLetters = '';

  switch (month) {
    case '01':
      monthInLetters = 'января';
      break;
    case '02':
      monthInLetters = 'февраля';
      break;
    case '03':
      monthInLetters = 'марта';
      break;

    case '04':
      monthInLetters = 'апреля';
      break;

    case '05':
      monthInLetters = 'мая';
      break;

    case '06':
      monthInLetters = 'июня';
      break;

    case '07':
      monthInLetters = 'июля';
      break;

    case '08':
      monthInLetters = 'августа';
      break;

    case '09':
      monthInLetters = 'сентября';
      break;

    case '10':
      monthInLetters = 'октября';
      break;

    case '11':
      monthInLetters = 'ноября';
      break;

    case '12':
      monthInLetters = 'декабря';
      break;
  }

  return `${day} ${monthInLetters}, ${year}`
}