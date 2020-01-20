package fractal

import (
  "bytes"
  "image"
  "image/color"
  "image/png"
  "math/big"
  )

func PixelToCoordY(prm Params, p int) *big.Float {
  //y := float64(height - py - 1) / float64(height) * (ymax - ymin) + ymin
  ymin := prm.YMin
  ymax := prm.YMax
  height := prm.Height
  yrange := new(big.Float).Sub(ymax, ymin)

  y := new(big.Float)
  y.Quo(big.NewFloat(float64(height - p - 1)), big.NewFloat(float64(height)))
  y.Mul(y, yrange)
  y.Add(y, ymin)
  return y
}

func PixelToCoordX(prm Params, p int) *big.Float {
  // x := float64(px) / float64(width) * (xmax - xmin) + xmin
  xmin := prm.XMin
  xmax := prm.XMax
  width := prm.Width
  xrange := new(big.Float).Sub(xmax, xmin)

  x := new(big.Float)
  x.Quo(big.NewFloat(float64(p)), big.NewFloat(float64(width)))
  x.Mul(x, xrange)
  x.Add(x, xmin)
  return x
}

func GenerateImage(prm Params) *bytes.Buffer {
  height := prm.Height
  width := prm.Width

  img := image.NewRGBA(image.Rect(0, 0, width, height))
  for py := 0; py < height; py++ {
    y := PixelToCoordY(prm, py)
    for px := 0; px < width; px++ {
      x := PixelToCoordX(prm, px)
      z := new(Complex)
      z.Real = *x
      z.Imag = *y
      img.Set(px, py, mandelbrot(z, prm))
    }
  }

  buffer := new(bytes.Buffer)
  png.Encode(buffer, img)
  return buffer
}

func mandelbrot(z *Complex, prm Params) color.Color {
  const (
    contrast = 15
  )
  iterations := prm.Iterations
  escape := prm.Escape

  v := new(Complex)
  for n := uint8(0); n < iterations; n++ {
    // v = v * v + z
    v.Mul(v, v)
    v.Add(v, z)
    if v.Abs().Cmp(escape) == 1 {
      return color.Gray{255 - contrast * n}
    }
  }
  return color.Black
}
