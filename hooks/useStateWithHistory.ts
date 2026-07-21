import { useCallback, useRef, useState } from "react";

export default function useStateWithHistory(defaultValue: any, capacity: number = 10) {
  const [value, setValue] = useState<any>(defaultValue);
  const historyRef = useRef<any[]>([defaultValue]);
  const pointerRef = useRef<number>(0);

  const set = useCallback((v: any) => {
    const resolvedValue = typeof v === 'function' ? v(value) : v;
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
    setValue(historyRef.current[pointerRef.current]);
  }
}
