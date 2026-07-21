import { useState } from "react";

export default function useArray(defaultValue: any[]) {
  const [array, setArray] = useState<any[]>(defaultValue);

  function push(element: any): void {
    setArray(a => [...a, element]);
  }

  function filter(callback: any): void {
    setArray(a => a.filter(callback));
  }

  function update(index: number, newElement: any): void {
    setArray(a => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length - 1)
    ]);
  }

  function remove(index: number): void {
    setArray(a => [
      ...a.slice(0, index),
      ...a.slice(index + 1, a.length - 1)
    ]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, filter, update, remove, clear };
}
