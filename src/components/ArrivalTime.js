import React from 'react';
import moment from 'moment';

function getColor(timeToStation) {
    if (timeToStation <= 6 * 60) return 'text-green-300';
    if (timeToStation <= 11 * 60) return 'text-yellow-400';
    return 'text-gray-300';
}

function printTime(timeToStation) {
    if (timeToStation <= 60) return `${timeToStation} seconds`;
    else return moment.duration({ "seconds": timeToStation }).humanize();
}

function ArrivalTime({ timeToStation }) {

    return (
        <span className={`${getColor(timeToStation)}`}>in {printTime(timeToStation)}</span>
    )

}

export default ArrivalTime;