# fractalgen

## backend
The Go backend generates PNG fractal images.
```
cd backend 
go run main.go
```

To see an image go to: http://localhost:8000/?y=0&x=-.75&xrange=2.5&yrange=2.5&width=512&height=512&grain=1

## frontend
The React frontend progresisvely renders the fractal in increasing resolution by calling the Go backend. It allows the user to zoom in/out by clicking.
```
cd frontend
npm run dev
```

To use the app go to http://localhost:3000
