import express, { json, Router } from 'express';
import { PrismaClient } from '@prisma/client';
const pclient=new PrismaClient();
export const userRouter=Router();
import z, { number, string } from 'zod';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_KEY=process.env.JWT_KEY as string;
console.log(JWT_KEY);
const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRETE=process.env.CLIENT_SECRETE;
const sendemail=require("../otplogic/otp");
import otpgenerator from 'otp-generator';
import axios from 'axios';


// //
// import systemPrompt from '../systemPrompt';

// const multer  = require('multer');
// const { createClient } = require('@deepgram/sdk');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const { Readable } = require('stream');

// const upload = multer();
// const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
// //


userRouter.post("/signup",async(req,res)=>{
        console.log("reached!!")
        // console.log(JWT_KEY);
   try{
    const RequiredTypes=z.object({
        googleId:z.string().optional(),
        name:z.string().min(3).max(100).optional(),
        email:z.string().min(5).max(100).email(),
        password:z.string().min(5).max(50).optional()
    })
    console.log("reached here");
    
    const CheckedRequiredTypes=RequiredTypes.safeParse(req.body);
    console.log(CheckedRequiredTypes)
    
    if(!CheckedRequiredTypes.success){
        res.status(422).send("Invalid Input types");
        return;
    }
    
    console.log("reached here also");
    
    const {name,email,googleId,password}=req.body;
    console.log(email);
    console.log(password);
    
    const CheckedByEmail=await pclient.users.findUnique({
        where:{
            email:email
        }
    })
    
    if(CheckedByEmail){
        res.json({
            message:"Email_exists"
        })
        return;
    }
    
     const PutUserIntoDB=await pclient.users.create({
        data:{
            googleId:googleId,
            name:name,
            email:email,
            password:password,
            verified:false,
        }
     })

    //  console.log("user toh bnan gaya!!",PutUserIntoDB);

     const CreateOTP=otpgenerator.generate(6,{
        digits:true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false
     }) 

     
     await sendemail(email,"OTP-VERIFICATION",CreateOTP)
     
     const CreateOTPEntryInDB=await pclient.otpmodel.create({
        data:{
            email:email,
            otp:CreateOTP
        }
     })

     const token=jwt.sign({
        userId:PutUserIntoDB.id
    },JWT_KEY);

    // console.log("token is : ",token);

     
 
     res.cookie("userId",PutUserIntoDB.id,{httpOnly:true,secure:false});

    res.cookie("uidcookie",token,{
        httpOnly:true,
        secure:false
    })

    // console.log(res.cookie);
    // console.log(res);

    res.json({
        data:"OTP_Send",
        email
    })
   } catch(e){
       console.log(e)
    res.status(500).send("Something went Wrong!!!");
    return;
   }
})

userRouter.post("/logout",(req,res)=>{
    res.clearCookie("uidcookie", {
        httpOnly: false,  // Ensures the cookie cannot be accessed via JavaScript
        secure: true,    // Ensures the cookie is only sent over HTTPS
    });
    res.clearCookie("userId", {
        httpOnly: false,  // Ensures the cookie cannot be accessed via JavaScript
        secure: true,    // Ensures the cookie is only sent over HTTPS
    });

    res.json({
        message:"logout"
    })
})

userRouter.post("/verifyotp",async(req,res)=>{
    const token=req.cookies.uidcookie;
    console.log("here");



    if(!token){
        res.json({
            message:"Not_SignedIn"
        })
        return;
    }
    
    const {otp,email}=req.body;
   

    const FindEmail=await pclient.users.findUnique({
        where:{
            email
        }
    })
    if(!FindEmail){
        res.json({
            message:"Not_found"
        })
        return;
    }

    // console.log("here also")
    const FindOTPInDB=await pclient.otpmodel.findUnique({
        where:{
            otp
        }
    })
        
    if(!FindOTPInDB){
        res.json({
            message:"Invalid_otp"
        })
        return;
    }
    const updateUser=await pclient.users.update({
        where:{
            email:email
        },
        data:{
           verified:true 
        }
    })

    const deleteOTPRecord=await pclient.otpmodel.delete({
        where:{
            otp:otp
        }
    })

    res.json({
        message:"Verified!!"
    })

})

