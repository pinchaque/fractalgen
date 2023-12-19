
export default class Point {

  #x = 0.0;
  #y = 0.0;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  
  get x() { return this.#x; }
  get y() { return this.#y; }

  set x(i) { this.#x= i; }
  set y(i) { this.#y= i; }
}
