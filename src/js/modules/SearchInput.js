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
      this.inputElem.style.animationPlayState = 'running';
      setTimeout(() => {
        this.inputElem.style.animationPlayState = 'paused';
        this.submitBtn.removeAttribute('disabled');
      }, 500);
    } else {
      requestFunc();
    }
  }
}