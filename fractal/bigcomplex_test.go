package fractal

import (
  "testing"
  "fmt"
)

func CompareFloat64(t *testing.T, exp float64, act float64, msg string) {
  if exp != act {
    t.Errorf("%s: expected %f got %f", msg, exp, act)
  }
}

func CompareComplex(t *testing.T, exp complex128, act *Complex, msg string) {
  act_r, _ := act.Real.Float64()
  act_i, _ := act.Imag.Float64()

  exp_r := real(exp)
  exp_i := imag(exp)

  CompareFloat64(t, exp_r, act_r, msg + " real")
  CompareFloat64(t, exp_i, act_i, msg + " imaginary")
}

func GetData() []complex128 {
  return []complex128 { 2.1+1.3i,
    0+9.221i,
    0-3.4591i,
    1.3,
    -9.008,
    5.8823-4991.334i,
    -3.9811+84.511i }
}

func TestIdentity(t *testing.T) {
  for i, v := range GetData() {
    t.Logf("Data[%d] = %f", i, v)
    c := NewComplex(real(v), imag(v))
    CompareComplex(t, v, c, "Basic identity")
	}
}

func TestSum(t *testing.T) {
  v1 := complex(5.8823, -4991.334)
  v2 := complex(-3.9811, 84.511)
  exp := v1 + v2
  c1 := NewComplex(real(v1), imag(v1))
  c2 := NewComplex(real(v2), imag(v2))
  c1.Add(c1, c2)
  CompareComplex(t, exp, c1, fmt.Sprintf("Adding %f and %f", v1, v2))
}
