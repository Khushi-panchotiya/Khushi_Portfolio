# Portfolio — Kush Panchotiya

A single-page, continuous-scroll personal site in an Austurbane / Aethera style:
big serif display type, a nature scene that parallaxes as you scroll, an
iPhone "Dynamic Island" menu that jumps between sections, and a photo gallery
pinned to the top-left corner.

## Sections (one continuous page)
1. **Home** – intro, what I do, what I love
2. **Projects** – 3 featured projects (each with its own page in `projects/`),
   then a finite carousel of the rest of my GitHub repos
3. **Experience** – basic work history
4. **Code** – GitHub + LeetCode overview and links
5. **College** – lab work & coursework
6. **Contact** – direct mail + LinkedIn / X

## Run it
Use the bundled server (it adds HTTP Range support, which the Tic-Tac-Toe
project page needs to rewind its background video on scroll-up):

```bash
py serve.py 8000
```

Then open http://localhost:8000

Plain `py -m http.server 8000` also works for everything **except** the
scroll-to-rewind video — that server can't seek media, so the video will only
play forward. Opening `index.html` via `file://` mostly works too, but a server
avoids browser restrictions on the gallery images and fonts.

## Editing content
- **Background photos:** save 3 images into `assets/backgrounds/` as `bg-1.png`,
  `bg-2.png`, `bg-3.png` (see that folder's README). Sections are paired by
  background: home+projects use `bg-1`, experience+code use `bg-2`,
  college+contact use `bg-3`. The photo zooms across the whole pair (alternating
  in / out per pair), blurs at the pair's end, then the next photo swaps straight
  in. Change the pairing via the `data-bg` attributes in `index.html`; tune
  `MAX_ZOOM` / `MAX_BLUR` / `LEAD_ZONE` / `TRAIL_ZONE` / `XFADE` at the top of
  the background engine in `js/main.js` (`TRAIL_ZONE` = how early the blur
  starts before a swap).
- **Projects:** edit `featuredProjects` and `otherProjects` in `js/content.js`.
  Each featured project needs a matching page `projects/<slug>.html` (copy an
  existing one) and a cover image `assets/projects/<slug>.png` (see that
  folder's README — a gradient tile shows if it's missing). `otherProjects`
  render in the non-looping carousel; add one whenever you push a new repo.
- **Text for experience / labs:** `js/content.js`
- **Gallery photos:** add files to `assets/gallery/`, list them in `js/gallery.js`
- **Fonts:** free Google Fonts in use (Libre Caslon Display, Space Grotesk,
  Space Mono) as stand-ins for Caslonian / LL Ivory / LL Ivory Mono — see
  `fonts/README.md` to swap in the licensed originals later
- **Links & email:** search `index.html` for `YOUR_GITHUB`, `YOUR_LEETCODE`,
  `YOUR_LINKEDIN`, `YOUR_X`. Email is already set to `khpanchotiya108@gmail.com`.
- **Scene colours / motion:** `css/style.css` (`body[data-scene=...]` blocks) and
  `js/main.js` (`parallax scenery`).

Respects `prefers-reduced-motion`.
