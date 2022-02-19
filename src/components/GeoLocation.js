import React, { useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';

function GeoLocation({ setGeoLocation }) {

    const geo = useGeolocation({});

    useEffect(() => {
        setGeoLocation(geo);
    }, [geo, setGeoLocation]);

    return (
        <></>
    )

}

export default GeoLocation;