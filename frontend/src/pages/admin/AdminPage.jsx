import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/layout/Sidebar'

const AdminPage = () => {

   
    return (

        <div className="flex flex-col justify-center items-center">
            <Sidebar></Sidebar>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Page</h1>
            <p className="text-gray-700 dark:text-gray-400">This is the admin page</p>
        </div>
    );
};

export default AdminPage;
