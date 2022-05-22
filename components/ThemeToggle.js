import { useEffect, useRef } from "react";
import useTheme from "../lib/useTheme.ts";
import capitalise from "../util/capitalise";

export default function ThemeToggle() {
  const $toggle = useRef(null);
  const [theme, toggleTheme] = useTheme();

  // If the user doesn't have JS enabled, we don't want to show them
  // this button, since it'll do nothing.
  useEffect(() => {
    $toggle.current.classList.remove("hidden");
  }, []);

  return (
    <button
      type="button"
      className="ThemeToggle hidden"
      onClick={toggleTheme}
      ref={$toggle}
      aria-label="Toggle theme"
    >
      <span className="icon" />
      <span className="ThemeToggle__label">{capitalise(theme)}</span>
    </button>
  );
}
