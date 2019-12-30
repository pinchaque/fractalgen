package fractal

import (
  "math/big"
)

type Complex struct {
	Real, Imag big.Float
}

func NewComplex(real float64, imag float64) *Complex {
  c := new(Complex)
  c.Real = *big.NewFloat(real)
  c.Imag = *big.NewFloat(imag)
  return c
}

func (z *Complex) Add(x, y *Complex) *Complex {
  z.Real.Add(&x.Real, &y.Real)
  z.Imag.Add(&x.Imag, &y.Imag)
  return z
}
