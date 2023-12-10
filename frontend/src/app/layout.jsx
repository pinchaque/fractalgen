import './globals.css'

export const metadata = {
  title: 'Fractal Explorer',
  description: 'Explore fractals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="root">{children}</body>
    </html>
  )
}
