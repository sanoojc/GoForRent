import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Button, TextField } from '@mui/material'
import { addCategory } from '../../../Api/AdminApi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function AddCategories() {
  const [categoryName,setCategoryName]=useState('')
  const navigate=useNavigate()
  const handleCategory=async()=>{
    console.log(categoryName)
    if(categoryName.trim()===''){
    }else{
      let {data}=await addCategory(categoryName)
      if(data.error){
        toast.error(data.message)
      }else{
        toast.success(data.message)
        navigate('/admin/categories')
      }

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
          <TextField id="outlined-basic" type='text' variant="outlined" size='small' placeholder='category name' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} />
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