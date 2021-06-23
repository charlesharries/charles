(() => {
  // assets/js/components/ThemeToggle.js
  var capitalise = (str) => {
    if (!str)
      return null;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  var ThemeToggle = class {
    constructor($el) {
      this.$el = $el;
      this.$label = this.$el.querySelector(".ThemeToggle__label");
      this.$meta = document.querySelector('meta[name="theme-color"]');
      this.$el.classList.remove("hidden");
      this.STORAGE_KEY = "user-color-scheme";
      this.COLOR_MODE_KEY = "--color-mode";
      this.initListeners = this.initListeners.bind(this);
      this.toggleTheme = this.toggleTheme.bind(this);
      this.updateButton = this.updateButton.bind(this);
      this.setTheme = this.setTheme.bind(this);
      this.initListeners();
      this.initTheme();
    }
    get currentSetting() {
      return localStorage.getItem(this.STORAGE_KEY) || this.currentColorMode;
    }
    get currentColorMode() {
      let mode = getComputedStyle(document.documentElement).getPropertyValue(this.COLOR_MODE_KEY);
      if (mode.length) {
        mode = mode.replace(/"/g, "").trim();
      }
      return mode;
    }
    initListeners() {
      this.$el.addEventListener("click", this.toggleTheme);
    }
    initTheme() {
      if (this.currentSetting) {
        document.documentElement.setAttribute("data-user-color-scheme", this.currentSetting);
        this.updateButton();
        this.updateMeta();
      }
    }
    setTheme(theme) {
      localStorage.setItem(this.STORAGE_KEY, theme);
      document.documentElement.setAttribute("data-user-color-scheme", theme);
      this.updateButton();
      this.updateMeta();
    }
    updateButton() {
      this.$label.innerText = capitalise(this.currentSetting);
    }
    updateMeta() {
      console.log({ meta: this.$meta, setting: this.currentSetting });
      this.$meta.content = this.currentSetting === "dark" ? "#222222" : "#ffffff";
    }
    toggleTheme() {
      this.setTheme(this.currentSetting === "dark" ? "light" : "dark");
    }
  };
  var ThemeToggle_default = {
    init() {
      const $elements = document.querySelectorAll('[data-element="ThemeToggle"]');
      $elements.forEach(($el) => new ThemeToggle($el));
    }
  };

  // assets/js/index.js
  function main() {
    ThemeToggle_default.init();
  }
  main();
})();
