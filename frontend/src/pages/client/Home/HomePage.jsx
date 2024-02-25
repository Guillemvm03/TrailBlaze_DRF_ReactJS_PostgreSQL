import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  BicyclingLayer,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

import secrets from "../../../secrets";
import { useStations } from "../../../hooks/useStations";

const containerStyle = {
  width: "auto",
  height: "400px",
};

const HomePage = () => {
  const [mapL, setMapL] = useState(0);
  const [mapLN, setMapLN] = useState(0);

  const icons = {
    bike: {
      icon: "https://maps.google.com/mapfiles/kml/shapes/cycling.png",
    },
    user: {
      icon: "https://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png",
    },
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setMapL(position.coords.latitude);
      setMapLN(position.coords.longitude);
    },
    (error) => {
      console.log(error.message);
      alert(error.message);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );

  const navigate = useNavigate();
  const { stations } = useStations();
  const _stations = [...stations];

  const center = {
    lat: 38.822144580642735,
    lng: -0.6070638618184431,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: secrets.API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // const handleOnLoad = (map) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   markers.forEach(({ position }) => bounds.extend(position));
  //   map.fitBounds(bounds);
  // };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const redirects = {
    details: (slug) => navigate("/stations/" + slug),
  };

  //     return (
  //         <div>

  //         </div>
  //     )

  return isLoaded ? (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            We invest in the world’s potential
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>
      <GoogleMap
        zoom={13}
        center={{ lat: 38.822144580642735, lng: -0.6070638618184431 }}
        // onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={containerStyle}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          styles: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {_stations.map(({ id, station_name, lat, lng, slug, image }) => (
          <Marker
            icon={{
              url: icons.bike.icon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            key={id}
            position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow
                onCloseClick={() => setActiveMarker(null)}
                options={{ pixelOffset: new window.google.maps.Size(0, -30) }} // Ajusta la posición vertical del InfoWindow
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{station_name}</h3>
                  <img
                    src={image}
                    alt="Foto de la estación"
                    className="mx-auto mt-2 w-full h-auto max-h-20 object-cover rounded-lg" 
                    />
                  <button
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" // Estilos para el botón
                    onClick={() => redirects.details(slug)}
                  >
                    Ver detalles
                  </button>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
        <Marker
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10, 
            strokeColor: '#D1DBE8', 
            strokeWeight: 5, 
            fillColor: '#4285F4', 
            fillOpacity:1
          }}
          key={"kwsjvdj"}
          position={{ lat: parseFloat(mapL), lng: parseFloat(mapLN) }}
        ></Marker>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default HomePage;
