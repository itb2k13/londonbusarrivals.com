import React from 'react';

function StopPointLabel({ stopLetter }) {

    return (
        <>
            {stopLetter &&

                <button className="text-center shadow-lg hover:bg-red-500 focus:shadow-outline bg-red-600 text-white  w-10 h-10 mr-1 cursor-pointer rounded-full border-2 border-red-400 " >{stopLetter}</button>

            }
        </>
    )

}

export default StopPointLabel;