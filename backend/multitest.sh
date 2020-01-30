#!/bin/bash

set -x
set -e

OUTDIR=out

if [ ! -d $OUTDIR ] ; then
  mkdir -p $OUTDIR
fi

FRACTALFLAGS="-width=4096 -height=4096 -o=$OUTDIR/fractal.png"

go build fractal_cmd.go

for i in `seq 2 2`; do
  time ./fractal_cmd $FRACTALFLAGS -threads=$i
done
