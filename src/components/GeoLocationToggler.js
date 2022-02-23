import React from 'react';
import Toggler from '../components/forms/toggler';
import { useStore } from '../store/useStore';

function GeoLocationToggler() {

    const setEnableGeo = useStore(state => state.setEnableGeo);
    const enableGeo = useStore(state => state.enableGeo);
    const searchInput = useStore(state => state.searchInput) ? true : false;

    return (
        <div>
            <Toggler disabled={searchInput} defaultChecked={enableGeo} onChange={setEnableGeo} />
        </div>
    )

}

export default GeoLocationToggler;