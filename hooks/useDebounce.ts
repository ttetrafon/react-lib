import { useEffect } from "react";
import useTimeout from "./useTimeout";

export default function useDebounce(callback: Function, delay: number, dependencies: any[]) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);

  // clear it on the first run so it doesn't trigger as soon as it's set up
  useEffect(clear, []);
}
