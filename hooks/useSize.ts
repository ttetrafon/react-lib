import { useEffect, useState, type RefObject } from "react";

export type ElementSize = {
  width: number,
  height: number,
}

const zero: ElementSize = {
  width: 0,
  height: 0,
}

export default function useSize(ref: RefObject<HTMLElement | null>): ElementSize {
  const [size, setSize] = useState<ElementSize>(() => {
    if (ref && ref.current) {
      return {
        width: ref.current.clientWidth,
        height: ref.current.clientHeight
      };
    }
    else {
      return zero;
    }
  });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const ob: readonly ResizeObserverSize[] = entry.contentBoxSize;
      setSize({
        width: ob[0].inlineSize,
        height: ob[0].blockSize
      })
    });
    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return size;

  // TODO: find out why useSyncExternalStore causes infinite recursion...
  // const s = useSyncExternalStore(
  //   subscribe,
  //   (): ElementSize => {
  //     if (typeof window === "undefined" || !ref || !ref.current) {
  //       return zero;
  //     }
  //     return {
  //       width: ref.current.clientWidth,
  //       height: ref.current.clientHeight
  //     };
  //   },
  //   () => zero
  // )

  // function subscribe(onStoreChange: () => void): () => void {
  //   // Check if we're in a browser environment
  //   if (typeof window === "undefined") {
  //     return () => { };
  //   }

  //   // Only set up the resize listener if ref.current exists and is valid
  //   if (!ref || !ref.current) {
  //     return () => { };
  //   }

  //   // Prevent multiple event listeners from being added to the same element
  //   const element = ref.current;

  //   const handleChange = () => {
  //     // Check if the element still exists before triggering update
  //     if (element) {
  //       onStoreChange();
  //     }
  //   };

  //   // Add event listener for resize
  //   element.addEventListener("resize", handleChange);

  //   // Return cleanup function
  //   return () => {
  //     if (element) {
  //       element.removeEventListener("resize", handleChange);
  //     }
  //   };
  // }

  // return s;
}
