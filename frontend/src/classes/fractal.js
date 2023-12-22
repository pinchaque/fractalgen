
import Point from 'classes/point';

export default class Fractal {
  #min = new Point(-2.0, -2.0);
  #max = new Point(2.0, 2.0);
  #iterations = 200;
  #escape = 2.0;

  constructor() {
  }

  get min() { return this.#min; }
  get max() { return this.#max; }
  get iterations() { return this.#iterations; }
  get escape() { return this.#escape; }

  set min(x) { this.#min = x; }
  set max(x) { this.#max = x; }
  set iterations(x) { this.#iterations = x; }
  set escape(x) { this.#escape = x; }

  setBounds(min, max) {
    this.#min = min;
    this.#max = max;
  }

  getXRange() { return this.#max.x - this.#min.x; }

  getYRange() { return this.#max.y - this.#min.y; }
}
