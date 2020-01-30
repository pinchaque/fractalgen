package fractal

import (
  "image"
  "image/color"
  "bytes"
  "image/png"
  )


func CreateRGBA(r *Result) *image.RGBA {
  img := image.NewRGBA(image.Rect(0, 0, r.Width, r.Height))
  for x := 0; x < r.Width; x++ {
    for y := 0; y < r.Height; y++ {
      img.Set(x, y, pixelColor(r.Data[x][y]))
    }
  }
  return img
}

func CreatePNG(r *image.RGBA) *bytes.Buffer {
  buffer := new(bytes.Buffer)
  png.Encode(buffer, r)
  return buffer
}

func pixelColor(i int) color.Color {
  if i >= 200 {
    return color.Black
  } else {
    return color.Gray{uint8(255 - (15 * i))}
  }
}
