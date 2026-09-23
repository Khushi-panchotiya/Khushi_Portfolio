/* =========================================================
   PROJECTS — featured grid + continuously-moving project row
   Content comes from window.PORTFOLIO in js/content.js.
   ========================================================= */
(function () {
  "use strict";

  var data = window.PORTFOLIO || {};
  var featured = data.featuredProjects || [];
  var others = data.otherProjects || [];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function tagHTML(tags) {
    return '<div class="card__tags">' +
      (tags || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") +
      "</div>";
  }

  /* local reveal observer — the created nodes aren't in the DOM
     when main.js wires up its own observer, so handle them here */
  function revealize(nodes) {
    nodes = nodes.filter(Boolean);

    if (reduce) { nodes.forEach(function (n) { n.classList.add("in"); }); return; }

    // Reveal a node once it is within ~15% of the viewport. This is a plain
    // scroll check rather than IntersectionObserver so it also works for the
    // nodes projects.js injects after main.js has wired up its own observer.
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = nodes.length - 1; i >= 0; i--) {
        var n = nodes[i];
        var r = n.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) {
          n.classList.add("in");
          nodes.splice(i, 1);
        }
      }
      if (!nodes.length) {
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("load", check);
    check();
  }

  /* ---------- featured projects ---------- */
  var fp = document.getElementById("featuredProjects");
  if (fp) {
    fp.innerHTML = featured.map(function (p) {
      var href = "projects/" + esc(p.slug) + ".html";
      return '' +
        '<a class="feat reveal" href="' + href + '">' +
          '<span class="feat__cover" data-cover="' + esc(p.cover) + '">' +
            '<span class="feat__cover-fallback">' + esc(p.title) + '</span>' +
          '</span>' +
          '<span class="feat__body">' +
            '<span class="feat__title">' + esc(p.title) + '</span>' +
            tagHTML(p.tags) +
            '<span class="feat__blurb">' + esc(p.blurb) + '</span>' +
            '<span class="feat__more">Read the story &rarr;</span>' +
          '</span>' +
        '</a>';
    }).join("");

    fp.querySelectorAll(".feat__cover").forEach(function (el) {
      var src = el.getAttribute("data-cover");
      if (!src) return;
      var img = new Image();
      img.onload = function () {
        el.style.backgroundImage = 'url("' + src + '")';
        el.classList.add("is-loaded");
      };
      img.src = src;
    });

    revealize(Array.prototype.slice.call(fp.querySelectorAll(".feat")));
  }

  /* ---------- continuously-moving project row (marquee) ---------- */
  var marquee = document.getElementById("projectMarquee");
  var track = document.getElementById("marqueeTrack");

  if (marquee && track) {
    if (!others.length) {
      marquee.style.display = "none";
    } else {
      function itemHTML(p) {
        var link = p.repo
          ? '<a href="' + esc(p.repo) + '" target="_blank" rel="noopener">View on GitHub &rarr;</a>'
          : "";
        return '<article class="card marquee__item">' +
          "<h3>" + esc(p.title) + "</h3>" +
          tagHTML(p.tags) +
          "<p>" + esc(p.blurb) + "</p>" + link +
          "</article>";
      }
      var one = others.map(itemHTML).join("");
      // duplicate the set so the loop is seamless
      track.innerHTML =
        '<div class="marquee__set">' + one + "</div>" +
        '<div class="marquee__set" aria-hidden="true">' + one + "</div>";

      // speed: ~5s per card, so longer lists scroll proportionally
      var duration = Math.max(18, others.length * 5);
      track.style.setProperty("--marquee-duration", duration + "s");
      if (reduce) marquee.classList.add("is-static");

      revealize([marquee]);
    }
  }
})();
