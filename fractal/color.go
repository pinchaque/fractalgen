package fractal

import (
  "image"
  "bytes"
  "image/png"
  )

func CreateRGBA(p Palette, r *Result) *image.RGBA {
  img := image.NewRGBA(image.Rect(0, 0, r.Width, r.Height))
  for x := 0; x < r.Width; x++ {
    for y := 0; y < r.Height; y++ {
      img.Set(x, y, p.color(r.Data[x][y]))
    }
  }
  return img
}

func CreatePNG(r *image.RGBA) *bytes.Buffer {
  buffer := new(bytes.Buffer)
  png.Encode(buffer, r)
  return buffer
}
