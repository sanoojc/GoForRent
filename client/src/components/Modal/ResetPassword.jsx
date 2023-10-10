import React from 'react'

function ResetPassword({close}) {
  const[otp,setOtp]=useState('')
  return (
    <div>
      <h1>Enter OTP</h1>
      <input onChange={(e)=>setOtp(e.target.value)} type="text" />
      <button>Reset Password</button>
      <button onClick={close}>Cancel</button>
    </div>
  )
}

export default ResetPassword