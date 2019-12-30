package fractal

import (
  "math/big"
)

type Complex struct {
	Real, Imag big.Float
}

func (z *Complex) Add(x, y *Complex) *Complex {
  z.Real.Add(&x.Real, &y.Real)
  z.Imag.Add(&x.Imag, &y.Imag)
  return z
}
