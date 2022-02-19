import React from 'react';
import moment from 'moment';
import NumberPlate from './NumberPlate';
import { ChevronRightIcon } from '@heroicons/react/outline';

function ArrivalsList(props) {

    const [result, setResult] = React.useState(null);

    React.useEffect(() => {

        if (props.naptanCode) {
            fetch(`https://api.tfl.gov.uk/StopPoint/${props.naptanCode}/Arrivals`)
                .catch()
                .then(results => results.json())
                .then(data => {
                    setResult(data);
                });
        }
    }, [props.naptanCode]); // <-- Have to pass in [] here!

    return (
        <div className="text-white pt-2">

            {result?.sort((a, b) => (a.timeToStation > b.timeToStation) ? 1 : ((b.timeToStation > a.timeToStation) ? -1 : 0))
                .map(function (d) {
                    return (
                        <a href={`https://tfl.gov.uk/bus/route/${d.lineName}`} target="_blank" key={d.id} rel="noreferrer">
                            <div className="border-b border-gray-600 pb-2 mb-3 flex flex-row items-center" >

                                <div>

                                    <div className="pb-1">
                                        <span className="">{d.lineName} </span>
                                        <span>towards {d.towards.replace("null", d.destinationName)} </span>
                                        <span>terminating at {d.destinationName} </span>
                                    </div>
                                    <div className="">
                                        <NumberPlate registration={d.vehicleId} />
                                        <span className="ml-1">arriving in </span>
                                        <span className="text-green-300 font-bold">{moment.duration({ "seconds": d.timeToStation }).humanize()}</span>
                                    </div>

                                </div>
                                <div>
                                    <ChevronRightIcon className="text-gray-500 w-12" />
                                </div>

                            </div>
                        </a>
                    )
                })}
        </div>
    );
}

export default ArrivalsList;