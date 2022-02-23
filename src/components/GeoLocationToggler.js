import React from 'react';
import Toggler from '../components/forms/toggler';
import { useStore } from '../store/useStore';

function GeoLocationToggler() {

    const searchInput = useStore(state => state.searchInput) ? true : false;

    return (

        <Toggler name="enableGeo" label="Use my location" disabled={searchInput} />

    )

}

export default GeoLocationToggler;