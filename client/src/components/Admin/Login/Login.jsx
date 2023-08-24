import React, { useState } from 'react'
import axios from 'axios'

function Login() {
    const [name,addName]=useState('')
    const [email,addEmail]=useState('')
    const [password,addPassword]=useState('')
    function setName(e){
        addName(e.target.value)
    }
    function setEmail(e){
        addEmail(e.target.value)
    }
    function setPassword(e){
        addPassword(e.target.value)
    }
    async function add(e){
        e.preventDefault()
        let {data}=await axios.post('/admin/login ',{name,email,password})
        if(data.error){
            console.log(data.message)
        }else{
            console.log('success')
        }
    }
  return (
    <div>
        <input type="text" onChange={setName} placeholder='name' value={name}  />
        <input type="email" onChange={setEmail}  placeholder='email' value={email} />
        <input type="text" onChange={setPassword} placeholder='password' value={password}/>
        <button onClick={add}>submit</button>
    </div>
  )
}

export default Login