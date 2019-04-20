
var app = new Vue({
  el: '#app',
  data: {
    form : {
        xmin: -1.0,
        xmax: 1.0,
        ymin: -1.0,
        ymax: 1.0
    },
  },
  computed: {
    fractal_url: function () {
      return "http://localhost:8000/?xmin=" + this.form.xmin
        + "&xmax=" + this.form.xmax
        + "&ymin=" + this.form.ymin
        + "&ymax=" + this.form.ymax
        + "&width=500&height=500"
    }
  }
})
