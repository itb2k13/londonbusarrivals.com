
import React, { useRef } from 'react';
import Input from '../components/forms/input';
import GeoLocationToggler from '../components/GeoLocationToggler';
import StopPointSearch from '../components/StopPointSearch';
import { XIcon } from '@heroicons/react/solid';
import { useStore } from '../store/useStore';

function useFocus() {
  const htmlElRef = useRef(null)
  const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

  return [htmlElRef, setFocus]
}

function Search() {

  const [inputRef, setInputFocus] = useFocus();
  const setSearchInput = useStore(state => state.setSearchInput);
  const searchInput = useStore(state => state.searchInput);

  return (

    <div className="flex m-auto">
      <div className="flex flex-col w-full">
        <div className="w-full ">
          <div className="text-white mb-2">Enter stop name, postcode or 5-digit bus stop code:</div>
          <div className="absolute text-gray-400 right-0 mr-2 mt-4 cursor-pointer" onClick={() => { setSearchInput(""); setInputFocus(); }}><XIcon className="w-10" /></div>
          <Input value={searchInput} inputRef={inputRef} onChange={(e) => { setSearchInput(e.target.value); }} />
          <GeoLocationToggler />
        </div>
        <StopPointSearch radius={225} />
      </div>
    </div>

  );
}

export default Search;
