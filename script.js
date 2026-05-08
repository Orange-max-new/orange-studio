(function () {
  var mailtoBase = "mailto:zht1427639560@outlook.com";

  document.body.classList.remove("no-js");
  requestAnimationFrame(function () {
    document.body.classList.add("is-loaded");
  });

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action");
      if (action && action !== "#") {
        return;
      }
      e.preventDefault();
      var data = new FormData(form);
      var lines = [];
      data.forEach(function (value, key) {
        lines.push(key + ": " + value);
      });
      var subjRaw =
        form.getAttribute("data-mail-subject") || "Echo Island · Inquiry";
      var subj = encodeURIComponent(subjRaw);
      var bod = encodeURIComponent(lines.join("\n"));
      window.location.href = mailtoBase + "?subject=" + subj + "&body=" + bod;
    });
  }

  var mvAiko = document.getElementById("echo-model-aiko");
  if (mvAiko && reduced) {
    mvAiko.removeAttribute("auto-rotate");
  }

  /* Scroll-linked drift for hero editorial block */
  var shell = document.getElementById("echo-shell");
  var inner = document.getElementById("echo-orbit");
  if (shell && inner && !reduced) {
    var driftMax =
      window.matchMedia && window.matchMedia("(max-width: 960px)").matches
        ? 18
        : 36;

    function onScroll() {
      var rect = shell.getBoundingClientRect();
      var total = Math.max(shell.offsetHeight - window.innerHeight, 1);
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var p = scrolled / total;
      var wave = Math.sin(p * Math.PI);
      wave = wave * wave;
      var x = wave * driftMax;
      var scale = 0.985 + 0.018 * wave;
      inner.style.transform =
        "translateX(" + x.toFixed(2) + "px) scale(" + scale.toFixed(3) + ")";
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  /* Reveal on scroll */
  if (!reduced && "IntersectionObserver" in window) {
    var els = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Island sphere: MP4 with PNG fallback */
  var islandVideo = document.getElementById("echo-island-video");
  var islandFallbackImg = document.getElementById("echo-island-video-fallback");
  if (islandVideo && islandFallbackImg) {
    islandVideo.addEventListener("error", function () {
      islandVideo.classList.add("echo-hero-video--hidden");
      islandFallbackImg.hidden = false;
    });
    var tryPlay = function () {
      var p = islandVideo.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {});
      }
    };
    if (islandVideo.readyState >= 2) {
      tryPlay();
    } else {
      islandVideo.addEventListener("loadeddata", tryPlay, { once: true });
    }
  }

  /* Aiko sphere: prefer 艾可.glb, fall back to rigged T-pose */
  if (mvAiko) {
    var swapped = false;
    mvAiko.addEventListener("error", function () {
      if (swapped) return;
      var fb = mvAiko.getAttribute("data-fallback-model");
      if (!fb) return;
      swapped = true;
      mvAiko.setAttribute("src", fb);
    });
  }

})();
