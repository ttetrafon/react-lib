import { useEffect, useRef, type EffectCallback } from "react";
import isEqual from 'lodash/fp/isEqual';

/**
 * An extension to `useEffect` that is triggered by comparing the values of the dependencies, not only their references.
 * @param callback
 * @param dependencies
 */
export default function useDeepComparisonEffect(callback: EffectCallback, dependencies: any[]): void {
  const currentDependenciesRef = useRef<any[]>(dependencies);

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, currentDependenciesRef.current);
}
