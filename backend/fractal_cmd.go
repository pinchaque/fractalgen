package main

import (
  "github.com/pinchaque/fractalgen/fractal"
  "log"
  "os"
  "math/big"
  "time"
  )

//var params Params
//var species = flag.String("xmin", "gopher", "the species we are studying")


func main() {
  prm := getParams()
  start := time.Now()

  buffer := fractal.GenerateImage(prm)
  filename := "image.png"

  f, _ := os.Create(filename)
  if _, err := f.Write(buffer.Bytes()); err != nil {
    log.Printf("Unable to write image to %s", filename)
  }
  f.Close()
  elapsed := time.Since(start)
  log.Printf("(%s, %s) - (%s, %s) %dms",
    prm.XMin.String(),
    prm.YMin.String(),
    prm.XMax.String(),
    prm.YMax.String(),
    elapsed.Milliseconds())
}

func getParams() fractal.Params {
  var prm fractal.Params
  prm.XMin = big.NewFloat(-2.0)
  prm.XMax = big.NewFloat(1.5)
  prm.YMin = big.NewFloat(-1.8)
  prm.YMax = big.NewFloat(1.8)
  prm.Width = 256
  prm.Height = 256
  prm.Iterations = uint8(200)
  prm.Escape = big.NewFloat(2.0)
  return prm
}
