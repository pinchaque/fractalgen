
export default class ImageCanvas {

  #width = 512;
  #height = 512;

  constructor(w, h) {
    this.setSize(w, h);
  }
  
  get width() { return this.#width; }
  get height() { return this.#height; }

  set width(i) { this.#width = i; }
  set height(i) { this.#height = i; }

  setSize(w, h) {
    this.#width = w;
    this.#height = h;
  }
}
