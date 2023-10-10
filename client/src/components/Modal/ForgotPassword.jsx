import React from 'react'

function ForgotPassword() {
    const [email,setEmail]=useState('')
    
    const handleSubmit=async()=>{
        if(email.trim()===''){
            toast.error('Enter a valid email')
        }else{
            
        }
    }
  return (
    <div>
      <p>Enter your email</p>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default ForgotPassword 