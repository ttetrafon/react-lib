import { useCallback, useRef, useState } from "react";

export default function useStateWithHistory<T>(defaultValue: T, capacity: number = 10) {
  const [value, setValue] = useState<T>(defaultValue);
  const historyRef = useRef<T[]>([defaultValue]);
  const pointerRef = useRef<number>(0);

  const set = useCallback((v: T | ((prevState: T) => T)) => {
    const resolvedValue = typeof v === 'function' ? (v as (prevState: T) => T)(value) : v;
    if (historyRef.current[pointerRef.current] !== resolvedValue) {
      if (pointerRef.current < historyRef.current.length - 1) {
        historyRef.current.splice(pointerRef.current + 1);
      }
      historyRef.current.push(resolvedValue);

      while (historyRef.current.length > capacity) {
        historyRef.current.shift();
      }
      pointerRef.current = historyRef.current.length - 1;
    }
    setValue(resolvedValue);
  }, [capacity, value]);

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;

    pointerRef.current--;
    setCurrent();
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;

    pointerRef.current++;
    setCurrent();
  }, []);

  const go = useCallback((index: number) => {
    if (pointerRef.current <= 0 || pointerRef.current >= historyRef.current.length - 1) return;

    pointerRef.current = index;
    setCurrent();
  }, []);

  function setCurrent() {
    setValue(historyRef.current[pointerRef.current]!);
  }

  return [value, set] as const;
}
