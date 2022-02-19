
import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import Input from '../components/forms/input';
import GeoLocationToggler from '../components/GeoLocationToggler';
import StopPointSearch from '../components/StopPointSearch';

function Search() {

  const [searchInput, setSearchInput] = useLocalStorage("searchInput", "");
  const [geoLocation, setGeoLocation] = React.useState({});

  return (

    <div className="flex m-auto">
      <div className="flex flex-col w-full">
        <div className="w-full ">
          <div className="text-white mb-2">Enter bus stop name or 5-digit bus stop code:</div>
          <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <GeoLocationToggler showToggle={true} setGeoLocation={setGeoLocation} />
        </div>
        <StopPointSearch searchInput={searchInput} geoLocation={geoLocation} />
      </div>
    </div>

  );
}

export default Search;
