import { useEffect, useRef } from "react";

export default function useEventListener(eventType: string, callback: Function, element: HTMLElement | Window = window) {
  const callbackRef = useRef<Function>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
