import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload } from '@mui/icons-material'
import BackdropLoader from '../Backdrop/Backdrop'
import axios from 'axios'
import { editUser } from '../../Api/UserApi'
import { useDispatch } from 'react-redux'

function EditProfileModal({ user, close }) {
    const dispatch=useDispatch()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(user.details.name)
    const [profile, setProfile] = useState('')
    const fileInputRef = useRef(null)
    const presetKey = process.env.REACT_APP_Preset_KEY
    const cloudName = process.env.REACT_APP_Cloud_Name
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress)
    })
    const handleKeyPress = (e) => {
        if (e.key === "Escape") {
            close()
        }
    }
    const handleImageChange = () => {
        fileInputRef.current.click()
    }

    const UploadData = async (e) => {
        e.preventDefault()
        setOpen(true)
        if(profile){
            const file = profile
            const formData = new FormData()
            formData.append("file", file)
            formData.append("upload_preset", presetKey)
            formData.append("cloud_name", cloudName)
            const profileImg = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }, withCredentials: false,
                })
            console.log(profileImg, 'profile response')
            const profileUrl = profileImg.data.secure_url
            console.log(profileUrl, 'profileUrl')
            const details = {
                id: user.details._id,
                name,
                profileUrl
            }
            const { data } = await editUser(details)
            console.log(data)
        }else{
            const details = {
                id: user.details._id,
                name,
                profileUrl:''
            }
            const { data } = await editUser(details)
            console.log(data)
        }
        setOpen(false)
        dispatch({type:'refresh'})
        close()

    }
    return (
        <AnimatePresence>
            <BackdropLoader openLoader={open} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 2 }}
                className='fixed w-full min-h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
                <div className=" bg-white w-2/4 p-20 border shadow-lg rounded-xl">
                    <div className="">
                        <div className=" flex justify-end ">
                            <button onClick={close} className='text-3xl border bg-slate-600 text-white px-2 rounded-full'>X</button>
                        </div>
                        <form onSubmit={UploadData} className='flex flex-col gap-3'>
                            <label className='font-bold text-2xl' htmlFor="">Change Profile</label>
                            <input className='' hidden type="file" id='fileInput' onChange={(e) => setProfile(e.target.files[0])} ref={fileInputRef} accept='image/*' />
                            <div className="flex justify-center rounded-full overflow-hidden" onClick={handleImageChange}>
                                <img src={user.details.profile} alt="image" />
                            </div>
                            <label className='font-bold text-2xl' htmlFor="">Name</label>
                            <input className='border rounded-md pt-2 pl-2' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <button type='submit' className='border bg-red-500 py-2 rounded-md text-white font-bold text-xl'>EDIT</button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default EditProfileModal