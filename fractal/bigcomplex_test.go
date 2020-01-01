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
  for _, v := range GetData() {
    c := NewComplex(v)
    CompareComplex(t, v, c, "Basic identity")
	}
}

func TestString(t *testing.T) {
  for i, v := range GetData() {
    c := NewComplex(v)
    CompareComplex(t, v, c, "String representation")
    str_exp := fmt.Sprintf("%0.10g", v)
    str_act := c.String()
    if str_exp != str_act {
      t.Errorf("[%d] expected '%s' got ''%s'", i, str_exp, str_act)
    }
	}
}

func TestSum(t *testing.T) {
  cmplx := complex(5.8823, -4991.334)
  big_cmplx := NewComplex(cmplx)
  CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Start of test"))

  for i, c := range GetData() {
    cmplx += c
    big_cmplx.Add(big_cmplx, NewComplex(c))
    CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Sum[%d] adding %f", i, c))
  }
}
