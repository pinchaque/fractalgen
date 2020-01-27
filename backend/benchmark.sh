#!/bin/bash

set -x

OUTDIR=out

if [ ! -d $OUTDIR ] ; then
  mkdir -p $OUTDIR
fi

FRACTALFLAGS="-width=1024 -height=1024 -o=$OUTDIR/fractal.png"

go build fractal_cmd.go

for i in `seq 1 5`; do
  time ./fractal_cmd $FRACTALFLAGS
done
