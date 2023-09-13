import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Button, TextField } from '@mui/material'
import { addCategory } from '../../../Api/AdminApi'
import axios from 'axios'


function AddCategories() {
  const [categoryName,setCategoryName]=useState('')
  const [image,setImage]=useState('')
  const presetKey = process.env.REACT_APP_Preset_KEY;
  const cloudName = process.env.REACT_APP_Cloud_Name;

  async function handleImageUpload(e) {
    const file = e.target.files[0]
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", presetKey);
      formData.append("cloud_name", cloudName);
       axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }, withCredentials: false,
        }).then((res)=>{
          console.log(res.data.secure_url,'url....')
          setImage(res.data.secure_url)
        }).catch ((err)=>{
      console.log(err)
    })
  }
  const handleCategory=async()=>{
    if(!categoryName.trim()===''&&!image.trim()===''){
      const details={categoryName,image}
      let {data}=await addCategory(details)
    }
  }
  return (
    <div>
      <Sidebar />
      <h1 className='d-flex justify-center pb-10'>Add category</h1>
      <div className="d-flex  justify-center ">
        <div className=" p-5 w-80 border rounded-lg d-flex flex-col align-center ">
        <div className="">
          <p>Category Name : </p>
          <TextField id="outlined-basic" type='string' variant="outlined" size='small' placeholder='category name' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} />
        </div>
        <div className="pt-3">
          <p>Base image : </p>
          <input id="outlined-basic" type='file'  accept='image/*' placeholder='category name' onChange={handleImageUpload} />
        </div>
        <div className=" p-3 d-flex justify-center">
          <Button variant='contained' onClick={handleCategory}>Add</Button>
        </div>

        </div>
      </div>
    </div>
  )
}

export default AddCategories