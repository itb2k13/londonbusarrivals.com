import React from 'react';
import NumberPlate from './NumberPlate';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { useStore } from '../store/useStore';
import { useInterval } from "react-timers-hooks";
import ArrivalTime from './ArrivalTime';
import StopPointLabel from './StopPointLabel';

function findNextArrival(data) {
    return data?.sort((a, b) => (a.timeToStation > b.timeToStation) ? 1 : ((b.timeToStation > a.timeToStation) ? -1 : 0))?.find(x => x) || null;
}

function ArrivalsList(props) {

    const [timerCount, setTimerCount] = React.useState(0);
    const [nextArrival, setNextArrival] = React.useState(0);
    const [result, setResult] = React.useState(null);
    const stopPoint = useStore(state => state.stopPoint);
    const maxArrivalTime = parseInt(useStore(state => state.MaxArrivalTime) || 0);

    useInterval(() => { if ((!nextArrival || nextArrival.timeToStation <= 60) && timerCount <= 50) setTimerCount(timerCount + 1); }, 5000);
    useInterval(() => { if ((!nextArrival || nextArrival.timeToStation > 60) && timerCount <= 50) setTimerCount(timerCount + 1); }, 60000);

    React.useEffect(() => {

        if (props.naptanCode) {
            fetch(`https://api.tfl.gov.uk/StopPoint/${props.naptanCode}/Arrivals`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    setResult(data || []);
                    setNextArrival(findNextArrival(data || []));
                });
        }

    }, [props.naptanCode, timerCount]);

    return (
        <div className="text-white pt-2">

            {nextArrival?.platformName && result?.length > 0 &&
                <div className='mb-2'>
                    <span>Next arrivals at </span>
                    <span className="text-green-300">{nextArrival.stationName} </span>

                    {nextArrival?.modeName === "bus" &&
                        <StopPointLabel stopLetter={nextArrival.platformName} />
                    }

                </div>
            }

            {!result?.length &&
                <div className='mb-2 text-xl flex justify-center'>
                    No arrivals info found
                </div>
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
                                            {d.modeName === "bus" &&
                                                <>
                                                    <div className="font-plate border border-gray-400 text-xl bg-black rounded p-1 w-10 h-10 mb-1 justify-center flex items-center">{d.lineName}</div>
                                                    <div>{d.modeName === "bus" && <NumberPlate registration={d.vehicleId} />}</div>
                                                </>
                                            }
                                            {d.modeName !== "bus" &&
                                                <span>{d.lineName}</span>
                                            }
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