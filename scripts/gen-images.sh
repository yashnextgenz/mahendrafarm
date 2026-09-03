#!/usr/bin/env bash
# Generates agricultural images with controlled concurrency + retry.
set -u
cd /home/z/my-project
OUT="public/images"
mkdir -p "$OUT"

# Each line: filename|size|prompt
JOBS=(
"why-choose.png|1024x1024|An Indian farmer wearing a traditional straw hat tending to rows of green vegetable crops in a lush organic farm, golden hour sunlight, documentary photography, high quality"
"farmland-wide.png|1344x768|Wide aerial view of lush green Indian farmland with crop fields, coconut trees and a pond under a bright blue sky, professional landscape photography, warm sunlight"
"about-vision.png|1344x768|Rolling green farmland hills with rows of crops under a wide blue sky, peaceful rural Indian landscape, professional photography"
"farm-diverse.png|1344x768|Diverse integrated Indian farm landscape showing vegetable fields, a pond, livestock and trees, green and lush, wide view, natural photography"
"dairy.png|1024x1024|A healthy brown and white dairy cow grazing in a green pasture on an Indian farm, natural daylight, professional photography"
"poultry.png|1024x1024|Free-range brown hens in a sunny farm yard with green grass, natural photography, high quality"
"goat.png|1024x1024|A small herd of healthy goats in a green pasture on an Indian farm, natural daylight, professional photography"
"fish.png|1024x1024|A fish farming pond with clear water and green surroundings, aquaculture, natural photography, high quality"
"mushroom.png|1024x1024|Fresh white oyster mushrooms growing in a clean indoor cultivation setup, natural light, food photography"
"vetiver.png|1024x1024|Rows of tall green vetiver grass growing on a farm, aromatic plant cultivation, natural photography"
"flowers.png|1024x1024|Colorful marigold flowers in bloom on an Indian farm, vibrant orange and yellow, natural daylight"
"vegetables.png|1024x1024|Rows of fresh green leafy vegetables growing in an organic farm, natural daylight, professional photography"
"groundnut.png|1024x1024|Groundnut plants being harvested, peanuts pulled from soil on an Indian farm, natural photography"
"coconut.png|1024x1024|Tall coconut palm trees with green coconuts on a plantation against a blue sky, natural photography"
"banana.png|1024x1024|A banana plantation with bunches of green bananas on trees, lush tropical farm, natural daylight"
"teak.png|1024x1024|Tall straight teak trees in a managed timber plantation, green foliage, forestry, natural photography"
"harvest.png|1344x768|Golden harvest of grains and fresh produce at an Indian farm, farmers working, warm sunlight, documentary photography"
"tomatoes.png|1024x1024|Ripe red tomatoes on the vine in a vegetable garden, natural light, close-up, professional photography"
"fruits.png|1024x1024|Assorted fresh tropical fruits — bananas, mangoes, papayas — in a wicker basket on a farm, food photography"
"milk-products.png|1024x1024|Fresh dairy products — paneer cubes, ghee in a glass jar and a glass of milk — on a rustic wooden table, food photography"
)

gen() {
  local file="$1" size="$2" prompt="$3"
  local path="$OUT/$file"
  if [ -s "$path" ]; then echo "SKIP $file (exists)"; return 0; fi
  for attempt in 1 2 3 4 5; do
    if z-ai image -p "$prompt" -o "./$path" -s "$size" >/dev/null 2>&1; then
      echo "OK   $file"
      return 0
    fi
    echo "RETRY $file (attempt $attempt failed)"
    sleep 8
  done
  echo "FAIL $file"
  return 1
}

# Process 2 at a time
i=0
while [ $i -lt ${#JOBS[@]} ]; do
  a="${JOBS[$i]}"
  IFS='|' read -r f1 s1 p1 <<<"$a"
  gen "$f1" "$s1" "$p1" &
  pid1=$!
  pid2=""
  if [ $((i+1)) -lt ${#JOBS[@]} ]; then
    b="${JOBS[$((i+1))]}"
    IFS='|' read -r f2 s2 p2 <<<"$b"
    gen "$f2" "$s2" "$p2" &
    pid2=$!
  fi
  wait $pid1
  [ -n "$pid2" ] && wait $pid2
  i=$((i+2))
done
echo "ALL DONE"
ls -lh "$OUT"
