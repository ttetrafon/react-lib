import { useEffect, useState } from 'react';

function getSavedValue(key: string, initialValue: object): object {
  const savedValue = JSON.parse(localStorage.getItem(key) || '');
  return savedValue ? savedValue : (initialValue instanceof Function ? initialValue() : initialValue);
}

export default function useLocalStorage(key: string, initialValue: object | Function): [object, Function] {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
