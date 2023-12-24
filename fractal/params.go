package fractal

import (
  "math/big"
)

type Params struct {
  X           *big.Float
  Y           *big.Float
  XRange      *big.Float
  YRange      *big.Float
  Width       int
  Height      int
  Iterations  int
  Threads     int
  Escape      *big.Float
}
