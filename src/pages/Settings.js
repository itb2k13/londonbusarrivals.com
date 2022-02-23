
import React from 'react';
import RangeSlider from '../components/forms/rangeslider';
import Toggler from '../components/forms/toggler';
function Settings() {

  return (
    <div className="text-white">
      <div className="text-4xl border-b border-gray-600 mb-3">Settings</div>
      <div className="grid grid-cols-1 gap-2 items-center">
        <div>Search distance at my location (in meters)</div>
        <div><RangeSlider name="MaxSearchRadius" min={10} max={500} step={10} /></div>
        <div>Maximum arrival time to show (in minutes)</div>
        <div><RangeSlider name="MaxArrivalTime" min={0} max={120} step={5} /></div>
        <div>Maximum search results to show (# items)</div>
        <div><RangeSlider name="MaxSearchResults" min={0} max={50} step={2} /></div>
        <div>Show rail station entrances</div>
        <div> <Toggler name="ShowRailEntrances" /></div>

      </div>
    </div>
  );
}

export default Settings;
