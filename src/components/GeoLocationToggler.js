import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import Toggler from '../components/forms/toggler';
import GeoLocation from '../components/GeoLocation';

function GeoLocationToggler({ setGeoLocation, showToggle }) {

    const [enableGeo, setEnableGeo] = useLocalStorage("enableGeo", false);

    return (
        <div>

            {showToggle &&
                <Toggler defaultChecked={enableGeo} onChange={setEnableGeo} />
            }

            {JSON.parse(enableGeo) ?
                <GeoLocation setGeoLocation={setGeoLocation} />
                : ''
            }

        </div>
    )

}

export default GeoLocationToggler;