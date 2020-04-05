import { BaseComponent } from './BaseComponent.js';

export class SearchInput extends BaseComponent {
  constructor(eventHandlers, form, inputElem, submitBtn) {
    super(eventHandlers);
    this.form = form;
    this.inputElem = inputElem;
    this.submitBtn = submitBtn;

    this.find = this.find.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  find() {
    this.inputElem.value = '';
    this._setHandlers(this.form);
  }

  checkValidity(requestFunc) {
    if (this.inputElem.validity.valueMissing) {
      this.submitBtn.setAttribute('disabled', '');
      this.inputElem.style.animationName = 'blink';
      setTimeout(() => {
        this.inputElem.style.animationName = '';
        this.submitBtn.removeAttribute('disabled');
      }, 1000);
    } else {
      requestFunc();
    }
  }
}