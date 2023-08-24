
import twilio from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const mobileOTP=(number,otp)=>{
    // Create a Twilio client instance
    const client = twilio(accountSid, authToken);
    
    // Send a message using the Twilio client
    client.messages
      .create({
        body: `otp verification from goforrent  ${otp}` ,
        to: `+91${number}`, // Recipient's phone number
        from: '+15736335690' // Your Twilio phone number
      })
      .then(message => console.log(message.sid))
      .catch(error => console.error('Error sending message:', error));
}
