import { useCallback, useSyncExternalStore } from "react";

type StorageType = "local" | "session";

function getStorage(type: StorageType): Storage | null {
  if (typeof window === "undefined") return null;
  return type === "local" ? window.localStorage : window.sessionStorage;
}

// Same-tab pub/sub, keyed by "type:key", since native `storage` events
// only fire in *other* tabs, not the one that made the change.
const listeners = new Map<string, Set<() => void>>();

function emitChange(cacheKey: string) {
  listeners.get(cacheKey)?.forEach((cb) => cb());
}

function subscribe(cacheKey: string, type: StorageType) {
  return (callback: () => void) => {
    if (!listeners.has(cacheKey)) listeners.set(cacheKey, new Set());
    listeners.get(cacheKey)!.add(callback);

    const onStorage = (e: StorageEvent) => {
      if (e.storageArea === getStorage(type)) callback();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      listeners.get(cacheKey)!.delete(callback);
      window.removeEventListener("storage", onStorage);
    };
  };
}

function useStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  type: StorageType
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const cacheKey = `${type}:${key}`;

  // Snapshots must return a stable primitive (raw JSON string), not a
  // freshly-parsed object each call — otherwise Object.is() never matches
  // and you get an infinite render loop.
  const getSnapshot = useCallback(() => {
    return getStorage(type)?.getItem(key) ?? null;
  }, [key, type]);

  const getServerSnapshot = useCallback(() => null, []);

  const subscribeFn = useCallback(subscribe(cacheKey, type), [cacheKey, type]);

  const jsonValue = useSyncExternalStore(subscribeFn, getSnapshot, getServerSnapshot);

  const resolveDefault = () =>
    typeof defaultValue === "function" ? (defaultValue as () => T)() : defaultValue;

  const value: T = jsonValue != null ? JSON.parse(jsonValue) : resolveDefault();

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const storage = getStorage(type);
      if (!storage) return;

      const currentJson = storage.getItem(key);
      const currentValue: T = currentJson != null ? JSON.parse(currentJson) : resolveDefault();

      const resolved =
        typeof newValue === "function" ? (newValue as (prev: T) => T)(currentValue) : newValue;

      if (resolved === undefined) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, JSON.stringify(resolved));
      }
      emitChange(cacheKey);
    },
    [key, type, cacheKey]
  );

  const remove = useCallback(() => {
    getStorage(type)?.removeItem(key);
    emitChange(cacheKey);
  }, [key, type, cacheKey]);

  return [value, setValue, remove];
}

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, "local");
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, "session");
}
