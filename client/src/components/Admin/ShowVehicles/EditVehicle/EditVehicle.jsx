import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// import { VehicleValidationSchema } from '../../../../Validations/VehicleAddValidation';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../../Sidebar/Sidebar'
import { Button } from '@mui/material';
import { editVehicleDetails, getHub } from '../../../../Api/AdminApi';
import axios from 'axios';
import BackdropLoader from '../../../Backdrop/Backdrop';


function EditVehicle() {

  const presetKey = process.env.REACT_APP_Preset_KEY;
  const cloudName = process.env.REACT_APP_Cloud_Name;

  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   resolver: yupResolver(VehicleValidationSchema),
  // });
  const location = useLocation()

  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  // Set default values from location.state
  useEffect(() => {
    setValue('hubId', location.state.hubId || '');
    setValue('vehicleName', location.state.vehicleName || '');
    setValue('brand', location.state.brand || '');
    setValue('year', location.state.year || '');
    setValue('classOfVehicle', location.state.classOfVehicle || '');
    setValue('bodyType', location.state.bodyType || '');
    setValue('transmission', location.state.transmission || '');
    setValue('fuelType', location.state.fuelType || '');
    setValue('noOfSeats', location.state.noOfSeats || '');
    setValue('vehicleNumber', location.state.vehicleNumber || '');
    setValue('rent', location.state.rent || '');
  }, [location.state, setValue]);

  const formDatas = getValues();
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [imgUrls, setImgUrls] = useState([])
  const [hubs, setHubs] = useState([])
  const [loading, setLoading] = useState(false)

  const handleImage = ((e) => {
    setImages(e.target.files)
  })

  useEffect(() => {
    (async () => {
      let { data } = await getHub()
      setHubs(data.hub)

    })()
  }, [])
  useEffect(() => {
    (async () => {
      const datas = {
        details: formDatas,
        images: imgUrls
      }
      if (imgUrls.length) {
        console.log(imgUrls)
        console.log(formDatas)
        let { data } = await editVehicleDetails(location.state._id, datas)
        if (data.error) {
          toast.error(data.message)
        } else {
          toast.success(data.message)
          navigate('/admin/vehicles')
        }
      }
    })()
  }, [imgUrls])
  const onSubmit = async (details) => {
    try {
      // setFormDatas(details)
      setLoading(true)
      if (images.length) {


        const uploadPromises = []
        for (const file of images) {
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
        const response = await Promise.all(uploadPromises)
        const secureUrls = response.map((res) => res.data.secure_url)
        setImgUrls([...secureUrls])
      } else {
        const formData = getValues()

        const datas = {
          details: formData,
          images: ''
        }
        let { data } = await editVehicleDetails(location.state._id, datas)
        if (data.error) {
          toast.error(data.message)
        } else {
          toast.success(data.message)
          navigate('/admin/vehicles')
        }
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }




  return (
    <div>
      <>
        <Toaster />
        <div className='add-vehicle-container'>
          <Sidebar />
          <div className="w-full  max-w-screen-md mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white border shadow-md rounded-lg p-4">
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-600 font-semibold">Image</label>
                <input value={location.state.vehicleImage} type="file" id="image" accept='image/*' multiple onChange={handleImage} className="border rounded-lg p-2 w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="hubId" className="block text-gray-600 font-semibold">Hub ID</label>
                  <select className=' outline-none border rounded-lg p-2 w-full' id='box' required  {...register('hubId')} >
                    <option name={location.state.hubId} value={location.state.hubId}>{location.state.hubId}</option>
                    {
                      hubs.map((item) => (
                        location.state.hubId !== item.hubName ? (
                          <option key={item.hubName} value={item.hubName}>{item.hubName}</option>
                        ) : null
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label htmlFor="vehicleName" className="block text-gray-600 font-semibold">Vehicle Name</label>
                  {/* <input onChange={editfield} value={location.state.vehicleName} required type='text' id="vehicleName" placeholder="Vehicle name" {...register('vehicleName')} className="border rounded-lg p-2 w-full" /> */}
                  <input
                    className="border rounded-lg p-2 w-full"
                    type="text"
                    id="vehicleName"
                    name="vehicleName"
                    {...register('vehicleName')}
                  />
                  {/* {errors.vehicleName && <p className='text-red-600'>{errors.vehicleName.message}</p>} */}
                  {/* {errors.vehicleName && <p className='text-red-600'>{errors.vehicleName.message}</p>} */}
                </div>
                <div>
                  <label htmlFor="brand" className="block text-gray-600 font-semibold">Brand</label>
                  <input required type='text' name='brand' id="brand" placeholder="Brand name" {...register('brand')} className="border rounded-lg p-2 w-full" />
                  {/* {errors.brand && <p className='text-red-600'>{errors.brand.message}</p>} */}
                </div>
                <div>
                  <label htmlFor="year" className="block text-gray-600 font-semibold">Year</label>
                  <input value={location.state.year} required type='number' id="year" placeholder="Manufacturing year" {...register('year')} className="border rounded-lg p-2 w-full" />
                  {/* {errors.year && <p className='text-red-600'>{errors.year.message}</p>} */}
                </div>
                <div>
                  <label htmlFor="classOfVehicle" className="block text-gray-600 font-semibold">Class of Vehicle</label>
                  <select className='outline-none border rounded-lg p-2 w-full' id='box' required  {...register('classOfVehicle')} >
                    <option name='Premium' value="Premium">Premium</option>
                    <option name='Vintage' value="Vintage">Vintage</option>
                    <option name='Normal' value="Normal">Normal</option>
                  </select>
                  {/* {errors.classOfVehicle && <p className='text-red-600'>{errors.classOfVehicle.message}</p>} */}
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
                  {/* {errors.bodyType && <p className='text-red-600'>{errors.bodyType.message}</p>} */}
                </div>
                <div>
                  <label htmlFor="transmission" className="block text-gray-600 font-semibold">Transmission Type</label>
                  <select className='outline-none border rounded-lg p-2 w-full' id='box' required  {...register('transmission')} >
                    <option name='Automatic' value="Automatic">Automatic</option>
                    <option name='Manual' value="Manual">Manual</option>
                    <option name='AMT' value="AMT">AMT</option>
                  </select>
                  {/* {errors.transmission && <p className='text-red-600'>{errors.transmission.message}</p>} */}
                </div>
                <div>
                  <label htmlFor="fuelType" className="block text-gray-600 font-semibold">Fuel Type</label>
                  <select className='outline-none border rounded-lg p-2 w-full' id='box' required  {...register('fuelType')} >
                    <option name='Petrol' value="Petrol">Petrol</option>
                    <option name='Diesel' value="Diesel">Diesel</option>
                    <option name='EV' value="EV">EV</option>
                  </select>
                  {/* {errors.fuelType && <p className='text-red-600'>{errors.fuelType.message}</p>} */}
                </div>
                <div>
                  <label htmlFor="noOfSeats" className="block text-gray-600 font-semibold">Number of Seats</label>
                  <input value={location.state.noOfSeats} required type='number' id="noOfSeats" placeholder="Seat capacity of the vehicle" {...register('noOfSeats')} className="border rounded-lg p-2 w-full" />
                  {/* {errors.noOfSeats && <p className='text-red-600'>{errors.noOfSeats.message}</p>} */}
                </div>
                <div>
                  <label htmlFor="rent" className="block text-gray-600 font-semibold">Vehicle Number</label>
                  <input value={location.state.vehicleNumber} required type='string' id="rent" placeholder="KL XX XXXX" {...register('vehicleNumber')} className="border rounded-lg p-2 w-full" />
                  {/* {errors.vehicleNumber && <p className='text-red-600'>{errors.vehicleNumber.message}</p>} */}
                </div>
                <div>
                  <label htmlFor="rent" className="block text-gray-600 font-semibold">Rent per Day</label>
                  <input required type='number' id="rent" name='rent' placeholder="Rent per day" {...register('rent')} className="border rounded-lg p-2 w-full" />
                  {/* {errors.rent && <p className='text-red-600'>{errors.rent.message}</p>} */}
                </div>
              </div>
              <div className="flex justify-center mt-5 uppercase">
                <Button variant='contained' type='submit' size='large'>Save</Button>
              </div>
            </form>
          </div>
        </div>
        <BackdropLoader openLoader={loading} />
      </>
    </div>
  )
}

export default EditVehicle