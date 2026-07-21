import { useRef } from "react";

export default function usePrevious(value: any): any | null {
  const currentRef = useRef<any>(value);
  const previousRef = useRef<any>(null);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}
