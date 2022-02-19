
import React, { useRef } from 'react';
import useLocalStorage from 'react-use-localstorage';
import Input from '../components/forms/input';
import GeoLocationToggler from '../components/GeoLocationToggler';
import StopPointSearch from '../components/StopPointSearch';
import { XIcon } from '@heroicons/react/solid';

function useFocus() {
  const htmlElRef = useRef(null)
  const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

  return [htmlElRef, setFocus]
}

function Search() {

  const [searchInput, setSearchInput] = useLocalStorage("searchInput", "");
  const [geoLocation, setGeoLocation] = React.useState({});
  const [inputRef, setInputFocus] = useFocus();

  return (

    <div className="flex m-auto">
      <div className="flex flex-col w-full">
        <div className="w-full ">
          <div className="text-white mb-2">Enter bus stop name or 5-digit bus stop code:</div>
          <div className="absolute text-gray-400 right-0 mr-2 mt-4" onClick={() => { setSearchInput(""); setInputFocus(); }}><XIcon className="w-10" /></div>
          <Input value={searchInput} inputRef={inputRef} onChange={(e) => { setSearchInput(e.target.value); }} />
          <GeoLocationToggler showToggle={true} setGeoLocation={setGeoLocation} />
        </div>
        <StopPointSearch searchInput={searchInput} geoLocation={geoLocation} />
      </div>
    </div>

  );
}

export default Search;
