import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";
import Error from "./components/Error.jsx";
import { fetchAvailablePlaces, updateUserPlaces } from "./http.js";

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  //fetch available Places from backend API

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((postion) => {
          const lat = postion.coords.latitude;
          const lng = postion.coords.longitude;
          const sortPlaces = sortPlacesByDistance(places, lat, lng);
          setAvailablePlaces(sortPlaces);
          setIsFetching(false);
        });
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

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(id) {
    let place;
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      place = availablePlaces.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    try {
      await updateUserPlaces([place, ...availablePlaces]);
    } catch (error) {
      setAvailablePlaces(availablePlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places.",
      });
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);
  }, []);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }
  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>
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
