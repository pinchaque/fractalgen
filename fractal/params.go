package fractal

import (
  "math/big"
)

type Params struct {
  XMin        *big.Float
  XMax        *big.Float
  YMin        *big.Float
  YMax        *big.Float
  Width       int
  Height      int
  Iterations  int
  Escape      *big.Float
}
