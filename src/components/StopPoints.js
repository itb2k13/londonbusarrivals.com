import React from 'react';
import StopPointSearchItem from './StopPointSearchItem';
import { useStore } from '../store/useStore';

function StopPoints(props) {

    const [result, setResult] = React.useState(null);
    const geoLocation = useStore(state => state.geoLocation);
    const showRailEntrances = useStore(state => state.ShowRailEntrances || false);
    const setStopPoint = useStore(state => state.setStopPoint);

    React.useEffect(() => {

        if (props.stopPointId) {
            fetch(`https://api.tfl.gov.uk/StopPoint/${props.stopPointId}`)
                .then(results => results.json())
                .then(data => {
                    setResult(data);
                    setStopPoint(data);
                });
        }

    }, [props.stopPointId, setStopPoint]);

    return (
        <div className="">

            <div className='grid grid-cols-2 gap-2'>
                {result?.children?.map(function (d) {

                    return (d && d.stopLetter && (d.stopType !== "NaptanRailEntrance" || showRailEntrances) &&
                        <StopPointSearchItem key={d.id} item={d} geoLocation={geoLocation} />
                    )
                })}

                {result?.children?.map(x => x.children)?.flat().map(function (d) {

                    return (d && d.stopLetter &&
                        <StopPointSearchItem key={d.id} item={d} geoLocation={geoLocation} />
                    )
                })}
            </div>

        </div>
    );
}

export default StopPoints;