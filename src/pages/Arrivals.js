
import React from 'react';
import { useParams } from "react-router-dom";
import ArrivalsList from '../components/ArrivalsList';
import StopPoints from '../components/StopPoints';

function Arrivals() {

  let params = useParams();

  return (
    <div className="">
      <StopPoints stopPointId={params.id} />
      <ArrivalsList naptanCode={params.id} />
    </div>
  );
}

export default Arrivals;
