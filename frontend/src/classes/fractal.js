
import Point from 'classes/point';

export default class Fractal {
  #center = new Point(-0.75, 0.00);
  #width = 2.50;
  #height = 2.50;
  #iterations = 200;
  #escape = 2.0;

  constructor() {
  }

  get center() { return this.#center; }
  get width() { return this.#width; }
  get height() { return this.#height; }
  get iterations() { return this.#iterations; }
  get escape() { return this.#escape; }

  set center(x) { this.#center = x; }
  set width(x) { this.#width = x; }
  set height(x) { this.#height = x; }
  set iterations(x) { this.#iterations = x; }
  set escape(x) { this.#escape = x; }


  clone() {
    const f = new Fractal();
    f.center = new Point(this.#center.x, this.#center.y);
    f.width = this.#width;
    f.height = this.#height;
    f.iterations = this.#iterations;
    f.escape = this.#escape;
    return f;
  }

  get min() {
    return new Point(
        this.#center.x - (this.#width / 2.0),
        this.#center.y - (this.#height / 2.0));
  }

  get max() {
    return new Point(
        this.#center.x + (this.#width / 2.0),
        this.#center.y + (this.#height / 2.0));
  }
}
