package main

import (
//  "fmt"
  "github.com/pinchaque/fractalgen/fractal"
  "log"
  "net/http"
  "strconv"
  "math/big"
  "time"
  )



func main() {
  http.HandleFunc("/", handler)
  log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func getFloat(r *http.Request, str string, dflt float64) float64 {
   val := r.URL.Query().Get(str)
    if val == "" {
      return dflt
    }
    ret, _ := strconv.ParseFloat(val, 64)
    return ret
}

func getBigFloat(r *http.Request, str string, dflt *big.Float) *big.Float {
   val := r.URL.Query().Get(str)
    if val == "" {
      return dflt
    }

    ret, _, _ := new(big.Float).Parse(val, 10)
    return ret
}

func getInt(r *http.Request, str string, dflt int) int {
   val := r.URL.Query().Get(str)
    if val == "" {
      return dflt
    }
    ret, _ := strconv.ParseInt(val, 10, 64)
    return int(ret)
}

func getParams(r *http.Request) fractal.Params {
  var prm fractal.Params
  prm.XMin = getBigFloat(r, "xmin", big.NewFloat(-2.0))
  prm.XMax = getBigFloat(r, "xmax", big.NewFloat(2.0))
  prm.YMin = getBigFloat(r, "ymin", big.NewFloat(-2.0))
  prm.YMax = getBigFloat(r, "ymax", big.NewFloat(2.0))
  prm.Width = getInt(r, "width", 1024)
  prm.Height = getInt(r, "height", 1024)
  prm.Iterations = uint8(getInt(r, "iterations", 200))
  prm.Escape = getBigFloat(r, "escape", big.NewFloat(2.0))
  return prm
}

func handler(w http.ResponseWriter, r *http.Request) {
  prm := getParams(r)
  start := time.Now()

  buffer := fractal.GenerateImage(prm)
  w.Header().Set("Content-Type", "image/png")
  w.Header().Set("Content-Length", strconv.Itoa(len(buffer.Bytes())))
  if _, err := w.Write(buffer.Bytes()); err != nil {
    log.Println("unable to write image.")
  }
  elapsed := time.Since(start)
  log.Printf("(%s, %s) - (%s, %s) %dms",
    prm.XMin.String(),
    prm.YMin.String(),
    prm.XMax.String(),
    prm.YMax.String(),
    elapsed.Milliseconds())
}
