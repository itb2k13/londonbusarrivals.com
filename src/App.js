import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Search from './pages/Search';
import Arrivals from './pages/Arrivals';
import FetchProgressBar from './components/FetchProgressBar';
import GeoLocation from './components/GeoLocation';
import { useStore } from './store/useStore';

function App() {

  const enableGeo = useStore(state => state.enableGeo);

  return (

    <div className=" p-2">
      <FetchProgressBar />
      {enableGeo && <GeoLocation />}
      <Routes >
        <Route path="/" element={<Search />} />
        <Route path="arrivals/:id" element={<Arrivals />} />
      </Routes>
    </div>

  );
}

export default App;
