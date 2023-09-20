import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { VehicleValidationSchema } from '../../../../Validations/VehicleAddValidation';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../../Sidebar/Sidebar'
import { Button} from '@mui/material';


function EditVehicle() {
  
  const presetKey = process.env.REACT_APP_Preset_KEY;
  const cloudName = process.env.REACT_APP_Cloud_Name;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(VehicleValidationSchema),
  });
    const location=useLocation()
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
    <div>
         <>
      <Toaster />
      <div className='add-vehicle-container'>
        <Sidebar />
        <div className="w-full max-w-screen-md mx-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white border shadow-md rounded-lg p-4">
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-600 font-semibold">Image</label>
              <input value={location.state.vehicleImage} type="file" id="image" accept='image/*' multiple onChange={handleImageUpload} className="border rounded-lg p-2 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="hubId" className="block text-gray-600 font-semibold">Hub ID</label>
                <input value={location.state.hubId} required type='string' id="hubId" placeholder="Name of the hub" {...register('hubId')} className="border rounded-lg p-2 w-full" />
                {errors.hubId && <p className='text-red-600'>{errors.hubId.message}</p>}
              </div>
              <div>
                <label htmlFor="vehicleName" className="block text-gray-600 font-semibold">Vehicle Name</label>
                <input value={location.state.vehicleName} required type='string' id="vehicleName" placeholder="Vehicle name" {...register('vehicleName')} className="border rounded-lg p-2 w-full" />
                {errors.vehicleName && <p className='text-red-600'>{errors.vehicleName.message}</p>}
              </div>
              <div>
                <label htmlFor="brand" className="block text-gray-600 font-semibold">Brand</label>
                <input  value={location.state.brand}  required type='string' id="brand" placeholder="Brand name" {...register('brand')} className="border rounded-lg p-2 w-full" />
                {errors.brand && <p className='text-red-600'>{errors.brand.message}</p>}
              </div>
              <div>
                <label htmlFor="year" className="block text-gray-600 font-semibold">Year</label>
                <input value={location.state.year}  required type='number' id="year" placeholder="Manufacturing year" {...register('year')} className="border rounded-lg p-2 w-full" />
                {errors.year && <p className='text-red-600'>{errors.year.message}</p>}
              </div>
              <div>
                <label htmlFor="classOfVehicle" className="block text-gray-600 font-semibold">Class of Vehicle</label>
                <input value={location.state.classOfVehicle}  required type='string' id="classOfVehicle" placeholder="e.g., premium" {...register('classOfVehicle')} className="border rounded-lg p-2 w-full" />
                {errors.classOfVehicle && <p className='text-red-600'>{errors.classOfVehicle.message}</p>}
              </div>
              <div>
                <label htmlFor="bodyType" className="block text-gray-600 font-semibold">Body Type</label>
                <input value={location.state.bodyType}  required type='string' id="bodyType" placeholder="e.g., sedan" {...register('bodyType')} className="border rounded-lg p-2 w-full" />
                {errors.bodyType && <p className='text-red-600'>{errors.bodyType.message}</p>}
              </div>
              <div>
                <label htmlFor="transmission" className="block text-gray-600 font-semibold">Transmission Type</label>
                <input value={location.state.transmission}  required type='string' id="transmission" placeholder="Transmission type" {...register('transmission')} className="border rounded-lg p-2 w-full" />
                {errors.transmission && <p className='text-red-600'>{errors.transmission.message}</p>}
              </div>
              <div>
                <label htmlFor="fuelType" className="block text-gray-600 font-semibold">Fuel Type</label>
                <input value={location.state.fuelType}  required type='string' id="fuelType" placeholder="Type of fuel" {...register('fuelType')} className="border rounded-lg p-2 w-full" />
                {errors.fuelType && <p className='text-red-600'>{errors.fuelType.message}</p>}
              </div>
              <div>
                <label htmlFor="noOfSeats" className="block text-gray-600 font-semibold">Number of Seats</label>
                <input value={location.state.noOfSeats}  required type='number' id="noOfSeats" placeholder="Seat capacity of the vehicle" {...register('noOfSeats')} className="border rounded-lg p-2 w-full" />
                {errors.noOfSeats && <p className='text-red-600'>{errors.noOfSeats.message}</p>}
              </div>
              <div>
                <label htmlFor="rent" className="block text-gray-600 font-semibold">Vehicle Number</label>
                <input value={location.state.vehicleNumber}  required type='string' id="rent" placeholder="KL xx" {...register('vehicleNumber')} className="border rounded-lg p-2 w-full" />
                {errors.vehicleNumber && <p className='text-red-600'>{errors.vehicleNumber.message}</p>}
              </div>
              <div>
                <label htmlFor="rent" className="block text-gray-600 font-semibold">Rent per Day</label>
                <input value={location.state.rent}  required type='number' id="rent" placeholder="Rent per day" {...register('rent')} className="border rounded-lg p-2 w-full" />
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
    </div>
  )
}

export default EditVehicle