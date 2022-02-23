import React from 'react';
import moment from 'moment';

function getColor(timeToStation) {
    if (timeToStation <= 6 * 60) return 'text-green-300';
    if (timeToStation <= 11 * 60) return 'text-yellow-400';
    return 'text-gray-300';
}

function ArrivalTime({ timeToStation }) {

    return (
        <span className={`${getColor(timeToStation)}`}>{moment.duration({ "seconds": timeToStation }).humanize()}</span>
    )

}

export default ArrivalTime;