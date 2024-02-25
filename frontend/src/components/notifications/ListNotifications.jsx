import React, { useState } from 'react';
import { Button, Label, Card, TextInput } from 'flowbite-react';
import Modal from './Modal';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

const ListNotifications = ({ notifications, createNotification, createResponse, deleteNotification }) => {

    console.log(notifications);
    const { user } = useAuth();

    const [title, setTitle] = useState('Problema');
    const [description, setDescription] = useState('He tenido un problema con la bike');
    const [status, setStatus] = useState('Active');
    const [toUser, setToUser] = useState('');

    function create() {
        const incidentData = {
            title,
            description,
            status,
            to_user: parseInt(toUser)
        };
        createNotification(incidentData)
    }

    function deleteIncident(id) {
        deleteNotification(id)
    }

    function response(id) {
        const responseData = {
            id,
            title,
            description,
            status,
            to_user: parseInt(toUser)
        };
        createResponse(responseData)
    }

    return (
        <div className='container' >
            <h1 className='mb-3'>Notifications</h1>
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
                    {user.role == 'Admin' && (
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="toUser" value="To User" />
                            </div>
                            <TextInput
                                id="toUser"
                                placeholder="To User"
                                value={toUser}
                                onChange={(event) => setToUser(event.target.value)}
                                required
                            />
                        </div>
                    )}
                </div>
            </Modal>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-3'>
                {notifications.map((notification) => (
                    <Card key={notification.id}>
                        <div>
                            <Modal key={notification.id} settings={{ type: "delete", titleButton: "Delete", color: "failure" }} sendData={() => deleteIncident(notification.id)}>
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this incident?
                                </h3>
                            </Modal>
                        </div>

                        <div className="">
                            <h2 className="text-lg font-bold mb-2">{notification.title}</h2>
                            <p className="text-sm text-gray-600 mb-3">{notification.description}</p>
                            <p className="text-xs text-gray-500">Date: {notification.date}</p>
                            <p className="text-xs text-gray-500">Read: {notification.is_read ? 'Yes' : 'No'}</p>
                            <p className="text-xs text-gray-500">Status: {notification.status}</p>
                            <p className="text-xs text-gray-500">Created by: {notification.user.role}</p>

                            {notification.response && (
                                <div className="p-3 mt-3">
                                    <h3 className="text-lg font-bold mb-2">Response</h3>
                                    <p className="text-sm text-gray-600 mb-3">{notification.response.title}</p>
                                    <p className="text-xs text-gray-500">Date: {notification.response.date}</p>
                                    <p className="text-xs text-gray-500">Status: {notification.response.status}</p>
                                    <p className="text-xs text-gray-500">Created by: {notification.response.user.role}</p>
                                </div>
                            )}
                            {!notification.response && (notification.user.role !== user.role) && (
                                <Modal key={notification.id + 'res'} settings={{ type: "create", titleButton: "Response" }} sendData={() => { setToUser(notification.user.id); response(notification.id); }}>
                                    <div className="space-y-6 text-start mb-3">
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Response a Incident</h3>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="title" value="Title" />
                                            </div>
                                            <TextInput
                                                id="title"
                                                placeholder="Response Title"
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
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ListNotifications;
