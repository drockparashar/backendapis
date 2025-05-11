import transporter from "../services/nodemailerService.js";

export async function sendEmail(to,subject,text) {
  var message = {
    to: to,
    subject: subject,
    text: text,
  };


  try{
    await transporter.sendMail(message);

    console.log(to,subject,text)
    return {message:"Email sent successfully"};
  }catch(err){
    return {message:"Error sending email!",error:err.message};
  }
}
