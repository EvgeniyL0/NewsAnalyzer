export class FormValidator {
  constructor() {}

  checkInput(inputElem, submitBtn) {
    if (inputElem.validity.valueMissing) {
      inputElem.setAttribute('placeholder', 'Вы не ввели тему');
      inputElem.style.color = 'red';
      submitBtn.setAttribute('disabled', '');
    } else {
      inputElem.setAttribute('placeholder', 'Введите тему новости');
      inputElem.style.color = 'black';
      submitBtn.removeAttribute('disabled')
    }
  }
}