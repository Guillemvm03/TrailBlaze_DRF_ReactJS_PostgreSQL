import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStations } from "../../../hooks/useStations";
import { useAuth } from "../../../hooks/useAuth";
import { useNotifications } from '../../../hooks/useNotifications';
import Modal from '@/components/notifications/Modal';
import { Button, Label, Card, TextInput } from 'flowbite-react';

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  BicyclingLayer,
} from "@react-google-maps/api";
import secrets from "../../../secrets";

const ProfilePage = () => {
  const [mapL, setMapL] = useState(0);
  const [mapLN, setMapLN] = useState(0);
  const { createNotification } = useNotifications();
  const [title, setTitle] = useState('Problema');
  const [description, setDescription] = useState('He tenido un problema con la bike');
  const [status, setStatus] = useState('Active');
  const [toUser, setToUser] = useState('');


  const [price, setPrice] = useState(0.25);

  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prevPrice) => prevPrice + 0.5);
    }, 10000); 

    return () => clearInterval(interval);
  }, []); 

  const formatCurrency = (amount) => {

    return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setMapL(position.coords.latitude);
      setMapLN(position.coords.longitude);
    },
    (error) => {
      console.log(error.message);
      
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );

  const center = {
    lat: mapL,
    lng: mapLN,
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


  function create() {
    const incidentData = {
        title,
        description,
        status,
        rent: user.rent.id
    };
    createNotification(incidentData)
}

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const formatStartDate = (startDate) => {
    const date = new Date(startDate);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
    return formattedDate;
  };


  return isLoaded ? (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <GoogleMap
              zoom={13}
              center={center}
              onLoad={onLoad}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "40%", height: "400px" }}
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
              <Marker
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  strokeColor: "#D1DBE8",
                  strokeWeight: 5,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                }}
                key={"kwsjvdj"}
                position={{ lat: parseFloat(mapL), lng: parseFloat(mapLN) }}
              ></Marker>
            </GoogleMap>

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Your Rental Details
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                Your Bike
              </h1>
              {user.rent.start_rent}
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan.
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Status</span>
                  <p><b>{user.rent.status}</b></p>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Start Date</span>
                  <p><b>{formatStartDate(user.rent.start_date)}</b></p>                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900 me-3">
                {formatCurrency(price)} 
                </span>
                {/* notify incidence */}


                  <Modal sendData={() => create()}>
                <div className="space-y-6 text-start mb-3">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create a Incident</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Title" />
                        </div>
                        <TextInput
                            id="title"
                            placeholder="Incident Title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <TextInput
                            id="description"
                            placeholder="Incident Description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="status" value="Status" />
                        </div>
                        <TextInput
                            id="status"
                            placeholder="Incident Status"
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            required
                        />
                    </div>

                    
                    
                </div>
            </Modal>



              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
    
  ) : (
    <></>
  );
};

export default ProfilePage;
