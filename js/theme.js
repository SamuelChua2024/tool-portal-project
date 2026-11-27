// Light/dark theme toggle, shared by every page.
// Light is the default. The visitor's choice is remembered in the browser (localStorage),
// but the page still works if the browser blocks storage.
(function () {
  var root = document.documentElement;

  function savedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* storage blocked: theme just won't be remembered */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var button = document.getElementById("theme-toggle");
    if (button) {
      var isDark = theme === "dark";
      button.setAttribute("aria-pressed", String(isDark));
      button.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
    }
  }

  // Apply immediately (script sits in <head>) so the page doesn't flash the wrong theme.
  applyTheme(savedTheme() === "dark" ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme-toggle");
    applyTheme(root.getAttribute("data-theme"));
    if (button) {
      button.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
      });
    }
  });
})();
