package fractal

import (
  "image/color"
  )

type Palette interface {
  color(i int) color.Color
}

type Rainbow struct {
  NumColors int
}

func (o Rainbow) color(i int) color.Color {

  if i >= o.NumColors {
    return color.Black
  } else {
    // # of colors in each rainbow band
    bandSize := 24
    numBands := 6 // colors in our rainbow

    alpha := uint8(255)

    // which color band are we in (0..5)
    band := (i / bandSize) % numBands

    // what is the index within that band
    bandIndex := i % bandSize

    // figure out the uint8 color strength
    x := 1.0 - (float64(bandIndex) / float64(bandSize))
    val := uint8((x * 255.0) + 0.5)

    r := uint8(0)
    g := uint8(0)
    b := uint8(0)
    switch band {
      case 0: // blue
        b = val
      case 1: // cyan
        b = val
        g = val
      case 2: // green
        g = val
      case 3: // yellow
        g = val
        r = val
      case 4: // red
        r = val
      case 5: // purple
        r = val
        b = val
      default:
        r = uint8(255)
        g = uint8(255)
        b = uint8(255)
    }

    return color.RGBA{r, g, b, alpha}
  }
}
