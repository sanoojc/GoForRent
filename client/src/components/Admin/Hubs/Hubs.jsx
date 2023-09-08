import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button, TextField } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { toast } from 'react-hot-toast';
import { useGeolocated } from 'react-geolocated';
import { HubValidationSchema } from '../../../Validations/HubValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addHub } from '../../../Api/AdminApi';

function Hubs() {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });
    const [location, setLocation] = useState({})

    const handleLocation = () => {
        if (!isGeolocationAvailable) {
            toast.error('Your browser does not support Geolocation');
        } else if (!isGeolocationEnabled) {
            toast.error('Geolocation is not enabled');
        } else if (!coords) {
            toast.promise(
                {
                    success: 'Success',
                    error: 'Something wrong'
                });
        } else {
            setLocation(coords)
        }
    };
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(HubValidationSchema)
    })
    const submit = async (details) => {
        console.log(location)
        let hubData = { ...details, longitude: location.longitude, latitude: location.latitude }
        let { data } = await addHub(hubData)
        setLocation({})
        if (data.error) {
            toast.error(data.message)
        } else {
            toast.success(data.message)
        }

    }

    return (
        <div className='pl-20'>
            <Sidebar />
            <form onSubmit={handleSubmit(submit)}>

                <div className="">
                    <p>Hub Name : </p>
                    <TextField id="outlined-basic" type='string' variant="outlined" size='small' {...register('hubName')} />
                    {errors.hubName && <p className='text-red-500' >{errors.hubName.message}</p>}
                </div>
                <div className="">
                    <p>Hub Location : </p>
                    <Button variant='outlined' size='large' onClick={handleLocation}>
                        add location  <MyLocationIcon />
                    </Button>
                </div>
                {
                    (location.longitude && location.latitude) && (<Button variant='contained' type='submit' >save</Button>)

                }
            </form>
        </div>
    );
}

export default Hubs;
