import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import BackdropLoader from '../Backdrop/Backdrop'
import toast, { Toaster } from 'react-hot-toast'
import { uploadProof } from '../../Api/UserApi'
import axios from 'axios'
import { useDispatch } from 'react-redux'

export default function AddProof({ close, user }) {
    const dispatch=useDispatch()
    const [licenseNumber, setLicenseNumber] = useState('')
    const [licenseFrontImage, setLicenseFrontImage] = useState('')
    const [licenseBackImage, setLicenseBackImage] = useState('')
    const [idType, setIdType] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [idFrontImage, setIdFrontImage] = useState('')
    const [idBackImage, setIdBackImage] = useState('')
    const [open, setOpen] = useState(false)

    const presetKey = process.env.REACT_APP_Preset_KEY;
    const cloudName = process.env.REACT_APP_Cloud_Name;
    useEffect(() => {
        if (user.details.licenseImage.length || user.details.idImage.length) {
            setLicenseNumber(user.details.licenseNumber)
            setLicenseFrontImage(user.details.licenseImage[0])
            setLicenseBackImage(user.details.licenseImage[1])
            setIdType(user.details.idType)
            setIdNumber(user.details.idNumber)
            console.log(user.details.idNumber)
            setIdFrontImage(user.details.idImage[0])
            setIdBackImage(user.details.idImage[1])
        }
    }, [])

    async function uploadImage(file) {
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

    const handleSubmit = async () => {
        if (licenseNumber.trim() == '' || ! idNumber || !idType) {
            toast.error('Fill all fields')
        } else if (!licenseFrontImage || !licenseBackImage || !idFrontImage || !idBackImage) {
            toast.error('Upload all images')
        }
        else {
            setOpen(true)
            let licenseFrontUrl,licenseBackUrl,idFrontUrl,idBackUrl
            if(licenseFrontImage!=user.details.licenseImage[0]){
                licenseFrontUrl = await uploadImage(licenseFrontImage)
            }else{
                licenseFrontUrl=licenseFrontImage
            }
            if(licenseBackImage!=user.details.licenseImage[1]){
                 licenseBackUrl = await uploadImage(licenseBackImage)
            }else{
                licenseBackUrl=licenseBackImage
            }
            if(idFrontImage!=user.details.idImage[0]){
                idFrontUrl = await uploadImage(idFrontImage)
            }else{
                idFrontUrl=idFrontImage
            }
            if(idBackImage!=user.details.idImage[1]){
                idBackUrl = await uploadImage(idBackImage)
            }else{
                idBackUrl=idBackImage
            }
            const { data } = await uploadProof({ licenseNumber, licenseFrontUrl, licenseBackUrl, idType, idNumber, idFrontUrl, idBackUrl })
            setOpen(false)
            if(data.error){
                toast.error(data.message)
            }else{
                toast.success(data.message)
                dispatch({type:'refresh'})
                close()
            }

        }
    }

    async function handleLicenseFront(e) {
        setLicenseFrontImage(e.target.files[0])
    }
    async function handleLicenseBack(e) {
        setLicenseBackImage(e.target.files[0])
    }
    return (
        <AnimatePresence>
            <BackdropLoader openLoader={open} />
            <Toaster />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 2 }}
                className='fixed w-full h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
                <div className=" bg-white p-10 border w-5/6 sm:w-2/4 mb-20 rounded-lg shadow-md h-3/4 overflow-y-scroll">
                    <div className=" flex justify-end">
                        <h2 onClick={close} className='border-2 px-2 rounded-full hover:cursor-pointer hover:bg-slate-500 hover:text-white ' >X</h2>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 font-bold">
                        <label htmlFor="">License Number</label>
                        <input onChange={(e) => setLicenseNumber(e.target.value)} value={licenseNumber} className='border rounded-md pl-2 pt-2' type="text" />
                        <div className="p-3 border rounded-md mt-1">
                            <label className='flex justify-center font-bold text-lg' htmlFor="">License Image</label>
                            <div className=" px-2 flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <label className='pl-5 pb-2' htmlFor="">Front</label>
                                    <input onChange={handleLicenseFront} className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                                </div>
                                <input
                                    type="text"
                                    value={licenseFrontImage ? licenseFrontImage : ''}
                                    readOnly
                                    className='pl-2 pt-2 border rounded-md'
                                />
                                <div className="flex flex-col">
                                    <label className='pl-5 pb-2' htmlFor="">Back</label>
                                    <input onChange={handleLicenseBack} className='border rounded-md pl-2 pt-2  ' type="file" accept='image/*' />
                                </div>
                                <input
                                    type="text"
                                    value={licenseBackImage ? licenseBackImage : ''}
                                    readOnly
                                    className='pl-2 pt-2 border rounded-md'
                                />
                            </div>
                        </div>

                        <label className='py-2' htmlFor="">ID Type</label>
                        <select onChange={(e) => setIdType(e.target.value)} className='border rounded-md h-12 px-2' value={idType} name="" id="">
                            <option value="Aadhar">Aadhar</option>
                            <option value="VoterID">Voter ID</option>
                        </select>
                        <label htmlFor="">ID Number</label>
                        <input onChange={(e) => setIdNumber(e.target.value)} value={idNumber} className='border rounded-md' type="text" />
                        <div className=" p-3 border rounded-md mt-1">
                            <label className='flex justify-center' htmlFor="">Image</label>
                            <div className="flex flex-col gap-2">
                                <label className='pl-5 pb-2' htmlFor="">Front</label>
                                <input onChange={(e) => setIdFrontImage(e.target.files[0])} className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                                <input
                                    type="text"
                                    value={idFrontImage ? idFrontImage : ''}
                                    readOnly
                                    className='pl-2 pt-2 border rounded-md'
                                />
                                <label className='pl-5 pb-2' htmlFor="">Back</label>
                                <input onChange={(e) => setIdBackImage(e.target.files[0])} className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                                <input
                                    type="text"
                                    value={idBackImage ? idBackImage : ''}
                                    readOnly
                                    className='pl-2 pt-2 border rounded-md'
                                />
                            </div>
                        </div>
                        <div className="flex justify-center pt-3">
                            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                ADD
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>

    )
}
