import HighwayCards from '../components/HighwayCards';
import NavBar from '../components/NavBar';
import React from 'react';

function HighwayPage() {
  return (
  <>
	  <h2 className="my-3 display-3 fade-in text-center">Autostrăzi</h2>
    <hr className='hr'></hr>
    <HighwayCards />
    </>
  )
}

export default HighwayPage;
