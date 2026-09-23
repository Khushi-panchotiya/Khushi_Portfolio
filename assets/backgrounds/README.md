# Background photos

Save the three nature photos here with these exact names:

| File          | Photo                                  |
|---------------|----------------------------------------|
| `bg-1.png`    | Turquoise river with sunbeams (forest) |
| `bg-2.png`    | Underwater light rays / green plants   |
| `bg-3.png`    | Waterfall into a clear green pool      |

(If you change the extension, update the three `url(...)` lines in
`css/style.css` to match. PNGs this large (~9 MB) are heavy — converting to
JPEG q80 or WebP will load much faster with no visible quality loss.)

They are used as full-screen backgrounds, one per pair of sections
(home+projects = bg-1, experience+code = bg-2, college+contact = bg-3). The
photo zooms across the pair (alternating in / out), blurs at the pair's end,
and the next photo swaps straight in. If a file is missing, a matching solid
colour is shown instead, so the site still looks fine.

Recommended: JPG, ~2000px on the long edge, under ~500 KB each.
To use different names/counts, edit `css/style.css` (`.bg__slide[data-bg=...]`)
and the `data-bg` attributes in `index.html`.
