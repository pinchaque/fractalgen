var app = new Vue({
  el: '#app',
  data: {
    imgWidth: 500,
    imgHeight: 500,
    zoomFactor: 2.0,
    cursorX: 0,
    cursorY: 0,
    coordX: 0,
    coordY: 0,
    form : {
        xMin: -2.0,
        xMax: 1.0,
        yMin: -1.1,
        yMax: 1.1
    },
  },
  computed: {
    fractalUrl: function () {
      return "http://localhost:8000/?xmin=" + this.form.xMin
        + "&xmax=" + this.form.xMax
        + "&ymin=" + this.form.yMin
        + "&ymax=" + this.form.yMax
        + "&width=" + this.imgWidth
        + "&height=" + this.imgHeight;
    }
  },
  methods: {
    xRange: function () {
      return this.form.xMax - this.form.xMin;
    },
    yRange: function () {
      return this.form.yMax - this.form.yMin;
    },
    pixelToCoordX: function (v) {
      var perc = (v - 1.0) / this.imgWidth;
      return this.form.xMin + (perc * this.xRange());
    },
    pixelToCoordY: function (v) {
      var perc = 1.0 - ((v - 1.0) / this.imgHeight);
      return this.form.yMin + (perc * this.yRange());
    },
    mouseMove: function (event) {
      this.cursorX = event.offsetX;
      this.cursorY = event.offsetY;
      this.coordX = this.pixelToCoordX(event.offsetX);
      this.coordY = this.pixelToCoordY(event.offsetY);
    },
    zoomIn: function (event) {
      var xNew = this.pixelToCoordX(event.offsetX);
      var yNew = this.pixelToCoordY(event.offsetY);

      var diffX = this.xRange() / 2.0 / this.zoomFactor;
      this.form.xMin = xNew - diffX;
      this.form.xMax = xNew + diffX;

      var diffY = this.yRange() / 2.0 / this.zoomFactor;
      this.form.yMin = yNew - diffY;
      this.form.yMax = yNew + diffY;
    }
  }
})
