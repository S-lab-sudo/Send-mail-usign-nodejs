// DOT END CONFIGURATION
require('dotenv').config()

// LIBRARY
const nodemailer=require('nodemailer')
const {google}=require('googleapis')

// USER VALUES
const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const REDIRECT_URI=process.env.REDIRECT_URI
const REFRESH_TOKEN=process.env.REFRESH_TOKEN
const userMail=process.env.USER_MAIL

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const sendMail=async(informationToSend,mailAddress)=>{
        try {
            // GET ACCESSTOKEN
            const accessToken=await oAuth2Client.getAccessToken()
            
            // TRANSPORT OF NODEMAILER
            const transport=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    type:'OAuth2',
                    user:userMail,
                    clientId:CLIENT_ID,
                clientSecret=CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken
            }
        })
        
        const mailOptions={
            from:'BAKCEND',
            to:`${mailAddress}`,
            subject:'this is subject',
            text:`${informationToSend}`,
            html:`${informationToSend}`
        }

        const result=await transport.sendMail(mailOptions)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

sendMail("This iformation is send to cliend","emailAddress@gmail.com")