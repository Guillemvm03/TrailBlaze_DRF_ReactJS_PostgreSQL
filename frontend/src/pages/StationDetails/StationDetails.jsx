import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useStations } from "../../hooks/useStations";
import SlotList from "../../components/client/Stations/Slots/SlotList";
import { Button, Label, Card, TextInput } from 'flowbite-react';
import Modal from '../../components/notifications/Modal';
import { useNotifications } from "../../hooks/useNotifications";

const StationDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { useGetOneStation, oneStation } = useStations();
  const { createNotification } = useNotifications();

  const [title, setTitle] = useState('Problema');
  const [description, setDescription] = useState('He tenido un problema con la bike');
  const [status, setStatus] = useState('Active');
  const [toUser, setToUser] = useState('');

  useEffect(function () {
    useGetOneStation(slug);
  }, []);

  function create() {
    const incidentData = {
        title,
        description,
        status,
        station: oneStation.id
    };
    createNotification(incidentData)
}

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1 className="text-5xl font-extrabold dark:text-white">
        {oneStation.station_name}
        <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
          \ {oneStation.address}
        </small>
        <Modal settings={{titleButton: "Create incident"}} sendData={() => create()}>
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
        {/* {oneStation.id} */}
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
      </h1>
      <br /><br /><br />
      <div className="flex items-center mt-4 space-x-4"></div>
      <div
        role="status"
        className="space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >

        <div className="flex items-center justify-center w-full h-72 rounded sm:w-96">
          <img className="w-96 h-72" src={oneStation.image} alt="image description" />
        </div>



        <div className="w-full">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas nulla totam aut cupiditate aliquid facilis repellat magni tempore a quasi iusto in rerum, distinctio perspiciatis praesentium sed nobis accusantium odit!

        </div>

        <span className="sr-only">Loading...</span>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="">
        <h2 className="text-center text-4xl font-bold dark:text-white">Slots Available</h2>
        <SlotList />
      </div>
    </div>
    // useGetOneStation.length > 0 ? <SlotList station= /> : <p>loading...</p>
  );
};

export default StationDetails;
