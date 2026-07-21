import { useEffect } from 'react';

export default function useUpdateLogger(name: string, value: any): void {
  useEffect(() => {
    console.log(`${name} value updated:`, value);
  }, [value]);
}
