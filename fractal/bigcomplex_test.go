package fractal

import (
  "testing"
  "fmt"
  "math"
  "math/cmplx"
)

func CompareFloat64(t *testing.T, exp float64, act float64, msg string) {
  epsilon := math.Abs(0.0001 * (exp + act))
  diff := math.Abs(exp - act)
  if (diff > epsilon) {
    t.Errorf("%s: expected %f got %f (diff:%f epsilon:%f)",
      msg, exp, act, diff, epsilon)
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

func TestConj(t *testing.T) {
  for i, c := range GetData() {
    cmplx := cmplx.Conj(c)
    big_cmplx := NewComplex(c)
    big_cmplx.Conj(big_cmplx)
    CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Conj[%d] conjugate of %f", i, c))
  }
}

func TestAdd(t *testing.T) {
  cmplx := complex(5.8823, -4991.334)
  big_cmplx := NewComplex(cmplx)
  CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Start of test"))

  for i, c := range GetData() {
    cmplx += c
    big_cmplx.Add(big_cmplx, NewComplex(c))
    CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Add[%d] adding %f", i, c))
  }
}

func TestSub(t *testing.T) {
  cmplx := complex(5.8823, -4991.334)
  big_cmplx := NewComplex(cmplx)
  CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Start of test"))

  for i, c := range GetData() {
    cmplx -= c
    big_cmplx.Sub(big_cmplx, NewComplex(c))
    CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Sub[%d] subtracting %f", i, c))
  }
}

func TestMul(t *testing.T) {
  cmplx := complex(5.8823, -4991.334)
  big_cmplx := NewComplex(cmplx)
  CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Start of test"))

  for i, c := range GetData() {
    cmplx *= c
    big_cmplx.Mul(big_cmplx, NewComplex(c))
    CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Mul[%d] multiplying %f", i, c))
  }
}

func TestQuoSimple(t *testing.T) {
  cmplx := complex(2.0, 3.0)
  big_cmplx := NewComplex(cmplx)
  CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Start of test"))

  c := complex(4.0, -5.0)
  cmplx /= c
  big_cmplx.Quo(big_cmplx, NewComplex(c))
  CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("dividing by %f", c))
}

func TestQuo(t *testing.T) {
  cmplx := complex(5.8823, -4991.334)
  big_cmplx := NewComplex(cmplx)
  CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Start of test"))

  for i, c := range GetData() {
    cmplx /= c
    big_cmplx.Quo(big_cmplx, NewComplex(c))
    CompareComplex(t, cmplx, big_cmplx, fmt.Sprintf("Quo[%d] dividing by %f", 
	i, c))
  }
}

func TestAbs(t *testing.T) {
  for i, c := range GetData() {
    act, _ := NewComplex(c).Abs().Float64()
    CompareFloat64(t, cmplx.Abs(c), act,
        fmt.Sprintf("Abs[%d] Abs(%f)", i, c))
  }
}

