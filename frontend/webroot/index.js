var app = new Vue({
  el: '#app',
  data: {
    img_width: 500,
    img_height: 500,
    zoom_factor: 2.0,
    form : {
        xmin: -2.0,
        xmax: 1.0,
        ymin: -1.1,
        ymax: 1.1
    },
  },
  computed: {
    fractal_url: function () {
      return "http://localhost:8000/?xmin=" + this.form.xmin
        + "&xmax=" + this.form.xmax
        + "&ymin=" + this.form.ymin
        + "&ymax=" + this.form.ymax
        + "&width=" + this.img_width
        + "&height=" + this.img_height
    }
  },
  methods: {
    zoomIn: function (event) {

      xdiff = this.form.xmax - this.form.xmin
      xperc = (event.offsetX - 1.0) / this.img_width
      xnew = this.form.xmin + (xperc * xdiff)

      ydiff = this.form.ymax - this.form.ymin
      yperc = 1.0 - ((event.offsetY - 1.0) / this.img_height)
      ynew = this.form.ymin + (yperc * ydiff)

      xdiff2 = xdiff / 2.0 / this.zoom_factor
      this.form.xmin = xnew - xdiff2
      this.form.xmax = xnew + xdiff2

      ydiff2 = ydiff / 2.0 / this.zoom_factor
      this.form.ymin = ynew - ydiff2
      this.form.ymax = ynew + ydiff2

      // `this` inside methods points to the Vue instance
      // `event` is the native DOM event
      alert('coord[' + event.offsetX + "," + event.offsetY + "]"
        + ' / perc[' + xperc + "," + yperc + "]"
        + ' / new[' + xnew + "," + ynew + "]"
        + ' / x_range[' + this.form.xmin + "," + this.form.xmax + "]"
        + ' / y_range[' + this.form.ymin + "," + this.form.ymax + "]"
      )
    }
  }
})
