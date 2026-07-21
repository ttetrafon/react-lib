import { useEffect, useRef } from "react";

/**
 * Extend `useEffect` to not trigger during initial setup.
 * @param callback A lambda function called when `useEffect` is triggered.
 * @param dependencies A list of dependencies to trigger `useEffect`.
 */
export default function useUpdateEffect(callback: Function, dependencies: any[]) {
  const firstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}
