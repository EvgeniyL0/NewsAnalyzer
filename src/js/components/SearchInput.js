import { BaseComponent } from './BaseComponent.js';

export class SearchInput extends BaseComponent {
  constructor(eventHandlers, divElement) {
    super(eventHandlers, divElement);

    this.initialize = this.initialize.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  initialize(initFunc, form, upButton) {
    initFunc();
    this._setHandlers(form);
    this._setHandlers(upButton);
  }

  checkValidity(inputElem, inputAnimation, submitBtn, requestFunc) {
    if (inputElem.validity.valueMissing) {
      submitBtn.setAttribute('disabled', '');
      inputElem.style.animationName = inputAnimation;
      setTimeout(() => {
        inputElem.style.animationName = '';
        submitBtn.removeAttribute('disabled');
      }, 1000);
    } else {
      requestFunc();
    }
  }
}