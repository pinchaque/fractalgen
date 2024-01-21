package main

import (
  "github.com/pinchaque/fractalgen/fractal"
  "log"
  "net/http"
  "strconv"
  "math/big"
  "time"
  )



func main() {
  log.Printf("Starting up...")
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
  prm.Threads = 4
  prm.X = getBigFloat(r, "x", big.NewFloat(0))
  prm.Y = getBigFloat(r, "y", big.NewFloat(0))
  prm.XRange = getBigFloat(r, "xrange", big.NewFloat(3.0))
  prm.YRange = getBigFloat(r, "yrange", big.NewFloat(3.0))
  prm.Width = getInt(r, "width", 1024)
  prm.Height = getInt(r, "height", 1024)
  prm.Iterations = getInt(r, "iterations", 200)
  prm.Escape = getBigFloat(r, "escape", big.NewFloat(2.0))
  prm.Grain = getInt(r, "grain", 1)
  return prm
}

func handler(w http.ResponseWriter, r *http.Request) {
  prm := getParams(r)
  start := time.Now()

  log.Printf("Starting render of (%s, %s) range (%s, %s) size %dx%d ...",
    prm.X.String(),
    prm.Y.String(),
    prm.XRange.String(),
    prm.YRange.String(),
    prm.Width,
    prm.Height)

  // save the specified image size
  imgW := prm.Width
  imgH := prm.Height

  // if the grain is >1 then we will generate a less detailed fractal and
  // upsample it later
  if prm.Grain > 1 {
    minSize := 50
    prm.Width = imgW / prm.Grain
    prm.Height = imgH / prm.Grain
    if prm.Width < minSize { prm.Width = minSize }
    if prm.Height < minSize { prm.Height = minSize }
  }

  result := fractal.GenerateResult(prm)
  palette := fractal.Rainbow{NumColors: result.Iterations}
  buffer := fractal.CreatePNG(fractal.CreateRGBA(palette, result, imgW, imgH))

  w.Header().Set("Content-Type", "image/png")
  w.Header().Set("Content-Length", strconv.Itoa(len(buffer.Bytes())))
  if _, err := w.Write(buffer.Bytes()); err != nil {
    log.Println("unable to write image.")
  }
  elapsed := time.Since(start)
  log.Printf("(%s, %s) range (%s, %s) size %dx%d elapsed %dms",
    prm.X.String(),
    prm.Y.String(),
    prm.XRange.String(),
    prm.YRange.String(),
    prm.Width,
    prm.Height,
    elapsed.Milliseconds())
}
