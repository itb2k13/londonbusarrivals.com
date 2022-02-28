import React from 'react';

function StopPointLabel({ stopLetter }) {

    return (
        <>
            {stopLetter &&

                <button className="font-tfl text-center shadow-lg bg-red-600 text-white  w-10 h-10 mr-1 rounded-full border-2 border-red-400 " >{stopLetter}</button>

            }
        </>
    )

}

export default StopPointLabel;