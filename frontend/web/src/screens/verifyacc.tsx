import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/navbar"
import axios from "axios";
import { useRef } from "react";

export const VerifyAcc=()=>{
  const navigate=useNavigate();
  const emailRef=useRef<HTMLInputElement>(null);


  const verifyAccount=async()=>{

    if(emailRef.current?.value===""){
      alert("Please Enter Email Address!!");
      return;
    }
    else{
     const resp=await axios.post("http://localhost:3000/user/resend",{
        email:emailRef.current?.value
      },{withCredentials:true})
      console.log(resp);
      if(resp.data.message==="OTP_send_to_your_email"){
        navigate("/verifyotp");
      }
    }
  }

    return <div className="h-screen w-full flex flex-col">
        <Navbar/>
          
          <div className="h-full w-full flex justify-center items-center">
                  <div className="h-1/2 w-1/3 shadow-xl justify-center gap-4 flex flex-col items-center rounded-xl">
                      
                      <div className="text-xl flex justify-center items-center">
                        Enter Your Email to Proceed
                      </div>

                      <div>
                        <input className="h-10 w-64 border-1 outline-none p-4 rounded-xl" type="text" placeholder="Enter Your Email" />
                      </div>

                      <button  onClick={verifyAccount} className="h-10 w-64 text-white font-semibold cursor-pointer bg-[#7643ED] rounded-xl">Step 3/3</button>
                      <button onClick={()=>navigate("/location")} className="h-10 w-64 text-white font-semibold cursor-pointer bg-[#7643ED] rounded-xl">Back</button>

                  </div>
          </div>
    </div>
}