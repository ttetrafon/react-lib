import { useCallback, useEffect, useState } from "react";

type StorageType = "local" | "session";

function getStorage(type: StorageType): Storage | null {
  if (typeof window === "undefined") return null;
  return type === "local" ? window.localStorage : window.sessionStorage;
}

function useStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  type: StorageType
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  // render the default on first pass
  const [value, setValue] = useState<T>(() =>
    typeof defaultValue === "function" ? (defaultValue as () => T)() : defaultValue
  );

  // on mount (client only), pull in whatever's actually in storage
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const storage = getStorage(type);
    if (!storage) return;
    const jsonValue = storage.getItem(key);
    if (jsonValue != null) setValue(JSON.parse(jsonValue));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return; // don't overwrite storage with the default before we've read it

    const storage = getStorage(type);
    if (!storage) return;
    if (value === undefined) {
      storage.removeItem(key);
      return;
    }
    storage.setItem(key, JSON.stringify(value));
  }, [key, value, type, hydrated]);

  const remove = useCallback(() => {
    setValue(undefined as unknown as T);
  }, []);

  return [value, setValue, remove];
}

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, "local");
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, "session");
}
