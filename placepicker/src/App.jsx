import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  //fetch available Places from backend API

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/placessss");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Faild to fetch data");
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message ||
            "Could not fetch places , please try againg later.",
        });
      }

      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      const lat = postion.coords.latitude;
      const lng = postion.coords.longitude;
      const sortPlaces = sortPlacesByDistance(availablePlaces, lat, lng);
      setAvailablePlaces(sortPlaces);
    });
  }, []);
  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = availablePlaces.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);
  }, []);
  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        {error && <Error title="An error occurred" message={error.message} />}
        {!error && (
          <Places
            title="Available Places"
            isLoading={isFetching}
            loadingText="Fetching Places data..."
            places={availablePlaces}
            fallbackText="Sorting places by distance..."
            onSelectPlace={handleSelectPlace}
          />
        )}
      </main>
    </>
  );
}

export default App;
