import React from 'react';

function NumberPlate({ registration }) {

    return (
        <span className="font-plate bg-yellow rounded text-black py-1 px-1 ">
            {registration}
        </span>
    )

}

export default NumberPlate;