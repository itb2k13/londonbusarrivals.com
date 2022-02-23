import React from 'react';
import moment from 'moment';
import NumberPlate from './NumberPlate';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { useStore } from '../store/useStore';


function ArrivalsList(props) {

    const [result, setResult] = React.useState(null);
    const stopPoint = useStore(state => state.stopPoint);

    React.useEffect(() => {

        if (props.naptanCode) {
            fetch(`https://api.tfl.gov.uk/StopPoint/${props.naptanCode}/Arrivals`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    setResult(data || []);
                });
        }
    }, [props.naptanCode]); // <-- Have to pass in [] here!

    return (
        <div className="text-white pt-2">

            {stopPoint?.commonName && result?.length > 0 &&
                <div className='mb-2 text-xl'>Next arrivals at <span className="text-green-300">{stopPoint.commonName}</span></div>
            }

            {stopPoint?.commonName && !result?.length &&
                <div className='mb-2 text-xl'>TFL arrival info found for <span className="text-green-300">{stopPoint.commonName}</span> is not available</div>
            }

            {result?.sort((a, b) => (a.timeToStation > b.timeToStation) ? 1 : ((b.timeToStation > a.timeToStation) ? -1 : 0))
                .map(function (d) {
                    return (
                        <a href={`https://tfl.gov.uk/bus/route/${d.lineName}?direction=${d.direction}`} target="_blank" key={d.id} rel="noreferrer">
                            <div className="h-24 border-b border-gray-600 pb-2 mb-3 flex flex-row items-center" >

                                <div className="w-full">

                                    <div className="pb-1">
                                        <span className="">{d.lineName} </span>
                                        <span>towards {d.towards.replace("null", d.destinationName)} </span>
                                        <span>terminating at {d.destinationName} </span>
                                    </div>
                                    <div className="">
                                        {d.modeName === "bus" && <NumberPlate registration={d.vehicleId} />}
                                        <span className="">arriving in </span>
                                        <span className="text-green-300 font-bold">{moment.duration({ "seconds": d.timeToStation }).humanize()}</span>
                                    </div>

                                </div>
                                <div className="w-16">
                                    <ChevronRightIcon className="text-gray-500 " />
                                </div>

                            </div>
                        </a>
                    )
                })}
        </div>
    );
}

export default ArrivalsList;