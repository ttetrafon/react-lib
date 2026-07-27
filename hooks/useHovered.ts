import { useCallback, useState, useSyncExternalStore, type RefObject } from "react";
import useEventListener from "./useEventListener";

export function useHovered(ref: RefObject<HTMLElement | null>): boolean {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEventListener('mouseover', () => setIsHovered(true), ref?.current);
  useEventListener('mouseout', () => setIsHovered(false), ref?.current);

  return isHovered ?? false;
}
