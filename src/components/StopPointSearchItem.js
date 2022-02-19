import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../bus.svg';
import Haversine from './Haversine';
import { LocationMarkerIcon } from '@heroicons/react/solid';

function CompassPoint(c) {

    if (c === "N") return "North";
    if (c === "NE") return "North East";
    if (c === "S") return "South";
    if (c === "SE") return "South East";
    if (c === "E") return "East";
    if (c === "W") return "West";
    if (c === "SW") return "South West";
    if (c === "NW") return "North West";

    return "";
}

function Towards(item) {
    return item.additionalProperties?.find(x => x.key === "Towards")?.value || item.towards;
}

function StopPointSearchItem({ item, geoLocation }) {

    return (

        <div className="cursor-pointer"  >
            <Link to={`/arrivals/${item.id}`}>

                <div className="bg-white rounded-t border-b-8 border-red-600 h-14 items-center grid grid-cols-3">
                    <div></div>
                    <div>
                        <img className="w-3/4 m-auto" src={Logo} alt="tfl-logo" /></div>

                    {item.stopLetter &&
                        <div className="text-right">
                            <button className="text-center shadow-lg hover:bg-red-500 focus:shadow-outline bg-red-600 text-white  w-10 h-10 mr-1 cursor-pointer rounded-full border-2 border-red-400 " >{item.stopLetter}</button>
                        </div>
                    }
                </div>

                <div className=" text-white text-center justify-center  border-white  flex-grow flex flex-col items-center">
                    <div className="bg-gray-700 w-full flex justify-center items-center h-20 p-2">

                        {item.commonName || item.name}

                    </div>
                    {Towards(item) &&
                        <>
                            <div className="text-xs bg-gray-300 text-black w-full">
                                <span>{CompassPoint(item.additionalProperties?.find(x => x.key === "CompassPoint")?.value)} </span>
                                <span>Towards</span>
                            </div>
                            <div className="text-xs h-10 pb-1  bg-gray-300 text-black font-medium w-full flex items-center justify-center">
                                {Towards(item)}
                            </div>
                        </>
                    }
                    <div className="grid grid-cols-5 gap-1 bg-white py-2 px-1 w-full text-xs  uppercase text-black">

                        {Array.from(new Set(item?.lineModeGroups?.find(x => x.modeName === "bus")?.lineIdentifier?.concat(item?.lines?.map((d) => d.name?.toLowerCase()))))?.map(function (d) {
                            return (
                                <div className="h-8 w-8 border border-gray-300 flex items-center justify-center bg-white p-1" key={d}>
                                    {d}
                                </div>
                            )
                        })}


                    </div>
                </div>
            </Link>
            <div className="flex py-1 bg-gray-100 rounded-b text-sm justify-center items-center text-red-600">
                {geoLocation?.timestamp && <LocationMarkerIcon className="h-4 w-4 mr-1" />}
                <Haversine distance={item.distance} geoLocation={geoLocation} coordinate={{ latitude: item.lat, longitude: item.lon }} />
            </div>

        </div>
    )

}

export default StopPointSearchItem;