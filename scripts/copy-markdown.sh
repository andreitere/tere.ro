#!/bin/bash
# Copy markdown source files for Markdown for Agents content negotiation
# This script runs after nuxt generate to place .md files alongside generated HTML

set -e

OUTPUT_DIR="${1:-.output/public}"

copy_content() {
  local content_dir="$1"
  local url_prefix="$2"
  local use_frontmatter_category="$3"

  if [ ! -d "$content_dir" ]; then
    echo "Content directory not found: $content_dir"
    return
  fi

  for file in "$content_dir"/*; do
    [ -f "$file" ] || continue
    filename=$(basename "$file")
    slug="${filename%.*}"

    # Strip leading number prefix (e.g. "16.plex-gpu" → "plex-gpu")
    route_slug=$(echo "$slug" | sed 's/^[0-9]*\.//')

    # Skip draft articles
    draft=$(sed -n '/^---$/,/^---$/p' "$file" | grep '^draft:' | head -1 | sed 's/^draft:[[:space:]]*//')
    if [ "$draft" = "true" ]; then
      echo "Skipping draft: $slug"
      continue
    fi

    # Skip external-only projects (no body to serve as markdown)
    external=$(sed -n '/^---$/,/^---$/p' "$file" | grep '^external:' | head -1 | sed 's/^external:[[:space:]]*//')
    if [ "$external" = "true" ]; then
      echo "Skipping external: $slug"
      continue
    fi

    if [ "$use_frontmatter_category" = "true" ]; then
      category=$(sed -n '/^---$/,/^---$/p' "$file" | grep '^category:' | head -1 | sed 's/^category:[[:space:]]*//')
      if [ -z "$category" ]; then
        category="random"
      fi
      dest_dir="$OUTPUT_DIR/$category/$route_slug"
    else
      dest_dir="$OUTPUT_DIR/$url_prefix/$route_slug"
    fi

    mkdir -p "$dest_dir"
    cp "$file" "$dest_dir/index.md"
    echo "Copied: ${dest_dir#$OUTPUT_DIR}/index.md"
  done
}

# Blog articles: use frontmatter category as URL prefix
copy_content "content/blog" "" "true"

# Project pages: use /projects as URL prefix
copy_content "content/projects" "projects" "false"

echo "Done: markdown sidecar files created"