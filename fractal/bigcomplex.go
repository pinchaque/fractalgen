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

func (z *Complex) Sub(x, y *Complex) *Complex {
  z.Real.Sub(&x.Real, &y.Real)
  z.Imag.Sub(&x.Imag, &y.Imag)
  return z
}

func (z *Complex) Mul(x, y *Complex) *Complex {
  // (a+bi)(c+di) = ac + adi + bci + bdi2
  a := x.Real
  b := x.Imag
  c := y.Real
  d := y.Imag

  ac := new(big.Float)
  ac.Mul(&a, &c)

  ad := new(big.Float)
  ad.Mul(&a, &d)

  bc := new(big.Float)
  bc.Mul(&b, &c)

  bd := new(big.Float)
  bd.Mul(&b, &d)

  z.Real.Sub(ac, bd) // ac + bdi^2 = ac - bd
  z.Imag.Add(ad, bc) // adi + bci

  return z
}
