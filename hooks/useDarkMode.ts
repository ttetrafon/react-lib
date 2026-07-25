import { useEffect } from "react";
import useMediaQuery from "./useMediaQuery";
import { useLocalStorage } from "./useStorage";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('userDarkMode', false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    // TODO: adapt CSS for this instead using prefers-color-scheme in CSS directly
    document.body.classList.toggle('dark-mode', enabled);
  }, [enabled]);

  return [enabled, setDarkMode];
}
