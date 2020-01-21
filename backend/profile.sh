#!/bin/bash

set -x

PROFPATH=out

if [ ! -d $PROFPATH ] ; then
  mkdir -p $PROFPATH
fi

FRACTALFLAGS="-profpath=$PROFPATH -width=1024 -height=1024 -o=$PROFPATH/fractal.png"

go build fractal_cmd.go

PDFOUTCPU=$PROFPATH/profile_cpu.pdf
./fractal_cmd -prof=cpu $FRACTALFLAGS
go tool pprof --pdf ./fractal_cmd $PROFPATH/cpu.pprof > $PDFOUTCPU
echo "Wrote CPU profile to $PDFOUTCPU"

PDFOUTMEM=$PROFPATH/profile_mem.pdf
./fractal_cmd -prof=mem $FRACTALFLAGS
go tool pprof --pdf ./fractal_cmd $PROFPATH/mem.pprof > $PDFOUTMEM
echo "Wrote MEM profile to $PDFOUTMEM"
