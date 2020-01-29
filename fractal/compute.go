package fractal

import (
  "math/big"
  )

func pixelToCoordY(prm Params, p int) *big.Float {
  //y := float64(height - py - 1) / float64(height) * (ymax - ymin) + ymin
  ymin := prm.YMin
  ymax := prm.YMax
  height := prm.Height
  yrange := new(big.Float).Sub(ymax, ymin)

  y := new(big.Float)
  y.Quo(big.NewFloat(float64(height - p - 1)), big.NewFloat(float64(height)))
  y.Mul(y, yrange)
  y.Add(y, ymin)
  return y
}

func pixelToCoordX(prm Params, p int) *big.Float {
  // x := float64(px) / float64(width) * (xmax - xmin) + xmin
  xmin := prm.XMin
  xmax := prm.XMax
  width := prm.Width
  xrange := new(big.Float).Sub(xmax, xmin)

  x := new(big.Float)
  x.Quo(big.NewFloat(float64(p)), big.NewFloat(float64(width)))
  x.Mul(x, xrange)
  x.Add(x, xmin)
  return x
}

type computeColumn struct {
  Px int
  X *big.Float
  Prm Params
}

type resultColumn struct {
  Px int
  Data []int
}

func worker(out chan<- resultColumn, in <-chan computeColumn) {
  for task := range in {
    col := make([]int, task.Prm.Height)
    for py := 0; py < task.Prm.Height; py++ {
      y := pixelToCoordY(task.Prm, py)
      z := new(Complex)
      z.Real = task.X
      z.Imag = y
      col[py] = mandelbrot(z, task.Prm)
    }
    out <- resultColumn{task.Px, col}
  }
  close(out)
}

func GenerateResult(prm Params) *Result {
  tasks := make(chan computeColumn)
  results := make(chan resultColumn)

  // set up all the computation tasks
  go func() {
    for px := 0; px < prm.Width; px++ {
      x := pixelToCoordX(prm, px)
      tasks <- computeColumn{px, x, prm}
    }
    close(tasks)
  }()

  // launch all the computation threads
  for th := 0; th < prm.Threads; th++ {
    go worker(results, tasks)
  }

  // aggregate all results in a new Result object
  r := new(Result)
  r.Width = prm.Width
  r.Height = prm.Height
  r.Iterations = prm.Iterations
  r.Data = make([][]int, prm.Width)
  for colResult := range results {
    r.Data[colResult.Px] = colResult.Data
  }

  return r
}

func mandelbrot(z *Complex, prm Params) int {
  v := NewComplex(0)
  for n := 0; n < prm.Iterations; n++ {
    // v = v * v + z
    v.Mul(v, v)
    v.Add(v, z)
    if v.Abs().Cmp(prm.Escape) == 1 {
      return n
    }
  }
  return prm.Iterations
}
