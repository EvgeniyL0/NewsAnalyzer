export class BaseComponent {
  constructor(eventHandlers, divElement) {
    this.eventHandlers = eventHandlers;
    this.divElement = divElement;
    /*this.eventHandlers = [ { target: element, event: 'click', handler: handlerFunc }, ... ]*/
  }

  _setHandlers(domElement) {
    const res = this.eventHandlers.find(item => item.target === domElement);
    domElement.addEventListener(res.event, res.handler);
  }

  _removeHandlers(domElement) {
    const res = this.eventHandlers.find(item => item.target === domElement);
    domElement.removeEventListener(res.event, res.handler);
  }

  _sanitize(markup) {
    const temp = this.divElement;
    temp.textContent = markup;
    return temp.textContent;
  }
}