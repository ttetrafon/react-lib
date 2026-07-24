import { useState, useEffect } from "react";

export type GeolocationData = {
  latitude: number;
  longitude: number;
}

const zero: GeolocationData = { latitude: 0, longitude: 0 };

export default function useGeolocation(options: PositionOptions = {}): [boolean, GeolocationData, GeolocationPositionError | null] {
  const [data, setData] = useState<GeolocationData>(zero);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Only start watching once when the hook is first used
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setError({
        code: GeolocationPositionError.PERMISSION_DENIED,
        message: "Geolocation is not supported",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError);
      setLoading(false);
      return;
    }

    // Only start watching if we haven't already
    if (watchId === null) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          setError(null);
          setData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err) => {
          setLoading(false);
          setError(err);
        },
        options
      );

      const id = navigator.geolocation.watchPosition(
        (position) => {
          setError(null);
          setData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err) => {
          setError(err);
        },
        options
      );

      setWatchId(id);
    }

    // Cleanup function to clear watch when component unmounts
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId, options]);

  return [loading, data, error];
}
