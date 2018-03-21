#!/bin/bash
file=trails.json
echo "[" > "$file"
for f in json/*
do
	echo "$f"
	cat "$f" >> "$file"
	[ -s "$f" ] && echo "," >> "$file"
done
truncate -s-2 $file
echo "]" >> "$file"
