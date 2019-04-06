package main

import (
//  "fmt"
  "github.com/pinchaque/fractalgen/fractal"
  "log"
  "net/http"
  "strconv"
  )



func main() {
  http.HandleFunc("/", handler)
  log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {

  var prm fractal.Params
  prm.XMin = -2.0
  prm.XMax = 1.5
  prm.YMin = -2.0
  prm.YMax = 2.0
  prm.Width = 1024
  prm.Height = 1024
  prm.Iterations = 200
  prm.Escape = 2.0

  buffer := fractal.GenerateImage(prm)
  w.Header().Set("Content-Type", "image/png")
  w.Header().Set("Content-Length", strconv.Itoa(len(buffer.Bytes())))
  if _, err := w.Write(buffer.Bytes()); err != nil {
    log.Println("unable to write image.")
  }
}
