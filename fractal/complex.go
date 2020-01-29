package fractal

import (
  "math/big"
  "fmt"
)

type Complex struct {
	Real, Imag *big.Float
}

func NewComplex(v complex128) *Complex {
  c := new(Complex)
  c.Real = big.NewFloat(real(v))
  c.Imag = big.NewFloat(imag(v))
  return c
}

func NewComplexParts(real float64, imag float64) *Complex {
  c := new(Complex)
  c.Real = big.NewFloat(real)
  c.Imag = big.NewFloat(imag)
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

func (z *Complex) Conj(x *Complex) *Complex {
  z.Real = x.Real
  z.Imag.Mul(big.NewFloat(-1.0), x.Imag)
  return z
}

func (z *Complex) Add(x, y *Complex) *Complex {
  z.Real.Add(x.Real, y.Real)
  z.Imag.Add(x.Imag, y.Imag)
  return z
}

func (z *Complex) Sub(x, y *Complex) *Complex {
  z.Real.Sub(x.Real, y.Real)
  z.Imag.Sub(x.Imag, y.Imag)
  return z
}

func (z *Complex) Mul(x, y *Complex) *Complex {
  // (a+bi)(c+di) = ac + adi + bci + bdi2
  a := x.Real
  b := x.Imag
  c := y.Real
  d := y.Imag

  ac := new(big.Float).Mul(a, c)
  ad := new(big.Float).Mul(a, d)
  bc := new(big.Float).Mul(b, c)
  bd := new(big.Float).Mul(b, d)

  z.Real.Sub(ac, bd) // ac + bdi^2 = ac - bd
  z.Imag.Add(ad, bc) // adi + bci

  return z
}

func (z *Complex) Quo(x, y *Complex) *Complex {
  // (a+bi) / (c+di)
  // Real: (ac+bd)/(c^2 + d^2)
  // Imag: (bc-ad)/(c^2 + d^2)

  a := x.Real
  b := x.Imag
  c := y.Real
  d := y.Imag

  acbd := new(big.Float).Mul(a, c)
  acbd.Add(acbd, new(big.Float).Mul(b, d))

  bcad := new(big.Float).Mul(b, c)
  bcad.Sub(bcad, new(big.Float).Mul(a, d))

  c2d2 := new(big.Float).Mul(c, c)
  c2d2.Add(c2d2, new(big.Float).Mul(d, d))

  // Real: (ac+bd)/(c^2 + d^2)
  z.Real.Quo(acbd, c2d2)

  // Imag: (bc-ad)/(c^2 + d^2)
  z.Imag.Quo(bcad, c2d2)

  return z
}

func (z *Complex) Abs() *big.Float {
  r2 := new(big.Float).Mul(z.Real, z.Real)
  r2.Add(r2, new(big.Float).Mul(z.Imag, z.Imag))
  return r2.Sqrt(r2)
}

