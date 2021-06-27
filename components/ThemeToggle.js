import useTheme from "../lib/useTheme.ts";
import { useEffect, useRef } from 'react';
import capitalise from "../util/capitalise";

export default function ThemeToggle() {
  const $label = useRef(null)
  const $toggle = useRef(null)
  const [theme, toggleTheme] = useTheme($label.current);

  // If the user doesn't have JS enabled, we don't want to show them
  // this button, since it'll do nothing.
  useEffect(() => {
    $toggle.current.classList.remove('hidden');
  }, [])

  return (
    <button type="button" class="ThemeToggle hidden" onClick={toggleTheme} ref={$toggle}>
      <span className="icon"></span>
      <span class="ThemeToggle__label" ref={$label}>{capitalise(theme)}</span>
    </button>
  )
}