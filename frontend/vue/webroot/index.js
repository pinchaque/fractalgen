// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var app = new Vue({
  el: '#app',
  data: {
    imgWidth: 100,
    imgHeight: 100,
    zoomFactor: 2.0,
    cursorX: 0,
    cursorY: 0,
    coordX: 0,
    coordY: 0,
    xMin: -2.0,
    xMax: 1.0,
    yMin: -1.1,
    yMax: 1.1
  },
  mounted: function () {
    this.updateDimensions()
  },
  computed: {
    fractalUrl: function () {
      return "http://localhost:8000/?xmin=" + this.xMin
        + "&xmax=" + this.xMax
        + "&ymin=" + this.yMin
        + "&ymax=" + this.yMax
        + "&width=" + this.imgWidth
        + "&height=" + this.imgHeight;
    }
  },
  created() {
    window.addEventListener("resize", this.updateDimensions);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  methods: {
    xRange: function () {
      return this.xMax - this.xMin;
    },
    yRange: function () {
      return this.yMax - this.yMin;
    },
    pixelToCoordX: function (v) {
      var perc = (v - 1.0) / this.imgWidth;
      return this.xMin + (perc * this.xRange());
    },
    pixelToCoordY: function (v) {
      var perc = 1.0 - ((v - 1.0) / this.imgHeight);
      return this.yMin + (perc * this.yRange());
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
      this.xMin = xNew - diffX;
      this.xMax = xNew + diffX;

      var diffY = this.yRange() / 2.0 / this.zoomFactor;
      this.yMin = yNew - diffY;
      this.yMax = yNew + diffY;
    },
    updateDimensions: debounce(function() {
      this.imgWidth = window.innerWidth;
      this.imgHeight = window.innerHeight;
    }, 250)
  }
})
