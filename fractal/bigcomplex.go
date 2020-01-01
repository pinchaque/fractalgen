package fractal

import (
  "math/big"
  "fmt"
)

type Complex struct {
	Real, Imag big.Float
}

func NewComplex(v complex128) *Complex {
  c := new(Complex)
  c.Real = *big.NewFloat(real(v))
  c.Imag = *big.NewFloat(imag(v))
  return c
}

func NewComplexParts(real float64, imag float64) *Complex {
  c := new(Complex)
  c.Real = *big.NewFloat(real)
  c.Imag = *big.NewFloat(imag)
  return c
}

func (z *Complex) String() string {
  sep := ""
  if z.Imag.Sign() > -1 { // non-negative
    sep = "+"
  }

  return fmt.Sprintf("(%s%s%si)",
    z.Real.String(),
    sep,
    z.Imag.String())
}

func (z *Complex) Add(x, y *Complex) *Complex {
  z.Real.Add(&x.Real, &y.Real)
  z.Imag.Add(&x.Imag, &y.Imag)
  return z
}
