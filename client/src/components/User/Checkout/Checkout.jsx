import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { format } from 'date-fns'
import { useLocation, useNavigate} from 'react-router-dom'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import axios from 'axios';
import { checkoutVerification, paymentVerification } from '../../../Api/UserApi';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BackdropLoader from '../../Backdrop/Backdrop';
import { useDispatch, useSelector } from 'react-redux';

function Checkout() {
  const location = useLocation()
  const { user } = useSelector((state) => state)
  const [noOfDays, setNoOfDays] = useState()
  const [fromDay, setFromDay] = useState()
  const [toDay, setToDay] = useState()
  const [total, setTotal] = useState(0)

  const [licenseNumber, setLicenseNumber] = useState('')
  const [licenseFrontImage, setLicenseFrontImage] = useState('')
  const [licenseBackImage, setLicenseBackImage] = useState('')
  const [idType, setIdType] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [idFrontImage, setIdFrontImage] = useState('')
  const [idBackImage, setIdBackImage] = useState('')
  const [openLoading, setOpenLoading] = useState(false);

  const presetKey = process.env.REACT_APP_Preset_KEY;
  const cloudName = process.env.REACT_APP_Cloud_Name;
  const dispatch=useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const startDate = new Date(location.state.checkIn);
    const endDate = new Date(location.state.checkOut);
    const start = format(startDate, 'dd/MM/yyyy');
    const end = format(endDate, 'dd/MM/yyyy');
    setFromDay(start)
    setToDay(end)
    const timeDifference = endDate.getTime() - startDate.getTime()
    setNoOfDays(Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1)
    setTotal(((Math.floor(timeDifference / (1000 * 60 * 60 * 24))) + 1) * location.state.vehicle.rent)
  }, [])

  async function handleLicenseFront(e) {
    setLicenseFrontImage(e.target.files[0])
  }
  async function handleLicenseBack(e) {
    setLicenseBackImage(e.target.files[0])
  }

  function handleRazorPay(order, details) {
    try {
      const options = {
        key: process.env.REACT_APP_RAZOR_PAY_KEY_ID,
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
            dispatch({type:'refresh'})
          }
        },
        theme: {
          color: '#cf4848'
        }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", (response) => {
        toast.error("Payment Failed");
      });
    } catch (err) {
      console.log(err)
    }
  }
  async function uploadImage(file){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
    formData.append("cloud_name", cloudName);
    const image = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }, withCredentials: false,
      })
    console.log(image, 'image response')
    const imageUrl = image.data.secure_url
    console.log(imageUrl)
    return imageUrl
  }


  async function submit() {
    try {

      setOpenLoading(true)
      if (idFrontImage && idBackImage && licenseFrontImage && licenseBackImage){
       const licenseFrontUrl=await uploadImage(licenseFrontImage)
       console.log('sucess',licenseFrontUrl)
       const licenseBackUrl=await uploadImage(licenseBackImage)
       const idFrontUrl=await uploadImage(idFrontImage)
       const idBackUrl=await uploadImage(idBackImage)

        const details = {
          licenseNumber,
          licenseFrontUrl,
          licenseBackUrl,
          idType,
          idNumber,
          idFrontUrl,
          idBackUrl,
          amount: total,
          vehicleData: location.state
        }
        setOpenLoading(false)
        const { data } = await checkoutVerification({ total })
        if (data.error) {
          toast.error(data.message)
        } else {
          toast.success(data.message)
          handleRazorPay(data.order, details)
          
        }
      }
      else {
        setOpenLoading(false)
        toast.error('imges not added')
      }

    } catch (err) {
      console.log(err, err.message)
    }
  }
  const handleCheck = (e) => {
    if (e.target.value == 'yes') {
      setChecked(true)
    } else {
      setChecked(false)
    }
    console.log(checked)
  }
  const handleCheckout = async() => {
    if (user.licenseImage && user.idImage) {
      const { data } = await checkoutVerification({ total })
        if (data.error) {
          toast.error(data.message)
        } else {
          toast.success(data.message)
          handleRazorPay(data.order, details)
        }
    } else {
      if(licenseNumber.trim()===''||idType.trim()===''||idNumber.trim()===''){
        toast.error('Fill all the fields')
      }else if(!licenseFrontImage|| !licenseBackImage || !idFrontImage || !idBackImage){
        toast.error('Upload all images')
      }else{
        submit()
      }
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
            {
              !user.details.licenseImage && !user.details.idImage &&
              (
                <div className=" flex justify-center items-center md:ml-5  md:w-1/2 px-4 py-6">

                  <form className="space-y-4 w-full border shadow-sm border-blue-100 p-5 rounded-md">
                    <>
                      <h2 className="text-xl text-center font-semibold mb-4">ADD DETAILS</h2>
                      <div className="mb-3">
                        {/* <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div> */}


                      </div>
                      <div className="flex flex-col gap-2 sm:gap-3 font-bold">
                        <label htmlFor="">License Number</label>
                        <input onChange={(e)=>setLicenseNumber(e.target.value)} className='border rounded-md' type="text" />
                        <div className="p-3 border rounded-md mt-1">
                            <label className='flex justify-center font-bold text-lg' htmlFor="">License Image</label>
                            <div className=" px-2 flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <label className='pl-5 pb-2' htmlFor="">Front</label>
                                    <input onChange={handleLicenseFront} className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                                </div>
                                <div className="flex flex-col">
                                    <label className='pl-5 pb-2' htmlFor="">Back</label>
                                    <input onChange={handleLicenseBack} className='border rounded-md pl-2 pt-2  ' type="file" accept='image/*' />
                                </div>
                            </div>
                        </div>

                        <label className='py-2' htmlFor="">ID Type</label>
                        <select onChange={(e)=>setIdType(e.target.value)} className='border rounded-md h-12 px-2' value={idType} name="" id="">
                            <option value="Aadhar">Aadhar</option>
                            <option value="VoterID">Voter ID</option>
                        </select>
                        <label htmlFor="">ID Number</label>
                        <input onChange={(e)=>setIdNumber(e.target.value)} className='border rounded-md' type="text" />
                        <div className=" p-3 border rounded-md mt-1">
                            <label className='flex justify-center' htmlFor="">Image</label>
                            <div className="flex flex-col gap-2">
                                <label className='pl-5 pb-2' htmlFor="">Front</label>
                                <input onChange={(e)=>setIdFrontImage(e.target.files[0])} className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                                <label className='pl-5 pb-2' htmlFor="">Back</label>
                                <input onChange={(e)=>setIdBackImage(e.target.files[0])} className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                            </div>
                        </div>
                    </div>
                    </>
                  </form>
                </div>
              )}

            <div className="w-full md:w-1/2  flex flex-col justify-start items-center">
              <div className="w-96 m-4 p-5 h-auto flex flex-col gap-3 shadow-md rounded-md border-2 border-blue-100">
                <h3 className='pb-2 text-xl flex items-center'><DirectionsCarIcon className="mr-2" /> {location.state.vehicle.vehicleName}</h3>
                <div className="">
                  <h5 className='pb-2 text-lg'>Rental Period</h5>
                  <div className='pl-2 flex gap-2'>
                    <span className='border rounded-md p-1'>{fromDay}</span>
                    <span className='border-2  rounded-md p-1 '>{toDay}</span>
                  </div>
                </div>
                <p className="text-lg">Days: {noOfDays}</p>
                <p className="text-lg">Rent (per day): {location.state.vehicle.rent}</p>
                <h4 className="text-xl font-bold">Total: <CurrencyRupeeIcon />{total}</h4>
              </div>
              <div className="flex justify-center">
                <button onClick={handleCheckout} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
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