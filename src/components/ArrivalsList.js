import React from 'react';
import NumberPlate from './NumberPlate';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { useStore } from '../store/useStore';
import ArrivalTime from './ArrivalTime';


function ArrivalsList(props) {

    const [result, setResult] = React.useState(null);
    const stopPoint = useStore(state => state.stopPoint);
    const maxArrivalTime = parseInt(useStore(state => state.MaxArrivalTime) || 0);

    React.useEffect(() => {

        if (props.naptanCode) {
            fetch(`https://api.tfl.gov.uk/StopPoint/${props.naptanCode}/Arrivals`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    setResult(data || []);
                });
        }
    }, [props.naptanCode]);

    return (
        <div className="text-white pt-2">

            {stopPoint?.commonName && result?.length > 0 &&
                <div className='mb-2 text-xl'>Next arrivals at <span className="text-green-300">{stopPoint.commonName}</span></div>
            }

            {stopPoint?.commonName && !result?.length &&
                <div className='mb-2 text-xl'>TFL arrival info found for <span className="text-green-300">{stopPoint.commonName}</span> is not available</div>
            }

            {result?.filter(x => (x.timeToStation <= maxArrivalTime * 60) || maxArrivalTime === 0)
                .sort((a, b) => (a.timeToStation > b.timeToStation) ? 1 : ((b.timeToStation > a.timeToStation) ? -1 : 0))
                .map(function (d) {
                    return (
                        <a href={`https://tfl.gov.uk/bus/route/${d.lineName}?direction=${d.direction}`} target="_blank" key={d.id} rel="noreferrer">
                            <div className="h-24 border-b border-gray-600 pb-2 mb-3 flex flex-row items-center" >

                                <div className="w-full">

                                    <div className="pb-1 flex flex-row items-center">
                                        <div className="  text-sm  w-60 flex flex-col items-center">
                                            <div className="font-plate border border-gray-400 text-xl bg-black rounded p-1 w-10 h-10 mb-1 justify-center flex items-center">{d.lineName}</div>
                                            <div>{d.modeName === "bus" && <NumberPlate registration={d.vehicleId} />}</div>
                                            <div><ArrivalTime timeToStation={d.timeToStation} /></div>
                                        </div>
                                        <div className="text-sm w-full">
                                            {((d.towards === "null" && d.destinationName) || (d.towards && d.towards !== "null")) &&
                                                <span>Towards {d.towards.replace("null", d.destinationName)} </span>
                                            }
                                            <span>terminating at {d.destinationName} </span>


                                        </div>
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