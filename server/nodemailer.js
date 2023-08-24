import nodemailer from 'nodemailer'

const sentOTP = (email, otp) => {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
          user:'sanoojc65@gmail.com',
          pass:'vilbpiduirpkmfll',
        },
      });
      var mailOptions = {
        from:'sanoojc65@gmail.com',
        to: email,
        subject: " Email verification",
        html: `
                <h1>Verify Your Email For goforrent</h1>
                  <h3>use this code to verify your email</h3>
                  <h2>${otp}</h2>
                `,
      }
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error)
        } else {
          resolve(otp)
        }
      });
    })
  }
  
  export default sentOTP
  
  