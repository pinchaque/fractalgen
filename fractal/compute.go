package fractal

import (
  "math/big"
  )

func pixelToCoordY(prm Params, p int) *big.Float {
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

func pixelToCoordX(prm Params, p int) *big.Float {
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

func GenerateResult(prm Params) *Result {
  r := new(Result)
  r.Width = prm.Width
  r.Height = prm.Height
  r.Iterations = prm.Iterations
  r.Data = make([][]int, prm.Width)

  for px := 0; px < prm.Width; px++ {
    x := pixelToCoordX(prm, px)
    r.Data[px] = make([]int, prm.Height)
    for py := 0; py < prm.Height; py++ {
      y := pixelToCoordY(prm, py)
      z := new(Complex)
      z.Real = x
      z.Imag = y
      r.Data[px][py] = mandelbrot(z, prm)
    }
  }

  return r
}

func mandelbrot(z *Complex, prm Params) int {
  v := NewComplex(0)
  for n := 0; n < prm.Iterations; n++ {
    // v = v * v + z
    v.Mul(v, v)
    v.Add(v, z)
    if v.Abs().Cmp(prm.Escape) == 1 {
      return n
    }
  }
  return prm.Iterations
}
