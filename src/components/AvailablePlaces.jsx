import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Errorpage from './Errorpage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from './Http.js';

localStorage.getItem('places');
export default function AvailablePlaces({ onSelectPlace, onConfirm }) {
  const [AvailablePlaces, setAvailablePlaces] = useState([]);
  const [IsFetching, setIsFetching] = useState(true);
  const [error, SetError] = useState('')
  useEffect(() => {

    async function fetchPlaces() {
     
      try {
       const places= await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(places,
            position.coords.latitude,
            position.coords.altitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
         });

       
      } catch (error) {
        SetError({ message: error.message || "Couldn't Fetch places right now, please try again later..." });
        setIsFetching(false);
      }


    }
    fetchPlaces();
  }, [])

  if (error) {
    return <Errorpage title="Error Occured!" message={error.message} onConfirm={onConfirm} />
  }


  return (
    <Places
      title="Available Places"
      places={AvailablePlaces}
      fallbackText="No places available."
      loadingText="Fetching place data..."
      isLoading={IsFetching}
      onSelectPlace={onSelectPlace}
    />
  );
}