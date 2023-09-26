import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-hot-toast';
import HubTable from './HubTable'
import { useNavigate } from 'react-router-dom';

function Hubs() {
    const navigate = useNavigate()

    return (
        <div className='pl-20 pr-10'>
            <Sidebar />
            <div className="flex justify-center pb-5">
                <h2>HUBS</h2>
            </div>
            <div className="p-3 d-flex justify-end">
                <Button variant='outlined' onClick={() => navigate('/admin/addHub')} >Add hub</Button>
            </div>

            <HubTable />
        </div>
    );
}

export default Hubs;
