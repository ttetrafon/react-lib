import { useState } from "react";
import useEventListener from "./useEventListener";

export type WindowSizeType = { width: number, height: number };

export default function useWindowSize(): WindowSizeType {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener("resize", () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  return windowSize;
}
