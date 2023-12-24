package fractal

import (
  "math/big"
  "sync"
  )

func pixelToCoord(
  pixel_idx int, 
  num_pixels int, 
  coord_center *big.Float, 
  coord_size *big.Float) *big.Float {

  // how much of the coordinate space each pixel represents
  size_per_pixel := new(big.Float)
  size_per_pixel.Quo(coord_size, big.NewFloat(float64(num_pixels)))

  // coord offset within a pixel so that the return value is actually at the 
  // center of the pixel not at the start
  coord_offset := new(big.Float)
  coord_offset.Quo(size_per_pixel, big.NewFloat(float64(2.0)))

  // % of way through the pixels. Note that this won't hit 100% since pixel_idx
  // goes from 0 to num_pixels-1
  perc := new(big.Float)
  perc.Quo(big.NewFloat(float64(pixel_idx)), big.NewFloat(float64(num_pixels)))

  // coordinate of 0'th pixel
  coord_min := new(big.Float)
  coord_min.Add(coord_min, coord_size)
  coord_min.Quo(coord_min, big.NewFloat(float64(2.0))) // half range
  coord_min.Sub(coord_center, coord_min) // subtract from center
  coord_min.Add(coord_min, coord_offset) // middle of pixel

  // calc return value as % of way through pixels x overall size
  coord := new(big.Float)
  coord.Mul(perc, coord_size)
  coord.Add(coord, coord_min)

  return coord
}

func pixelToCoordY(prm Params, p int) *big.Float {
  return pixelToCoord(prm.Height - p - 1, prm.Height, prm.Y, prm.YRange)
}

func pixelToCoordX(prm Params, p int) *big.Float {
  return pixelToCoord(p, prm.Width, prm.X, prm.XRange)
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

func worker(
  id int,
  wg *sync.WaitGroup, 
  results chan<- resultColumn, 
  tasks <-chan computeColumn) {
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

  // set up all the computation tasks
  go func() {
    for px := 0; px < prm.Width; px++ {
      x := pixelToCoordX(prm, px)
      tasks <- computeColumn{px, x, prm}
    }
    close(tasks)
  }()

  // launch result aggregation thread
  r := new(Result)
  r.Width = prm.Width
  r.Height = prm.Height
  r.Iterations = prm.Iterations
  r.Data = make([][]int, prm.Width)
  wg_agg := new(sync.WaitGroup)
  wg_agg.Add(1)
  go func() {
    defer wg_agg.Done()
    for colResult := range results {
      r.Data[colResult.Px] = colResult.Data
    }
  }()

  // launch all the computation workers
  wg_workers := new(sync.WaitGroup)
  for th := 0; th < prm.Threads; th++ {
    wg_workers.Add(1)
    go worker(th, wg_workers, results, tasks)
  }

  // wait for workers to finish
  wg_workers.Wait()

  // allows result aggregation to finish
  close(results)

  // wait for aggregation to finish
  wg_agg.Wait()

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
