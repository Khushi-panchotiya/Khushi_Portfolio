/* =========================================================
   MAIN — nav, photo-background cross-fade, reveals, gallery
   ========================================================= */
(function () {
  "use strict";

  /* ---------- build content from content.js ---------- */
  var data = window.PORTFOLIO || { projects: [], experience: [], labs: [] };

  function cardHTML(item) {
    var tags = (item.tags || []).map(function (t) { return "<span>" + t + "</span>"; }).join("");
    var link = item.link && item.link !== "#"
      ? '<a href="' + item.link + '" target="_blank" rel="noopener">View &rarr;</a>' : "";
    return '<article class="card reveal"><h3>' + item.title + "</h3>" +
      '<div class="card__tags">' + tags + "</div>" +
      "<p>" + item.blurb + "</p>" + link + "</article>";
  }

  var lc = document.getElementById("labCards");
  if (lc) lc.innerHTML = data.labs.map(cardHTML).join("");

  var certTrack = document.getElementById("certTrack");
  var certMarquee = document.getElementById("certMarquee");
  var cc = certTrack;
  if (certTrack && data.certifications && data.certifications.length) {
    function certItemHTML(c) {
      var tags = (c.skills || []).map(function (s) { return "<span>" + s + "</span>"; }).join("");
      var link = c.url
        ? '<a href="' + c.url + '" target="_blank" rel="noopener">Show credential &rarr;</a>' : "";
      var img = c.image
        ? '<img class="cert__thumb" src="' + c.image + '" alt="' + c.title +
          ' certificate" loading="lazy" onerror="this.remove()" />' : "";
      return '<article class="card marquee__item">' +
        img +
        "<h3>" + c.title + "</h3>" +
        '<div class="card__meta">' + c.issuer + (c.meta ? " &middot; " + c.meta : "") + "</div>" +
        (tags ? '<div class="card__tags">' + tags + "</div>" : "") +
        "<p>" + c.blurb + "</p>" + link +
        "</article>";
    }
    var certOne = data.certifications.map(certItemHTML).join("");
    certTrack.innerHTML =
      '<div class="marquee__set">' + certOne + "</div>" +
      '<div class="marquee__set" aria-hidden="true">' + certOne + "</div>";
    certTrack.style.setProperty("--marquee-duration",
      Math.max(20, data.certifications.length * 11) + "s");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      certMarquee.classList.add("is-static");
    }
  }
  var tl = document.getElementById("timeline");
  if (tl) tl.innerHTML = data.experience.map(function (e) {
    return '<li class="reveal"><div class="role">' + e.role + "</div>" +
      '<div class="meta">' + e.meta + "</div><p>" + e.detail + "</p></li>";
  }).join("");
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- email button + fallback ----------
     Primary: the button opens Gmail's compose window (new tab)
     with To + subject pre-filled. Fallback: a copy button for
     anyone who doesn't use Gmail.                                */
  var mailBtn = document.getElementById("mailBtn");
  var copyEmail = document.getElementById("copyEmail");
  var EMAIL = "khpanchotiya108@gmail.com";

  function flash(el, msg) {
    if (!el) return;
    var prev = el.textContent;
    el.textContent = msg;
    el.classList.add("is-done");
    setTimeout(function () { el.textContent = prev; el.classList.remove("is-done"); }, 1800);
  }
  function copyAddr() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(EMAIL);
    }
    try {
      var t = document.createElement("textarea");
      t.value = EMAIL; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select(); document.execCommand("copy");
      document.body.removeChild(t);
      return Promise.resolve();
    } catch (e) { return Promise.reject(e); }
  }

  if (mailBtn) {
    mailBtn.setAttribute("title", "Compose to " + EMAIL + " in Gmail");
    mailBtn.addEventListener("click", function () { copyAddr().catch(function () {}); });
  }
  if (copyEmail) {
    copyEmail.addEventListener("click", function () {
      copyAddr().then(function () { flash(copyEmail, "Copied ✓"); })
                .catch(function () { flash(copyEmail, EMAIL); });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- typewriter ----------
     Types [data-tw] elements one character at a time. The hero
     line types on load; the rest type when scrolled into view.  */
  var twReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typewriter(el, opts) {
    opts = opts || {};
    var speed = opts.speed || 42;
    var parts = el.children.length ? Array.prototype.slice.call(el.children) : [el];
    var texts = parts.map(function (n) { return n.textContent.replace(/\s+/g, " ").trim(); });
    // lock in the element's full height BEFORE clearing it, so nothing below shifts
    el.style.minHeight = el.getBoundingClientRect().height + "px";
    parts.forEach(function (n) { n.textContent = ""; });
    el.classList.add("tw-run");
    var caret = document.createElement("span");
    caret.className = "tw-caret";
    var pi = 0, ci = 0;
    function tick() {
      var node = parts[pi], full = texts[pi];
      if (caret.parentNode !== node) node.appendChild(caret);
      if (ci < full.length) {
        caret.insertAdjacentText("beforebegin", full.charAt(ci));
        ci++;
        var last = full.charAt(ci - 1);
        setTimeout(tick, speed + (/[.,—?!;:]/.test(last) ? 260 : 0));
      } else if (pi < parts.length - 1) {
        pi++; ci = 0;
        setTimeout(tick, 300);
      } else {
        el.classList.add("tw-done");
        el.style.minHeight = "";   // text now fills the space; release the lock
        setTimeout(function () { if (caret.parentNode) caret.parentNode.removeChild(caret); }, 2400);
      }
    }
    setTimeout(tick, opts.delay || 0);
  }

  Array.prototype.slice.call(document.querySelectorAll("[data-tw]")).forEach(function (el) {
    if (twReduce) return;                       // leave the full text in place
    if (el.closest("#home")) {
      typewriter(el, { delay: 400, speed: 46 });
    } else {
      var done = false;
      var two = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) {
          if (e.isIntersecting && !done) { done = true; two.disconnect(); typewriter(el, { speed: 24 }); }
        });
      }, { threshold: 0.6 });
      two.observe(el);
    }
  });

  /* ---------- scroll-driven photo background ----------
     Consecutive sections that share a data-bg form one "block"
     (home+projects, experience+code, college+contact). The photo
     keeps zooming across the whole block; only near the block's
     end does it blur, then the next photo swaps straight in.
     Zoom direction alternates per block: in, out, in.            */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slides = {};
  document.querySelectorAll(".bg__slide").forEach(function (s) { slides[s.getAttribute("data-bg")] = s; });
  var menuAnchors = Array.prototype.slice.call(document.querySelectorAll(".island__menu a"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("section[data-bg]"));

  var MAX_ZOOM   = 0.18;  // how much the photo scales across a block
  var MAX_BLUR   = 7;     // px of blur at the hand-off (kept gentle so it's easy on the eyes)
  var LEAD_ZONE  = 0.22;  // first part of a block: quick sharpen-in
  var TRAIL_ZONE = 0.22;  // last part of a block: quick blur-out
  var XFADE      = 0.10;  // photo-to-photo cross-fade width

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function smooth(t) { return t * t * (3 - 2 * t); }   // ease-in-out

  var blocks = [];
  function measure() {
    blocks = [];
    panels.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var sec = { id: el.id, top: r.top + window.pageYOffset, height: el.offsetHeight || 1 };
      var key = el.getAttribute("data-bg");
      var last = blocks[blocks.length - 1];
      if (last && last.key === key) {
        last.height += sec.height;
        last.sections.push(sec);
      } else {
        blocks.push({ key: key, top: sec.top, height: sec.height, sections: [sec] });
      }
    });
    blocks.forEach(function (b, i) { b.zoomIn = i % 2 === 0; });
  }

  var ticking = false;
  function render() {
    ticking = false;
    var mid = window.pageYOffset + window.innerHeight / 2;
    var want = {};                 // key -> {opacity, scale, blur}
    var activeId = null;

    blocks.forEach(function (b) {
      var p = (mid - b.top) / b.height;      // 0 at block top, 1 at block bottom
      if (p < -0.6 || p > 1.6) return;

      b.sections.forEach(function (sec) {
        var sp = (mid - sec.top) / sec.height;
        if (sp >= 0 && sp <= 1 && sec.id) activeId = sec.id;
      });

      var pc = clamp(p, 0, 1);

      // zoom keeps moving the whole way through the block
      var z = b.zoomIn ? pc : (1 - pc);
      var scale = 1 + MAX_ZOOM * z;

      // long, eased blur symmetrically at both ends of the block:
      // sharpens in over the first LEAD_ZONE, blurs out over the last TRAIL_ZONE
      var leadSharp  = smooth(clamp(pc / LEAD_ZONE, 0, 1));
      var trailSharp = smooth(clamp((1 - pc) / TRAIL_ZONE, 0, 1));
      var sharp = Math.min(leadSharp, trailSharp);
      var blur = MAX_BLUR * (1 - sharp) + 0.2;

      // gentle cross-fade near the seam so the swap is not harsh
      var fadeIn  = clamp((p + XFADE) / XFADE, 0, 1);
      var fadeOut = clamp((1 - p) / XFADE, 0, 1);
      var op = Math.min(fadeIn, fadeOut);

      var prev = want[b.key];
      if (!prev || op >= prev.opacity) want[b.key] = { opacity: op, scale: scale, blur: blur };
    });

    Object.keys(slides).forEach(function (k) {
      var s = slides[k], w = want[k];
      if (!w) { s.style.opacity = "0"; return; }
      s.style.opacity = w.opacity.toFixed(3);
      if (reduceMotion) {
        s.style.transform = "scale(1)";
        s.style.filter = "saturate(1.04)";
      } else {
        s.style.transform = "scale(" + w.scale.toFixed(4) + ")";
        s.style.filter = "blur(" + w.blur.toFixed(2) + "px) saturate(1.04)";
      }
    });

    if (activeId) {
      menuAnchors.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + activeId);
      });
    }
  }

  function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(render); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { measure(); render(); });
  window.addEventListener("load", function () { measure(); render(); });
  measure();
  render();

  /* ---------- photo gallery ---------- */
  var photos = window.GALLERY_PHOTOS || [];
  var grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";
  photos.forEach(function (p, i) {
    var img = new Image();
    img.src = p.src;
    img.alt = p.caption || "Photo " + (i + 1);
    img.setAttribute("data-caption", p.caption || "");
    img.addEventListener("error", function () {
      var ph = document.createElement("div");
      ph.className = "ph";
      ph.textContent = "photo " + (i + 1);
      if (img.parentNode) img.parentNode.replaceChild(ph, img);
    });
    grid.appendChild(img);
  });

  var galleryTab = document.getElementById("galleryTab");
  var galleryOverlay = document.getElementById("galleryOverlay");
  var galleryClose = document.getElementById("galleryClose");
  function openGallery() { galleryOverlay.classList.add("open"); galleryOverlay.setAttribute("aria-hidden", "false"); }
  function closeGallery() { galleryOverlay.classList.remove("open"); galleryOverlay.setAttribute("aria-hidden", "true"); }
  galleryTab.addEventListener("click", openGallery);
  galleryClose.addEventListener("click", closeGallery);
  galleryOverlay.addEventListener("click", function (e) { if (e.target === galleryOverlay) closeGallery(); });

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCap = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCap.textContent = caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }
  grid.addEventListener("click", function (e) {
    var img = e.target.closest("img");
    if (!img) return;
    openLightbox(img.src, img.getAttribute("data-caption"));
  });
  if (cc) cc.addEventListener("click", function (e) {
    var img = e.target.closest(".cert__thumb");
    if (!img) return;
    e.preventDefault();
    openLightbox(img.src, img.getAttribute("alt"));
  });
  function closeLightbox() { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeLightbox(); closeGallery(); }
  });
})();
