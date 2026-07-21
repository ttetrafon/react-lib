import { useCallback, useEffect, useState } from "react";

export default function useAsync(callback: Function, dependencies: any[] = []): { isLoading: boolean, error: object | undefined, value: object | null } {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<object | undefined>(undefined);
  const [value, setValue] = useState<object | null>(null);

  const callbackMemo = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(null);
    callback()
      .then()
      .catch()
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemo();
  }, [callbackMemo]);

  return { isLoading: loading, error, value };
}
