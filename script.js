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

  /* Hero island: switch loop video ↔ echo-island.glb */
  var islandTabs = document.querySelectorAll("[data-island-tab]");
  var islandSlides = document.querySelectorAll("[data-island-slide]");
  var islandVideoMain = document.getElementById("echo-island-video");
  var islandModel = document.getElementById("echo-model-island");
  if (islandTabs.length && islandSlides.length) {
    islandTabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mode = btn.getAttribute("data-island-tab");
        islandTabs.forEach(function (b) {
          var on = b.getAttribute("data-island-tab") === mode;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        islandSlides.forEach(function (slide) {
          var on = slide.getAttribute("data-island-slide") === mode;
          slide.classList.toggle("is-active", on);
          if (on) slide.removeAttribute("hidden");
          else slide.setAttribute("hidden", "");
        });
        if (mode === "glb") {
          if (islandVideoMain) islandVideoMain.pause();
        } else {
          if (islandModel && typeof islandModel.pause === "function") islandModel.pause();
          if (islandVideoMain && !reduced) {
            var playAgain = islandVideoMain.play();
            if (playAgain && typeof playAgain.catch === "function") {
              playAgain.catch(function () {});
            }
          }
        }
      });
    });
  }
  if (islandModel && reduced) {
    islandModel.removeAttribute("auto-rotate");
  }

  /* Explore map → cutaway dialog */
  var exploreDlg = document.getElementById("echo-explore-dialog");
  if (exploreDlg) {
    document.querySelectorAll("[data-explore-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof exploreDlg.showModal === "function") exploreDlg.showModal();
      });
    });
    exploreDlg.querySelectorAll("[data-explore-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        exploreDlg.close();
      });
    });
    exploreDlg.addEventListener("click", function (e) {
      if (e.target === exploreDlg) exploreDlg.close();
    });
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

  /* Echo Island flipbook — StPageFlip (page-flip CDN), lazy-init when section visible */
  var flipShell = document.getElementById("app-flipbook");
  var flipRoot = document.getElementById("echo-app-book");
  var flipFallback = document.getElementById("echo-flip-fallback");
  if (flipShell && flipRoot && flipFallback) {
    var reducedFlip =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function showFlipFallback() {
      flipRoot.setAttribute("hidden", "");
      flipRoot.setAttribute("aria-hidden", "true");
      flipFallback.hidden = false;
    }

    function runFlipInit() {
      if (!window.St || !window.St.PageFlip) {
        showFlipFallback();
        return;
      }
      var pages = flipRoot.querySelectorAll(".pf-flip-page");
      if (!pages.length) return;
      try {
        var pf = new window.St.PageFlip(flipRoot, {
          width: 320,
          height: 480,
          size: "stretch",
          minWidth: 260,
          maxWidth: 440,
          minHeight: 380,
          maxHeight: 580,
          maxShadowOpacity: 0.42,
          showCover: true,
          mobileScrollSupport: false,
          flippingTime: 760,
        });
        if (typeof pf.loadFromHtml === "function") pf.loadFromHtml(pages);
        else if (typeof pf.loadFromHTML === "function") pf.loadFromHTML(pages);
        window.__echoPageFlip = pf;
      } catch (err) {
        console.warn("Echo flipbook:", err);
        showFlipFallback();
      }
    }

    if (reducedFlip) {
      showFlipFallback();
    } else if ("IntersectionObserver" in window) {
      var flipIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            flipIo.disconnect();
            requestAnimationFrame(function () {
              requestAnimationFrame(runFlipInit);
            });
          });
        },
        { root: null, rootMargin: "100px 0px", threshold: 0.06 }
      );
      flipIo.observe(flipShell);
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(runFlipInit);
      });
    }
  }
})();