userRouter.post("/signin",async(req,res)=>{
    console.log("recieved")
    console.log(req.body.email);
   try {
     
    const RequiredTypes=z.object({
        email:z.string().min(5).max(100).email(),
    })

    const CheckedRequiredTypes=RequiredTypes.safeParse(req.body);
     
    if(!CheckedRequiredTypes.success){
       res.status(422).send("Invalid_Input");
       return;
    }
    console.log("here also");
 
    const {email}=req.body;
    console.log("email is :",email);
   
    
    const CheckedByEmail=await pclient.users.findUnique({
        where:{
           email:email 
        }
    })

    console.log("here 2");
    console.log(CheckedByEmail);

    if(!CheckedByEmail){
       res.json({
        message:"not_found"
       })
       return;
    }

    //if email exists but otp not verified then again send OTP to user then 
    //verify otp 
    if(CheckedByEmail && !CheckedByEmail.verified){
         res.json({
          message:"Look_like_you_are_not_verfied"
         })
         return;
    }

    const token=jwt.sign({
        userId:CheckedByEmail.id
    },JWT_KEY);
    
     console.log("33");

     res.cookie("userId",CheckedByEmail.id,{httpOnly:false,secure:false});

    res.cookie("uidcookie",token,{
        httpOnly:false,
        secure:false
    })
    res.json({
        message:"found",
        data:CheckedByEmail
    })


   } catch (error) {
       console.log(error);
       res.status(500).send("Something went wrong!!");
       return;
   }
})


userRouter.get("/auths",async(req,res)=>{

    const token=req.cookies.uidcookie;
        if(!token){
            res.json({
                message:"unauths"
            })
            return;
        }   
        const user=await pclient.users.findFirst({
           where:{
             id:req.cookies.userId
           }
        })
        res.json({
            message:"authenticated",
            userData:user
         })
})          


userRouter.post("/resend",async(req,res)=>{
      const token=req.cookies.uidcookie;
      console.log("yaha par");

      if(!token){
        res.json({
            message:"not_signedIn"
        })
        return;
      }

      const {email}=req.body;

      console.log(email);

      const deleteOTPRecord=await pclient.otpmodel.delete({
        where:{
            email:email
        }
    })
       
      const CreateOTP=otpgenerator.generate(6,{
        upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false
      })
      await sendemail(email,"OTP-VERIFICATION",CreateOTP);


      const CreateOTPEntryInDB=await pclient.otpmodel.create({
        data:{
            email:email,
            otp:CreateOTP
        }
     })

     res.json({
        message:"OTP_send_to_your_email"
     })

})


userRouter.post("/create",async(req,res)=>{
       
    const token=req.cookies.uidcookie;
        if(!token){
            res.json({
                message:"unauths"
            })
            return;
        }   

        console.log(req.body);

       const {name,mobileNo,description,price,img}=req.body;
       console.log(img);
      const resp= await pclient.placeInfo.create({
            data:{
                name:name,
                phoneNo:mobileNo,
                Description:description,
               Price:price,
               img:img
            }
        })

        console.log(resp);

        res.json({
            id:resp.id,
            message:"data_added"
        })

})

userRouter.post("/address",async(req,res)=>{
        
    const token=req.cookies.uidcookie;
        if(!token){
            res.json({
                message:"unauths"
            })
            return;
        }   

        const {id,lattitude,longitude,address}=req.body;

      const resp=await pclient.placeInfo.update({
            where:{
                id:id
            },
            data:{
             Lattitude:lattitude,
             Longitude:longitude,
             Address:address          
            }
        })

        console.log(resp);

        res.json({
            message:"done"
        })
})


userRouter.post("/verifyaddress",async(req,res)=>{
    const token=req.cookies.uidcookie;
    console.log("yaha par");

    if(!token){
      res.json({
          message:"not_signedIn"
      })
      return;
    }

    const {email,id}=req.body;

    const FindEmail=await pclient.users.findFirst({
        where:{
            email
        }
    })
    if(!FindEmail){
        res.json({
            message:"Not_found"
        })
        return;
    }

    const CreateOTP=otpgenerator.generate(6,{
        upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false
      })
      await sendemail(email,"OTP-VERIFICATION",CreateOTP);


      const CreateOTPEntryInDB=await pclient.otpmodel.create({
        data:{
            email:email,
            otp:CreateOTP
        }
     })

     const addemailEntry=await pclient.placeInfo.update({
        where:{
            id:id
        },
        data:{
            email:email
        }
     })
     res.json({
        message:"OTP_send_to_your_email"
     })
})

