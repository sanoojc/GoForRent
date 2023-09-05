import React, { useState } from 'react'
import './Addvehicle.css'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { VehicleValidationSchema } from '../../../Validations/VehicleAddValidation';
import { Button, TextField } from '@mui/material';
import { addvehicle } from '../../../Api/AdminApi';
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function AddVehicle() {
  const presetKey = process.env.REACT_APP_Preset_KEY;
  const cloudName = process.env.REACT_APP_Cloud_Name;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(VehicleValidationSchema),
  });
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  async function handleImageUpload(e) {
    const files = e.target.files
    const uploadPromises = []
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", presetKey);
      formData.append("cloud_name", cloudName);
      const uploadPromise = axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }, withCredentials: false,
        })
      uploadPromises.push(uploadPromise)
    }
    try {
      const response = await Promise.all(uploadPromises)
      const secureUrls = response.map((res) => res.data.secure_url)
      setImages([...secureUrls])
    } catch (err) {
      console.log(err)
    }
  }
  const onSubmit = async (details) => {
    const datas = {
      details, images: images
    }
    let { data } = await addvehicle(datas)
    if (data.error) {
      toast.error(data.message)
    } else {
      toast.success(data.message)
      navigate('/admin/vehicles')
    }
  }

  return (
    <>
      <Toaster />
      <div className='add-vehicle-container'>
        <Sidebar />
        <div className="add-vehicle-form" style={{ marginLeft: '5rem' }}>
          <form onSubmit={handleSubmit(onSubmit)} >
            <label>
              <div className="">
                Name:
                <input type="file" accept='image/*' multiple onChange={handleImageUpload} />
              </div>
            </label>
            <div className="add-vehice-form">
              <div className="add-vehice-innerformbox" >
                <div>
                  <p>Hub id</p>
                  <TextField required size='small' type='string' id="outlined-required" label="Name of the hub" {...register('hubId')} />
                  {errors.hubId && <p className='text-danger'>{errors.hubId.message}</p>}
                </div>
                <div>
                  <p>Vehicle name</p>
                  <TextField required size='small' type='string' id="outlined-required" label="Vehicle name" {...register('vehicleName')} />
                  {errors.vehicleName && <p className='text-danger'>{errors.vehicleName.message}</p>}
                </div>
                <div>
                  <p>Brand</p>
                  <TextField required size='small' type='string' id="outlined-required" label="Brand name"{...register('brand')} />
                  {errors.brand && <p className='text-danger'>{errors.brand.message}</p>}
                </div>
              </div>
              <div className="add-vehice-innerformbox">
                <div>
                  <p>Year</p>
                  <TextField required size='small' type='number' id="outlined-required" label="Manufacturing year"{...register('year')} />
                  {errors.year && <p className='text-danger'>{errors.year.message}</p>}
                </div>
                <div>
                  <p>Class of vehicle</p>
                  <TextField required size='small' type='string' id="outlined-required" label="eg: premium" {...register('classOfVehicle')} />
                  {errors.classOfVehicle && <p className='text-danger'>{errors.classOfVehicle.message}</p>}
                </div>
                <div>
                  <p>Body type</p>
                  <TextField required size='small' type='string' id="outlined-required" label="eg: sedan"{...register('bodyType')} />
                  {errors.bodyType && <p className='text-danger'>{errors.bodyType.message}</p>}
                </div>
              </div>
              <div className="add-vehice-innerformbox">
                <div>
                  <p>Transmission type</p>
                  <TextField required size='small' type='string' id="outlined-required" label="Transmission type" {...register('transmission')} />
                  {errors.transmission && <p className='text-danger'>{errors.transmission.message}</p>}
                </div>
                <div>
                  <p>Fuel type</p>
                  <TextField required size='small' type='string' id="outlined-required" label="Type of fuel" {...register('fuelType')} />
                  {errors.fuelType && <p className='text-danger'>{errors.fuelType.message}</p>}
                </div>
                <div>
                  <p>No of seats</p>
                  <TextField required size='small' type='string' id="outlined-required" label="Seat capacity of the vehicle" {...register('noOfSeats')} />
                  {errors.noOfSeats && <p className='text-danger'>{errors.noOfSeats.message}</p>}
                </div>
              </div>
              <div className="add-vehice-innerformbox">
                <div>
                  Rent per day
                  <TextField required size='small' type='number' id="outlined-required" label="rent per day"{...register('rent')} />
                  {errors.rent && <p className='text-danger'>{errors.rent.message}</p>}
                </div>
              </div>
            </div>

            <Button variant='contained' type='submit'>ADD</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddVehicle