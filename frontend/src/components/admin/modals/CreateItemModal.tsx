import React, { useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

const CreateItemModal = ({ operation, onSubmit, initialValues, fields }) => {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState(initialValues);

    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData(initialValues);
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setOpenModal(false);
    };

    return (
        <div>
            {/* Mostrar diferentes botones según la operación */}
            {operation === 'update' ? (
                <Button onClick={() => setOpenModal(true)}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279" />
                    </svg>
                </Button>
            ) : (
                <Button onClick={() => setOpenModal(true)}>
                    {operation === 'update' ? 'Update' : 'Create'}
                </Button>
            )}

            <Modal show={openModal} size="md" onClose={handleCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            {operation === 'update' ? 'Update Item' : 'Create Item'}
                        </h3>
                        {fields.map((field, index) => (
                            <div key={index}>
                                <Label htmlFor={field.name} value={field.label} />
                                <TextInput
                                    id={field.name}
                                    placeholder={`Enter ${field.label}`}
                                    value={formData[field.name]}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    required
                                />
                            </div>
                        ))}
                        <Button onClick={handleSubmit}>
                            {operation === 'update' ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreateItemModal;
