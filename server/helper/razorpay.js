import Razorpay from "razorpay";

 var instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY,
  })
  
  export default instance