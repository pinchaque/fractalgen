package main

import (
  "bytes"
  "image"
  "image/color"
  "image/png"
  "math/cmplx"
  )

func generateImage() *bytes.Buffer {
  const (
    xmin, ymin, xmax, ymax = -2, -2, 2, 2
    width, height = 2048, 2048
  )

  img := image.NewRGBA(image.Rect(0, 0, width, height))
  for py := 0; py < height; py++ {
    y := float64(py) / height * (ymax - ymin) + ymin
    for px := 0; px < width; px++ {
      x := float64(px) / width * (xmax - xmin) + xmin
      z := complex(x, y)
      img.Set(px, py, mandelbrot(z))
    }
  }

  buffer := new(bytes.Buffer) 
  png.Encode(buffer, img)
  return buffer
}

func mandelbrot(z complex128) color.Color {
  const (
    iterations = 200
    contrast = 15
    escape = 2
  )

  var v complex128
  for n := uint8(0); n < iterations; n++ {
    v = v * v + z
    if cmplx.Abs(v) > escape {
      return color.Gray{255 - contrast * n}
    }
  }
  return color.Black
}
