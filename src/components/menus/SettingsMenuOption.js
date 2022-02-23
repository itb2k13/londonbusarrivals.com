
import React from 'react';
import { CogIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

function SettingsMenuOption() {

  return (
    <span className="">
      <Link to="/settings">
        <CogIcon className="w-8" />
      </Link>
    </span>
  );
}

export default SettingsMenuOption;
