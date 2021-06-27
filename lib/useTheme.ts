import { useState, useEffect } from 'react';
import capitalise from '../util/capitalise';

const STORAGE_KEY = 'charlesharries_user_theme';
const COLOR_MODE_KEY = '--color-mode';

export default function useTheme($label: HTMLButtonElement) {
  const [theme, setTheme] = useState('dark');

  /**
   * Get the current color theme.
   * 
   * @returns string - "dark" or "light"
   */
  function currentMode(): string {
    let mode = getComputedStyle(document.documentElement)
      .getPropertyValue(COLOR_MODE_KEY);

    if (mode.length) {
      mode = mode.replace(/"/g, '').trim();
    }

    return mode
  }

  /**
   * Toggles the current theme.
   * 
   * @return void
   */
  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  // Initialise the theme.
  useEffect(() => {
    const theme = localStorage.getItem(STORAGE_KEY) || currentMode();
    setTheme(theme);
  }, [])

  // Run side effects when the theme is updated.
  useEffect(() => {
    const $meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"');

    localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-user-color-scheme', theme);
    $meta.content = theme === 'dark' ? '#222222' : '#ffffff';

    if ($label) {
      $label.classList.remove('hidden');
      $label.innerText = capitalise(theme)
    }
  }, [theme])

  return [theme, toggleTheme]
}