import React from 'react';
import { useStore } from '../../store/useStore';

function RangeSlider(props) {

    const setSetting = useStore(state => state.setSetting);
    const value = useStore(state => state[props.name] || 0);

    return (
        <div className="flex items-center">
            <div className="w-full">
                <input type="range" onChange={(e) => { setSetting(props.name, e.target.value); }} min={props.min} step={props.step} max={props.max} value={value} className="w-full h-2 bg-blue-100 appearance-none" />
            </div>
            <div className="border border-4 border-gray-400 font-bold rounded text-white text-xl w-16 h-16 items-center justify-center flex p-2">{value}</div>
        </div>
    )
}

export default RangeSlider;
