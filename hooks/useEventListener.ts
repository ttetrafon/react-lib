import { useEffect, useRef, type RefObject } from "react";

export default function useEventListener<T>(eventType: string, callback: Function, element: HTMLElement | Window | MediaQueryList | null = window) {
  const callbackRef = useRef<Function>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);
    if (element) element.addEventListener(eventType, handler);

    return () => {
      if (element) return element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
}
