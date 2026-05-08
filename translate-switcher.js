// Site-wide translator switcher (PT/EN/ES) using Google Translate widget, without page reload.
(function initRoadtripTranslator() {
  var STORAGE_KEY = "roadtrip_lang";
  var COOKIE_NAME = "googtrans";
  var SUPPORTED = { pt: "PT", en: "EN", es: "ES" };
  var currentLang = "pt";
  var layoutGuardTimer = null;

  function setCookie(name, value) {
    var expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    var base = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
    document.cookie = base;
    document.cookie = base + "; domain=" + location.hostname;
    if (location.hostname.indexOf(".") > -1) {
      var rootDomain = location.hostname.split(".").slice(-2).join(".");
      document.cookie = base + "; domain=." + rootDomain;
    }
  }

  function clearCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + location.hostname;
  }

  function getSavedLang() {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw && SUPPORTED[raw] ? raw : "pt";
  }

  function saveLang(lang) {
    if (!SUPPORTED[lang]) return;
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function renderActive(lang) {
    var buttons = document.querySelectorAll(".roadtrip-lang-btn");
    buttons.forEach(function (btn) {
      if (btn.dataset.lang === lang) btn.classList.add("active");
      else btn.classList.remove("active");
    });
  }

  function getTranslateCombo() {
    return document.querySelector(".goog-te-combo");
  }

  function dispatchChange(el) {
    if (!el) return;
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function setGoogleLanguageInstant(lang) {
    var combo = getTranslateCombo();
    if (!combo) return false;

    if (lang === "pt") {
      // Reliable reset path for original language.
      setCookie(COOKIE_NAME, "/pt/pt");
      combo.value = "";
      dispatchChange(combo);
      clearCookie(COOKIE_NAME);
      return true;
    }

    combo.value = lang;
    dispatchChange(combo);
    setCookie(COOKIE_NAME, "/pt/" + lang);
    return true;
  }

  function keepLayoutStable() {
    // Remove Google banner frame if it appears.
    var banner = document.querySelector("iframe.goog-te-banner-frame, .goog-te-banner-frame");
    if (banner && banner.parentNode) {
      banner.parentNode.removeChild(banner);
    }

    document.documentElement.style.marginTop = "0px";
    document.documentElement.style.top = "0px";
    document.body.style.marginTop = "0px";
    document.body.style.top = "0px";
    document.body.style.position = "static";
  }

  function applyLang(lang) {
    if (!SUPPORTED[lang]) return;
    var previousLang = currentLang;
    currentLang = lang;
    saveLang(lang);
    renderActive(lang);

    if (setGoogleLanguageInstant(lang)) {
      // Google widget can fail to restore original text without a refresh.
      // Reload only when user is returning from EN/ES back to PT.
      if (lang === "pt" && previousLang !== "pt") {
        smoothReload();
      }
      return;
    }

    // Retry shortly if Google widget has not mounted yet.
    var tries = 0;
    var maxTries = 20;
    var t = setInterval(function () {
      tries += 1;
      if (setGoogleLanguageInstant(lang) || tries >= maxTries) {
        clearInterval(t);
      }
    }, 250);
  }

  function smoothReload() {
    document.body.classList.add("roadtrip-fade-out");
    setTimeout(function () {
      location.reload();
    }, 220);
  }

  function makeUi() {
    var style = document.createElement("style");
    style.textContent = [
      "body.roadtrip-fade-out{opacity:.18;transition:opacity .2s ease}",
      ".roadtrip-lang-wrap{position:fixed;right:14px;bottom:14px;z-index:99999;display:flex;gap:6px;padding:6px;border-radius:999px;background:rgba(8,26,24,.86);backdrop-filter:blur(8px);box-shadow:0 8px 20px rgba(0,0,0,.25)}",
      ".roadtrip-lang-btn{border:1px solid rgba(151,210,184,.45);background:transparent;color:#e9fff4;border-radius:999px;padding:.42rem .62rem;font:700 .75rem/1 Inter,system-ui,sans-serif;cursor:pointer;min-width:42px}",
      ".roadtrip-lang-btn.active{background:#1f7f63;border-color:#33a17f;color:#fff}",
      "#google_translate_element{position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none}",
      "body > .skiptranslate{display:none!important;visibility:hidden!important}",
      ".goog-te-banner-frame.skiptranslate{display:none!important}",
      "iframe.goog-te-banner-frame{display:none!important;visibility:hidden!important;height:0!important}",
      "iframe.skiptranslate{display:none!important;visibility:hidden!important;height:0!important}",
      "#goog-gt-tt,.goog-te-balloon-frame{display:none!important}",
      ".goog-tooltip,.goog-tooltip:hover{display:none!important}",
      ".goog-text-highlight{background:none!important;box-shadow:none!important}",
      "html,body{margin-top:0!important;top:0!important}",
      "body{top:0!important}"
    ].join("");
    document.head.appendChild(style);

    var hidden = document.createElement("div");
    hidden.id = "google_translate_element";
    document.body.appendChild(hidden);

    var wrap = document.createElement("div");
    wrap.className = "roadtrip-lang-wrap notranslate";

    Object.keys(SUPPORTED).forEach(function (lang) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "roadtrip-lang-btn";
      btn.textContent = SUPPORTED[lang];
      btn.dataset.lang = lang;
      btn.addEventListener("click", function () {
        applyLang(lang);
      });
      wrap.appendChild(btn);
    });

    document.body.appendChild(wrap);
  }

  function bootGoogleTranslate() {
    window.googleTranslateElementInitRoadtrip = function () {
      if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "pt",
          includedLanguages: "en,es",
          autoDisplay: false
        },
        "google_translate_element"
      );

      // Apply saved language instantly when widget becomes available.
      setTimeout(function () {
        applyLang(currentLang);
      }, 300);
    };

    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInitRoadtrip";
    s.async = true;
    document.head.appendChild(s);
  }

  function init() {
    currentLang = getSavedLang();
    makeUi();
    renderActive(currentLang);
    bootGoogleTranslate();
    keepLayoutStable();
    layoutGuardTimer = setInterval(keepLayoutStable, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
