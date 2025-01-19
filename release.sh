#!/bin/bash
WORKDIR=longhi
ZIPNAME="$WORKDIR"
rm -rf "$WORKDIR" "$ZIPNAME.zip"
mkdir -p "$WORKDIR/doc" "$WORKDIR/project"
pandoc -f gfm -t html report.md | sed  -e 's|<pre class="mermaid"><code>|<pre class="mermaid">|g' -e 's|</code></pre>|</pre>|g' > "$WORKDIR/doc/report.html"
echo ' <script type="module"> import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"; mermaid.initialize({ startOnLoad: true }); </script> ' >> "$WORKDIR/doc/report.html"
cp -r . "$WORKDIR/project"
zip -r "$ZIPNAME.zip" "$WORKDIR"
