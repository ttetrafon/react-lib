import { useCallback, useSyncExternalStore } from "react";

export default function useOnlineStatus(): boolean {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    useCallback(() => null, [])
  );

  function subscribe(onStoreChange: () => void): () => void {
    if (typeof window === 'undefined') {
      return () => { };
    }

    window.addEventListener('online', onStoreChange);
    window.addEventListener('offline', onStoreChange);

    return () => {
      window.removeEventListener('online', onStoreChange);
      window.removeEventListener('offline', onStoreChange);
    }
  }

  return isOnline ?? false;
}
