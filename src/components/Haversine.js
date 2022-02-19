import React from 'react';
import haversine from 'haversine-distance';

function Gmaps(coordinate, d, units, s) {
    return (
        <span><a href={`https://maps.google.com/maps?q=${coordinate.latitude},${coordinate.longitude}`} rel='noreferrer' target={'_blank'}>{d} {units} {s}</a></span>
    )
}

function Haversine({ distance, geoLocation, coordinate }) {

    if (distance || (geoLocation?.latitude && geoLocation?.longitude && coordinate?.latitude && coordinate?.longitude)) {

        let d = null;
        let e = null;
        let s = "";

        if (distance) {
            d = parseInt(distance);
            e = d ? parseInt(d / 1609) : null;
        }
        else {
            const a = { latitude: geoLocation.latitude, longitude: geoLocation.longitude };
            const b = { latitude: coordinate.latitude, longitude: coordinate.longitude };
            const c = haversine(a, b);
            d = c ? parseInt(c) : null;
            e = d ? parseInt(d / 1609) : null;
            s = "(approx.)";
        }

        if (d && d < 1000)
            return (Gmaps(coordinate, d, "meters", s));
        else if (e && d > 1000)
            return (Gmaps(coordinate, e, "miles", s));
        else return (<></>);

    }

    else return (<></>);

}

export default Haversine;