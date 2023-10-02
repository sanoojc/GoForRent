import React, { useEffect, useState } from 'react'
import './Addvehicle.css'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { VehicleValidationSchema } from '../../../Validations/VehicleAddValidation';
import { Button} from '@mui/material';
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { addvehicleData, getHub } from '../../../Api/AdminApi';

export default function AddVehicle() {
  const presetKey = process.env.REACT_APP_Preset_KEY;
  const cloudName = process.env.REACT_APP_Cloud_Name;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(VehicleValidationSchema),
  });
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [hubs, setHubs] = useState([])
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
    let { data } = await addvehicleData(datas)
    if (data.error) {
      toast.error(data.message)
    } else {
      toast.success(data.message)
      navigate('/admin/vehicles')
    }
  }
  useEffect(()=>{
    (async()=>{
      let {data}=await getHub()
      setHubs(data.hub)

    })()
  },[])

  return (
    <>
      <Toaster />
      <div className='add-vehicle-container'>
        <Sidebar />
        <div className="w-full max-w-screen-md mx-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white border shadow-md rounded-lg p-4">
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-600 font-semibold">Image</label>
              <input type="file" id="image" accept='image/*' multiple onChange={handleImageUpload} className="border rounded-lg p-2 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="hubId" className=" block text-gray-600 font-semibold">Hub ID</label>
                <select className=' outline-none border rounded-lg p-2 w-full' id='box' required  {...register('hubId')} >
                 {
                  hubs.map((item)=>(

                    <option name={item.hubName} value={item.hubName}>{item.hubName}</option>
                  ))
                 }
                </select>
                {errors.hubId && <p className='text-red-600'>{errors.hubId.message}</p>}
              </div>
              <div>
                <label htmlFor="vehicleName" className="block text-gray-600 font-semibold">Vehicle Name</label>
                <input required type='string' id="vehicleName" placeholder="Vehicle name" {...register('vehicleName')} className="border rounded-lg p-2 w-full" />
                {errors.vehicleName && <p className='text-red-600'>{errors.vehicleName.message}</p>}
              </div>
              <div>
                <label htmlFor="brand" className="block text-gray-600 font-semibold">Brand</label>
                <input required type='string' id="brand" placeholder="Brand name" {...register('brand')} className="border rounded-lg p-2 w-full" />
                {errors.brand && <p className='text-red-600'>{errors.brand.message}</p>}
              </div>
              <div>
                <label htmlFor="year" className="block text-gray-600 font-semibold">Year</label>
                <input required type='number' id="year" placeholder="Manufacturing year" {...register('year')} className="border rounded-lg p-2 w-full" />
                {errors.year && <p className='text-red-600'>{errors.year.message}</p>}
              </div>
              <div>
                <label htmlFor="classOfVehicle" className="block text-gray-600 font-semibold">Class of Vehicle</label>
                <select className='outline-none border rounded-lg p-2 w-full' id='box' required  {...register('classOfVehicle')} >
                  <option name='Premium' value="Premium">Premium</option>
                  <option name='Vintage' value="Vintage">Vintage</option>
                  <option name='Normal' value="Normal">Normal</option>
                </select>
                {errors.classOfVehicle && <p className='text-red-600'>{errors.classOfVehicle.message}</p>}
              </div>
              <div>
                <label htmlFor="bodyType" className="block text-gray-600 font-semibold">Body Type</label>
                <select className='outline-none border rounded-lg p-2 w-full' id='box' required  {...register('bodyType')} >
                  <option name='Hatchback' value="Hatchback">Hatchback</option>
                  <option name='Sedan' value="Sedan">Sedan</option>
                  <option name='Coupe' value="Coupe">Coupe</option>
                  <option name='Suv' value="Suv">Suv</option>
                  <option name='Sports car' value="Sports car">Sports car</option>
                </select>
                {errors.bodyType && <p className='text-red-600'>{errors.bodyType.message}</p>}
              </div>
              <div>
                <label htmlFor="transmission" className="block text-gray-600 font-semibold">Transmission Type</label>
                <select className='outline-none border rounded-lg p-2 w-full' id='box' required  {...register('transmission')} >
                  <option name='Automatic' value="Automatic">Automatic</option>
                  <option name='Manual' value="Manual">Manual</option>
                  <option name='AMT' value="AMT">AMT</option>
                </select>
                {errors.transmission && <p className='text-red-600'>{errors.transmission.message}</p>}
              </div>
              <div>
                <label htmlFor="fuelType" className="block text-gray-600 font-semibold">Fuel Type</label>
                <select className='outline-none border rounded-lg p-2 w-full' id='box' required  {...register('fuelType')} >
                  <option name='Petrol' value="Petrol">Petrol</option>
                  <option name='Diesel' value="Diesel">Diesel</option>
                  <option name='EV' value="EV">EV</option>
                </select>
                                {errors.fuelType && <p className='text-red-600'>{errors.fuelType.message}</p>}
              </div>
              <div>
                <label htmlFor="noOfSeats" className="block text-gray-600 font-semibold">Number of Seats</label>
                <input required type='number' id="noOfSeats" placeholder="Seat capacity of the vehicle" {...register('noOfSeats')} className="border rounded-lg p-2 w-full" />
                {errors.noOfSeats && <p className='text-red-600'>{errors.noOfSeats.message}</p>}
              </div>
              <div>
                <label htmlFor="rent" className="block text-gray-600 font-semibold">Vehicle Number</label>
                <input required type='string' id="rent" placeholder="KL xx" {...register('vehicleNumber')} className="border rounded-lg p-2 w-full" />
                {errors.vehicleNumber && <p className='text-red-600'>{errors.vehicleNumber.message}</p>}
              </div>
              <div>
                <label htmlFor="rent" className="block text-gray-600 font-semibold">Rent per Day</label>
                <input required type='number' id="rent" placeholder="Rent per day" {...register('rent')} className="border rounded-lg p-2 w-full" />
                {errors.rent && <p className='text-red-600'>{errors.rent.message}</p>}
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <Button variant='contained' type='submit' size='large'>ADD</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

