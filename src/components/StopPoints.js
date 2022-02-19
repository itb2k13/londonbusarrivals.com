import React from 'react';
import GeoLocationToggler from './GeoLocationToggler';
import StopPointSearchItem from './StopPointSearchItem';

function StopPoints(props) {

    const [result, setResult] = React.useState(null);
    const [geoLocation, setGeoLocation] = React.useState({});

    React.useEffect(() => {

        if (props.stopPointId) {
            fetch(`https://api.tfl.gov.uk/StopPoint/${props.stopPointId}`)
                .then(results => results.json())
                .then(data => {
                    setResult(data);
                });
        }
    }, [props.stopPointId]);

    return (
        <div className="">

            <GeoLocationToggler showToggle={false} setGeoLocation={setGeoLocation} />

            <div className='grid grid-cols-2 gap-1'>
                {result?.children?.map(function (d) {
                    return (d && d.stopLetter &&
                        <StopPointSearchItem item={d} geoLocation={geoLocation} />
                    )
                })}
            </div>
            <div className=' grid grid-cols-2 gap-1'>
                {result?.children?.map(x => x.children[0])?.flat().map(function (d) {
                    return (d && d.stopLetter &&
                        <StopPointSearchItem item={d} geoLocation={geoLocation} />
                    )
                })}
            </div>

        </div>
    );
}

export default StopPoints;