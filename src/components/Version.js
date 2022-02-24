import React from 'react';
import pkg from '../../package.json';

function Version() {

    return (
        <span>{pkg.version}</span>
    )

}

export default Version;