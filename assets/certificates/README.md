# Certificate images

Scans / screenshots of your certificates. Save them here and point the
`image` field of the matching entry in `../../js/content.js` at the file.

Current entries expect:

| File                          | Certificate                                  |
|-------------------------------|----------------------------------------------|
| `udemy-web-dev.png`           | Ultimate Web Development Course 2026 (Udemy)  |
| `google-data-analytics.png`   | Google Data Analytics Professional (Coursera)|

Any web image format works (PNG / JPG / WebP). Landscape scans look best;
~1600px on the long edge, under ~400 KB.

The card shows the image as a thumbnail; clicking it opens the full image
in the lightbox. If a file is missing, the thumbnail just disappears and
the rest of the card is unaffected. Set `image: ""` to omit it entirely.
