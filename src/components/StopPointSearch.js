import React from 'react';
import StopPointSearchItem from './StopPointSearchItem';

function StopPointSearch(props) {

    const [result, setResult] = React.useState(null);

    React.useEffect(() => {

        if (props.searchInput) {

            fetch(`https://api.tfl.gov.uk/StopPoint/Search/${props.searchInput}?modes=bus`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    setResult(data);
                });
        }

        if (!props.searchInput && props.geoLocation?.latitude && props.geoLocation?.longitude) {

            fetch(`https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=${props.geoLocation?.latitude}&lon=${props.geoLocation?.longitude}&radius=250`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    setResult(data);
                });
        }

    }, [props.searchInput, props.geoLocation]);

    return (
        <>

            <div className="text-white grid grid-cols-2 gap-2 ">
                {result?.matches?.filter(x => x.modes?.includes("bus"))?.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    .map(function (d) {
                        return (
                            <StopPointSearchItem key={d.id} item={d} geoLocation={props.geoLocation} />
                        )
                    })}

                {result?.stopPoints?.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
                    .map((d) => {
                        return (
                            <StopPointSearchItem key={d.id} item={d} geoLocation={props.geoLocation} />
                        )
                    })}
            </div>

        </>
    );
}

export default StopPointSearch;