userRouter.post("/VerifyAddressOTP",async(req,res)=>{
             
    const token=req.cookies.uidcookie;
    console.log("here");

    if(!token){
        res.json({
            message:"Not_SignedIn"
        })
        return;
    }
    
    const {otp,email,id}=req.body;
   

    const FindEmail=await pclient.users.findFirst({
        where:{
            email
        }
    })
    if(!FindEmail){
        res.json({
            message:"Not_found"
        })
        return;
    }

    // console.log("here also")
    const FindOTPInDB=await pclient.otpmodel.findUnique({
        where:{
            otp
        }
    })
        
    if(!FindOTPInDB){
        res.json({
            message:"Invalid_otp"
        })
        return;
    }
    const updateAddress=await pclient.placeInfo.update({
        where:{
            id:id
        },
        data:{
            Verified:true
        }
    })

    const deleteOTPRecord=await pclient.otpmodel.delete({
        where:{
            otp:otp
        }
    })

    res.json({
        message:"Verified!!"
    })
})

userRouter.get("/placesdata",async(req,res)=>{
        
  const placesData=await pclient.placeInfo.findMany({});
   
  res.json({
    placesData
  })

})


// //
// userRouter.post('/api/voice', upload.single('audio'), async (req, res) => {
//     try {
//       const { buffer: audioBuffer, mimetype } = (req as any).file;                //(STT) Integration

//       const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
//         audioBuffer,
//         {
//           model: 'nova-3',
//           language: 'en',
//           smart_format: true,
//         }
//       );

//       if (error) throw error;
//       const userText = result.results.channels[0].alternatives[0].transcript;
      
//       const fullContent = [
//         { role: 'user', parts: [{ text: systemPrompt }] },                        //Gemini    Integration
//         { role: 'user', parts: [{ text: userText }] }
//       ];
              
//       const response = await model.generateContent({ contents: fullContent });
      
//       const botReply = response.response.text();
      
//       const ttsResponse = await deepgram.speak.request(                           //(TTS)    Integration
//         { text: botReply },
//         { model: 'aura-asteria-en' }
//       );
      
//       // Stream TTS audio back to client
//       res.set('Content-Type', 'audio/mpeg');
//       const stream = await ttsResponse.getStream();
//       Readable.from(stream).pipe(res);
  
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// //


userRouter.post("/createPost",async(req,res)=>{
     
    const {name,title,Description,Amount,Mobile}=req.body;

     
   const resp=await pclient.fundingPost.create({
        data:{
        name:title,
        Description:Description,
        Goal:Amount,
        Raised:"0",
        }
    })

    console.log(resp)
    res.json({
        message:resp
    })

})


userRouter.post("/uploadDoc",async(req,res)=>{

    console.log("here l");
   
    const {PostId,thumnailUrl,QRCodeUrl,ValidProofUrl,UPIid}=req.body;
        
    console.log(PostId);
    console.log(thumnailUrl);
    console.log(QRCodeUrl);

    console.log(UPIid);



    const resp=await pclient.fundingPost.update({
      where:{
        id:PostId.id
      },
      data:{
       UPIid:UPIid,
       Documents:ValidProofUrl,
       img:thumnailUrl,
       QRCode:QRCodeUrl
      }
    })


    console.log(resp);

    res.json({
        message:resp
    })

})

userRouter.get("/allpost",async(req,res)=>{
    
   const resp=await pclient.fundingPost.findMany({});

  res.json({
  data:resp
 })
})


userRouter.post("/verifyPayment",async(req,res)=>{
    console.log("payemnt verify")
    const {PostId,userId,Amount,ScreenShot}=req.body;

    const resp=await pclient.fundingPost.update({
        where:{
        id:PostId
        }
        ,
        data:{
         Raised:Amount
        }
    })

    console.log(resp);

    res.json({
        message:resp
    })
})