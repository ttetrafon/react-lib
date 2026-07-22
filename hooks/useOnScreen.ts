import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Keeps track of if the referenced element is currently visible on the screen
 * @param ref: React.RefObject<HTMLElement | null>
 * @param rootMargin: string (default "0px")
 * @returns boolean
 */
export default function useOnScreen(ref: RefObject<HTMLElement | null>, rootMargin: string = "0px"): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const something = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting), { rootMargin }
    );
    observer.observe(ref.current);

    return () => {
      if (!ref.current) return;
      observer.unobserve(ref.current);
    }
  }, [ref.current]);

  return isVisible;
}
