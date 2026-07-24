import { useCallback, useSyncExternalStore } from "react";

/**
 * Extends useEffect to run when it matches specific media queries only.
 * e.g.: const isNarrow = useMediaQuery("(max-width: 200px)");
 */
export default function useMediaQuery(mediaQuery: string) {
  const getServerSnapshot = useCallback(() => null, []);

  const isMatch = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mediaQuery).matches,
    getServerSnapshot
  );

  function subscribe(onStoreChange: () => void): () => void {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return () => { };
    }

    const mediaQueryList = window.matchMedia(mediaQuery);

    // Call onStoreChange when the media query changes
    const handleChange = (e: MediaQueryListEvent) => {
      onStoreChange();
    };

    mediaQueryList.addEventListener("change", handleChange);

    // Return cleanup function to remove event listener
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }

  return isMatch;
}
