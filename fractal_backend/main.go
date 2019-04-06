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
  buffer := fractal.GenerateImage()
  w.Header().Set("Content-Type", "image/png")
  w.Header().Set("Content-Length", strconv.Itoa(len(buffer.Bytes())))
  if _, err := w.Write(buffer.Bytes()); err != nil {
    log.Println("unable to write image.")
  }
}
