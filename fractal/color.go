package fractal

import (
  "image"
  "bytes"
  "image/png"
  )


func CreateRGBA(p Palette, r *Result, w int, h int) *image.RGBA {
  if w == r.Width && h == r.Height {
    return CreateRGBAOrig(p, r)
  } else {
    return CreateRGBASampled(p, r, w, h)
  }
}

// creates image the same size as the result
func CreateRGBAOrig(p Palette, r *Result) *image.RGBA {
  img := image.NewRGBA(image.Rect(0, 0, r.Width, r.Height))
  for x := 0; x < r.Width; x++ {
    for y := 0; y < r.Height; y++ {
      img.Set(x, y, p.color(r.Data[x][y]))
    }
  }
  return img
}

// creates RGBA of specified size from given result using simple-minded
// sampling
func CreateRGBASampled(p Palette, r *Result, w int, h int) *image.RGBA {
  img := image.NewRGBA(image.Rect(0, 0, w, h))

  // ratios to use for sampling
  xFact := float64(r.Width) / float64(w)
  yFact := float64(r.Height) / float64(h)

  // fill in each space of the image based on sampled value from results
  for x := 0; x < w; x++ {
    rx := int((float64(x) * xFact) + 0.5)
    if rx >= r.Width { rx = r.Width - 1 }
    if rx < 0 { rx = 0 }

    for y := 0; y < h; y++ {
      ry := int((float64(y) * yFact) + 0.5)
      if ry >= r.Height { ry = r.Height - 1 }
      if ry < 0 { ry = 0 }

      img.Set(x, y, p.color(r.Data[rx][ry]))
    }
  }
  return img
}

func CreatePNG(r *image.RGBA) *bytes.Buffer {
  buffer := new(bytes.Buffer)
  png.Encode(buffer, r)
  return buffer
}
