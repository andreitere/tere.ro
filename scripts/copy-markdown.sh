#!/bin/bash
# Copy markdown source files for Markdown for Agents content negotiation
# This script runs after nuxt generate to place .md files alongside generated HTML

set -e

OUTPUT_DIR="${1:-.output/public}"
CONTENT_DIR="content/blog"

if [ ! -d "$CONTENT_DIR" ]; then
  echo "Content directory not found: $CONTENT_DIR"
  exit 1
fi

for file in "$CONTENT_DIR"/*; do
  filename=$(basename "$file")
  slug="${filename%.*}"

  # Extract category from frontmatter
  category=$(sed -n '/^---$/,/^---$/p' "$file" | grep '^category:' | head -1 | sed 's/^category:[[:space:]]*//')

  if [ -z "$category" ]; then
    category="random"
  fi

  # Skip draft articles
  draft=$(sed -n '/^---$/,/^---$/p' "$file" | grep '^draft:' | head -1 | sed 's/^draft:[[:space:]]*//')
  if [ "$draft" = "true" ]; then
    echo "Skipping draft: $slug"
    continue
  fi

  dest_dir="$OUTPUT_DIR/$category/$slug"
  mkdir -p "$dest_dir"
  cp "$file" "$dest_dir/index.md"
  echo "Copied: /$category/$slug/index.md"
done

echo "Done: markdown sidecar files created"