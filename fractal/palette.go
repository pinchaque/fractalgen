package fractal

import (
  "image/color"
  )

type Palette interface {
  color(i int) color.Color
}

type Grayscale struct {
  Shades int
}

func (o Grayscale) color(i int) color.Color {
  if i >= o.Shades {
    return color.Black
  } else {
    return color.Gray{uint8(255 - (15 * i))}
  }
}
