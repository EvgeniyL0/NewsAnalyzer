export class SearchInput {
  constructor(form, inputElem, submitBtn, showMoreBtn, eventHandlers) {
    this.form = form;
    this.inputElem = inputElem;
    this.submitBtn = submitBtn;
    this.showMoreBtn =showMoreBtn;
    this.eventHandlers = eventHandlers;

    this.find = this.find.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  _setHandlers() {
    this.form.addEventListener('submit', this.eventHandlers['submit']);
    this.form.addEventListener('input', this.eventHandlers['input']);
    this.showMoreBtn.addEventListener('click', this.eventHandlers['click']);
  }

  find() {
    this.inputElem.value = '';
    this.submitBtn.setAttribute('disabled', '');
    this._setHandlers();
  }

  checkValidity() {
    if (this.inputElem.validity.valueMissing) {
      this.inputElem.setAttribute('placeholder', 'Вы не ввели тему');
      this.inputElem.style.color = 'red';
      this.submitBtn.setAttribute('disabled', '');
    } else {
      this.inputElem.setAttribute('placeholder', 'Введите тему новости');
      this.inputElem.style.color = 'black';
      this.submitBtn.removeAttribute('disabled')
    }
  }
  
}