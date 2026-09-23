# Fonts

The site now uses **free Google Fonts** picked to closely match the originals:

| Role          | Original        | Free stand-in (in use)              |
|---------------|-----------------|-------------------------------------|
| Display serif | Caslonian       | **Libre Caslon Display / Text**     |
| Body sans     | LL Ivory        | **Space Grotesk**                   |
| Mono / labels | LL Ivory Mono   | **Space Mono**                      |

These load automatically from the `<link>` tag in `index.html` — nothing to
install.

## Using the real licensed fonts later
Buy a web licence for Caslonian / LL Ivory / LL Ivory Mono, drop the `.woff2`
files in this folder, and uncomment the `@font-face` block at the top of
`css/style.css`. The font stacks already list the real names first, so they
take over as soon as the files are present.
