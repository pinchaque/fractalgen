package fractal

import (
  "math/big"
  "testing"
)

func compare_float64(t *testing.T, exp float64, act float64, msg string) {
  if exp != act {
    t.Errorf("%s: expected %f got %f", msg, exp, act)
  }
}

func compare_complex(t *testing.T, exp complex128, act Complex, msg string) {
  act_r, _ := act.Real.Float64()
  act_i, _ := act.Imag.Float64()

  exp_r := real(exp)
  exp_i := imag(exp)

  compare_float64(t, exp_r, act_r, msg + " real")
  compare_float64(t, exp_i, act_i, msg + " imaginary")
}

func TestIdentity(t *testing.T) {
  r := 2.1
  i := 1.3
  c := Complex{ *big.NewFloat(r), *big.NewFloat(i) }
  z := complex(r, i + 0.001)
  compare_complex(t, z, c, "Basic identity")
}
