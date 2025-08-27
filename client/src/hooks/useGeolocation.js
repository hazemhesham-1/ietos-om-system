import { useEffect, useRef, useState } from "react";

function useGeolocation(callback, enabled = true) {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const callbackRef = useRef(callback);

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if(!enabled) return;

        if(!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            return;
        }

        function handleSuccess(position) {
            const { latitude: lat, longitude: long } = position.coords;
            setLocation({ lat, long });
            callbackRef.current?.();
        }
        function handleError(err) {
            setError(err.message);
        }

        const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

        return () => navigator.geolocation.clearWatch(watchId);
    }, [enabled]);

    return { location, error };
};

export default useGeolocation;