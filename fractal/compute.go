package fractal

import (
  "math/big"
  "sync"
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

func worker(wg *sync.WaitGroup, results chan<- resultColumn, tasks <-chan computeColumn) {
  defer wg.Done()
  for task := range tasks {
    col := make([]int, task.Prm.Height)
    for py := 0; py < task.Prm.Height; py++ {
      y := pixelToCoordY(task.Prm, py)
      z := new(Complex)
      z.Real = task.X
      z.Imag = y
      col[py] = mandelbrot(z, task.Prm)
    }
    results <- resultColumn{task.Px, col}
  }
}

func GenerateResult(prm Params) *Result {
  tasks := make(chan computeColumn)
  results := make(chan resultColumn)
  wg := new(sync.WaitGroup)

  // set up all the computation tasks
  go func() {
    for px := 0; px < prm.Width; px++ {
      x := pixelToCoordX(prm, px)
      tasks <- computeColumn{px, x, prm}
    }
    close(tasks)
  }()

  // launch all the computation workers
  for th := 0; th < prm.Threads; th++ {
    wg.Add(1)
    go worker(wg, results, tasks)
  }

  // launch result aggregation thread
  r := new(Result)
  r.Width = prm.Width
  r.Height = prm.Height
  r.Iterations = prm.Iterations
  r.Data = make([][]int, prm.Width)
  go func() {
    for colResult := range results {
      r.Data[colResult.Px] = colResult.Data
    }
  }()

  // wait for workers to finish
  wg.Wait()

  // allows result aggregation to finish (not strictly necessary)
  close(results)

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
