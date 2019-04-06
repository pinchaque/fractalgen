package fractal

import (
  "bytes"
  "image"
  "image/color"
  "image/png"
  "math/cmplx"
  )

func GenerateImage(prm Params) *bytes.Buffer {
  xmin := prm.XMin
  xmax := prm.XMax
  ymin := prm.YMin
  ymax := prm.YMax
  height := prm.Height
  width := prm.Width

  img := image.NewRGBA(image.Rect(0, 0, width, height))
  for py := 0; py < height; py++ {
    y := float64(py) / float64(height) * (ymax - ymin) + ymin
    for px := 0; px < width; px++ {
      x := float64(px) / float64(width) * (xmax - xmin) + xmin
      z := complex(x, y)
      img.Set(px, py, mandelbrot(z, prm))
    }
  }

  buffer := new(bytes.Buffer) 
  png.Encode(buffer, img)
  return buffer
}

func mandelbrot(z complex128, prm Params) color.Color {
  const (
    contrast = 15
  )
  iterations := prm.Iterations
  escape := prm.Escape

  var v complex128
  for n := uint8(0); n < iterations; n++ {
    v = v * v + z
    if cmplx.Abs(v) > escape {
      return color.Gray{255 - contrast * n}
    }
  }
  return color.Black
}
