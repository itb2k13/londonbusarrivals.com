import React from 'react';
import StopPointSearchItem from './StopPointSearchItem';
import isValidPostCode from "uk-postcode-validator";
import { useStore } from '../store/useStore';

function StopPointSearch(props) {

    const [result, setResult] = React.useState(null);
    const [searchInput, setSearchInput] = React.useState("");
    const [longitude, setLongitude] = React.useState(null);
    const [latitude, setLatitude] = React.useState(null);
    const geoLocation = useStore(state => state.geoLocation);
    const newSearchInput = useStore(state => state.searchInput);

    React.useEffect(() => {

        if (newSearchInput !== searchInput && isValidPostCode(newSearchInput || '')) {

            setSearchInput(newSearchInput);

            fetch(`https://api.postcodes.io/postcodes/${newSearchInput}`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    fetch(`https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=${data?.result?.latitude}&lon=${data?.result?.longitude}&radius=${props.radius}`)
                        .catch()
                        .then(results => results.json())
                        .then(data => {
                            setResult(data);
                        });
                });


        }

        else if (newSearchInput && newSearchInput !== searchInput) {

            setSearchInput(newSearchInput);

            fetch(`https://api.tfl.gov.uk/StopPoint/Search/${newSearchInput}?modes=bus`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    setResult(data);
                });
        }

        else if (!newSearchInput && geoLocation?.latitude && geoLocation?.latitude !== latitude && geoLocation?.longitude && geoLocation?.longitude !== longitude) {

            setLongitude(geoLocation?.longitude);
            setLatitude(geoLocation?.latitude);

            fetch(`https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=${geoLocation?.latitude}&lon=${geoLocation?.longitude}&radius=${props.radius}`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    setResult(data);
                });
        }

    }, [geoLocation, props.radius, searchInput, latitude, longitude, newSearchInput]);

    return (
        <>

            <div className="text-white grid grid-cols-2 gap-2 ">
                {result?.matches?.filter(x => x.modes?.includes("bus"))?.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    .map(function (d) {
                        return (
                            <StopPointSearchItem key={d.id} item={d} geoLocation={geoLocation} />
                        )
                    })}

                {result?.stopPoints?.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
                    .map((d) => {
                        return (
                            <StopPointSearchItem key={d.id} item={d} geoLocation={geoLocation} />
                        )
                    })}
            </div>

        </>
    );
}

export default StopPointSearch;