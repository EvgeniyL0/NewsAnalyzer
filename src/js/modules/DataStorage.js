export class DataStorage {
  constructor() {
    this.write = this.write.bind(this);
    this.read = this.read.bind(this);
    this.clear = this.clear.bind(this);
  }

  write(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  read(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  clear() {
    localStorage.clear();
  }
}