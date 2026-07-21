import { useCallback, useEffect, useState } from "react";

function useStorage(key: string, defaultValue: object | Function, storageObject: Storage): [object, Function, Function] {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}

export function useLocalStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.sessionStorage);
}
