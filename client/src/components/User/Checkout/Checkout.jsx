import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DetailsValidationSchema } from '../../../Validations/UserDetailsValidations';
import axios from 'axios';
import { checkoutVerification, paymentVerification } from '../../../Api/UserApi';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BackdropLoader from '../../Backdrop/Backdrop';

function Checkout() {
  const location = useLocation()
  const [noOfDays, setNoOfDays] = useState()
  const [total, setTotal] = useState(0)
  const [licenseImage, setLicenseImage] = useState()
  const [idImage, setIdImage] = useState()
  const [openLoading, setOpenLoading] = useState(false);
  const presetKey = process.env.REACT_APP_Preset_KEY;
  const cloudName = process.env.REACT_APP_Cloud_Name;
  const navigate=useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(DetailsValidationSchema)
  })

  async function handleIdImageUpload(e) {
    setIdImage(e.target.files[0])
  }

  async function handleLicenceImageUpload(e) {
    setLicenseImage(e.target.files[0])
  }
  console.log('response data')

  function handleRazorPay(order,details) {
      try{

    
    const options = {
      key:process.env.REACT_APP_RAZOR_PAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "GoForRent",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
       
        const { data } = await paymentVerification({
          response,
          details
        });
        if (data.err) {
          toast.error(data.message);
        } else {
          toast.success("Payment SuccessFull");
          navigate("/profile");
        }
      },
      theme:{
        color: '#cf4848'
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", (response) => {
      toast.error("Payment Failed");
    });
  }catch(err){
    console.log(err)
  }
  }

  useEffect(() => {
    const start = new Date(location.state.checkIn)
    const end = new Date(location.state.checkOut)
    const timeDifference = end.getTime() - start.getTime()
    setNoOfDays(Math.floor(timeDifference / (1000 * 60 * 60 * 24)))
    setTotal((Math.floor(timeDifference / (1000 * 60 * 60 * 24))) * location.state.vehicle.rent)
  }, [])
  async function submit(formDatas) {
    try {
      console.log('submit......')
      setOpenLoading(true)
      if (idImage && licenseImage) {
        const file = licenseImage
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", presetKey);
        formData.append("cloud_name", cloudName);
        const licenseImg = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }, withCredentials: false,
          })
        console.log(licenseImg, 'licenseImage response')
        const licenseUrl = licenseImg.data.secure_url
        console.log(licenseUrl)

        const idfile = idImage
        const idformData = new FormData();
        idformData.append("file", idfile);
        idformData.append("upload_preset", presetKey);
        idformData.append("cloud_name", cloudName);
        const idImg = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          idformData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }, withCredentials: false,
          })
        console.log(idImg, 'idImage response')
        const idUrl = idImg.data.secure_url
        console.log(idUrl)

        const details = {
          formDatas,
          licenseImage: licenseImg.data.secure_url,
          idImage: idImg.data.secure_url,
          amount: total,
          vehicleData:location.state
        }
        setOpenLoading(false)
        let { data } = await checkoutVerification({total})
        if (data.error) {
          toast.error(data.message)
        } else {
          toast.success(data.message)
          handleRazorPay(data.order,details)
        }
      }
      else {
        setOpenLoading(false)
        toast.error('imges not added')
      }

    } catch (err) {
      console.log(err,err.message)
    }
  }
  return (
    <>
      <div>
        <Toaster />
        <Header />
        <div className="flex justify-center pt-4">
          <h1>Checkout</h1>
        </div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col justify-center md:flex-row h-auto ">
            <div className=" flex justify-center items-center md:ml-5  md:w-1/2 px-4 py-6">
              <form action="" className="space-y-4 w-3/4 border shadow-sm border-blue-100 p-5 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Add License</h2>
                <div className="mb-3">
                  <label className="text-base font-semibold" htmlFor="licenseFile">
                    Upload License File
                  </label>
                  <input
                    required
                    type="file"
                    accept="image/*"
                    id="licenseFile"
                    onChange={handleLicenceImageUpload}
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="">
                  <label className="text-base font-semibold" htmlFor="licenseNumber">
                    License Number
                  </label>
                  {errors.licenseNumber ? (
                    <>
                      <input
                        required
                        type="text"
                        id="licenseNumber"
                        className="w-full px-2 py-1  rounded-md focus outline-red-500 focus:ring"
                        placeholder="License Number"
                        {...register('licenseNumber')}

                      />
                      <p className='text-red-500'>{errors.licenseNumber ? errors.idType.message : "\u00a0"}</p>

                    </>
                  ) : (
                    <>
                      <input
                        required
                        type="text"
                        id="licenseNumber"
                        className="w-full px-2 py-1 border rounded-md"
                        placeholder="License Number"
                        {...register('licenseNumber')}
                      />
                      <p className='text-red-500'>{errors.licenseNumber ? errors.idType.message : "\u00a0"}</p>
                    </>
                  )}
                </div>
                <div className="mb-2">
                  <h2 className="text-xl font-semibold">Add ID Card</h2>
                </div>
                <div className="mb-3">
                  <label className="text-base font-semibold" htmlFor="idType">
                    ID Type
                  </label>

                  {errors.idType ? (
                    <>
                      <input
                        required
                        type="text"
                        id="licenseNumber"
                        className="w-full px-2 py-1  rounded-md focus outline-red-500 focus:ring"
                        placeholder="idType"
                        {...register('idType')}
                      />
                      <p className='text-red-500'>{errors.idType ? errors.idType.message : "\u00a0"}</p>
                    </>
                  ) : (
                    <>
                      <input
                        required
                        type="text"
                        id="idType"
                        className="w-full px-2 py-1 border rounded-md"
                        placeholder="idType"
                        {...register('idType')}
                      />
                      <p>{errors.idType ? errors.idType.message : "\u00a0"}</p>
                    </>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-base font-semibold" htmlFor="idNumber">
                    ID Number
                  </label>
                  {errors.idNumber ? (
                    <>
                      <input
                        required
                        type="text"
                        id="idNumber"
                        className="w-full px-2 py-1  rounded-md focus outline-red-500 focus:ring"
                        placeholder="ID Number"
                        {...register('idNumber')}
                      />
                      <p className='text-red-500'>{errors.idNumber ? errors.idNumber.message : "\u00a0"}</p>
                    </>
                  ) : (
                    <>
                      <input
                        required
                        type="text"
                        id="idNumber"
                        className="w-full px-2 py-1 border rounded-md"
                        placeholder="ID Number"
                        {...register('idNumber')}
                      />
                      <p className='text-red-500'>{errors.idNumber ? errors.idNumber.message : "\u00a0"}</p>
                    </>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-base font-semibold" htmlFor="idImage">
                    Upload ID Image
                  </label>
                  <input
                    required
                    type="file"
                    accept="image/*"
                    id="idImage"
                    onChange={handleIdImageUpload}
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
              </form>
            </div>

            <div className="w-full md:w-1/2 py-5 flex flex-col justify-center items-center">
              <div className="w-96 m-5 p-5 h-auto flex flex-col gap-3 shadow-md rounded-md border-2 border-blue-100">
                <h3 className='pb-2 text-xl flex items-center'><DirectionsCarIcon className="mr-2" /> {location.state.vehicle.vehicleName}</h3>
                <div className="">
                  <h5 className='pb-2 text-lg'>Rental Period</h5>
                  <div className='pl-2 flex gap-2'>
                    <span className='border rounded-md p-1'>{location.state.checkIn}</span>
                    <span className='border-2  rounded-md p-1 '>{location.state.checkOut}</span>
                  </div>
                </div>
                <p className="text-lg">Days: {noOfDays}</p>
                <p className="text-lg">Rent (per day): {location.state.vehicle.rent}</p>
                <h4 className="text-xl font-bold">Total: <CurrencyRupeeIcon />{total}</h4>
              </div>
              <div className="flex justify-center">
                <button onClick={handleSubmit(submit)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                  Proceed
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>

      <BackdropLoader openLoader={openLoading} />

    </>
  )
}

export default Checkout