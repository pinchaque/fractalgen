package main

import (
  "github.com/pinchaque/fractalgen/fractal"
  "flag"
  "log"
  "os"
  "math/big"
  "time"
  )

func main() {
  prm, filename := getParams()
  start := time.Now()

  buffer := fractal.GenerateImage(prm)

  f, _ := os.Create(filename)
  if _, err := f.Write(buffer.Bytes()); err != nil {
    log.Printf("Unable to write image to %s", filename)
  }
  f.Close()
  elapsed := time.Since(start)
  log.Printf("(%s, %s) - (%s, %s) %dms -> %s",
    prm.XMin.String(),
    prm.YMin.String(),
    prm.XMax.String(),
    prm.YMax.String(),
    elapsed.Milliseconds(),
    filename)
}

func getParams() (fractal.Params, string) {
  filename := flag.String("o", "image.png", "Output filename (PNG)")
  xmin := flag.Float64("xmin", -2.0, "X minimum")
  xmax := flag.Float64("xmax", 1.5, "X maximum")
  ymin :=flag.Float64("ymin", -1.5, "Y minimum")
  ymax := flag.Float64("ymax", 1.5, "Y maximum")
  width := flag.Int("width", 1024, "Image width")
  height := flag.Int("height", 1024, "Image height")
  iter := flag.Int("iter", 200, "Iterations for convergence")
  escape := flag.Float64("escape", 2.0, "Escape value")
  flag.Parse()

  var prm fractal.Params
  prm.XMin = big.NewFloat(*xmin)
  prm.XMax = big.NewFloat(*xmax)
  prm.YMin = big.NewFloat(*ymin)
  prm.YMax = big.NewFloat(*ymax)
  prm.Width = *width
  prm.Height = *height
  prm.Iterations = uint8(*iter)
  prm.Escape = big.NewFloat(*escape)
  return prm, *filename
}
