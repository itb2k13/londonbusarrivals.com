import React, { useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { useStore } from '../store/useStore';

function GeoLocation() {

    const geo = useGeolocation({});
    const setGeoLocation = useStore(state => state.setGeolocation);
    const clearGeolocation = useStore(state => state.clearGeolocation);
    const enableGeo = useStore(state => state.enableGeo);

    useEffect(() => {

        if (enableGeo)
            setGeoLocation(geo);
        else
            clearGeolocation({ timestamp: null });

    }, [geo, setGeoLocation, clearGeolocation, enableGeo]);

    return (
        <></>
    )

}

export default GeoLocation;