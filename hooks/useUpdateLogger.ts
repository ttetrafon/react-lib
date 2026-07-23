import { useEffect } from 'react';

export default function useUpdateLogger<T>(name: string, value: T): void {
  useEffect(() => {
    console.log(`${name} value updated:`, value);
  }, [value]);
}
