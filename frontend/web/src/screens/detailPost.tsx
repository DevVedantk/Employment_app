import { Calendar, User } from "lucide-react"
import { Navbar } from "../components/navbar"
import { Donate } from "../svg/donate"
import { useLocation } from "react-router-dom"
import { UploadField } from "../components/uploadinputfield"
import { useEffect, useRef, useState } from "react"
import { FormField } from "../components/formfeild"
import axios from "axios"

export const DetailPost = () => {

  const data=useLocation().state.postdata;
  const ScreenShotQR=useRef<HTMLInputElement>(null);
  const AmountRef=useRef<HTMLInputElement>(null);


  console.log("thi is my data",data)
  const [img,setimg]=useState("");


  const [auth,setauths]=useState(false);
  const [userId,setUserId]=useState("");

  useEffect(()=>{
    axios.get("http://localhost:3000/user/auths",{withCredentials:true}).then((resp)=>{
      console.log("check auths :",resp);
      if(resp.data.message==="authenticated"){
          setauths(true);
          setUserId(resp.data.userData.id);
      }
    })
  },[])

  console.log("user id is",userId);

  const getScreenshotURL=async(event:any)=>{

    const file=event.target.files[0];
    console.log("my images",file)
    // console.log(imgRef.current.value)
    if(!file) return;

    const data=new FormData();
    data.append("file",file);
    data.append("upload_preset","employapp");
    data.append("cloud_name","dnlqcnhoy");
    const resp=await axios.post("https://api.cloudinary.com/v1_1/dnlqcnhoy/image/upload",data);
   
    // console.log("from cludinary response : ",resp.data.url);
    setimg(resp.data.url)
  }


  const handleQRScreenShotUpload=async()=>{
               
  const resp=await axios.post("http://localhost:3000/user/verifyPayment",{
          PostId:data.id,
          Amount:AmountRef.current?.value,
          ScreenShot:img,
          userId:userId
    },{withCredentials:true})


    alert("Successfully Submitted");
    window.location.reload();
    console.log(resp);
  }



  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />

      {/* Main content row */}
      <div className="flex w-full flex-1">
        {/* Left side */}
        <div className="w-2/3 flex flex-col p-4">
          <div className="mt-16 w-full h-16 flex ml-30 p-4 rounded">
            <h1 className="text-3xl font-semibold">{data.name}</h1>
          </div>
          <div className="w-full flex items-center justify-center">
            <img className="cover rounded-xl h-80 w-[600px]" src={data.img} alt="" />
          </div>


          <div className="w-6/8  p-2 ml-18">
               
          <div className="flex ml-16 justify-between">
                 <h1 className="ml-2 text-xl">Raised: Rs.{data.Raised}</h1>
                 <h1 className="mr-8 text-xl">{Number((Number(data.Raised)/Number(data.Goal))*100)}%</h1>
              </div>
              <div className="ml-16 flex text-md justify-between">
              <h1 className="ml-2 text-xl">Goal: Rs.{data.Goal}</h1>
              <h1 className="mr-8 text-xl flex"> <h1 className="mr-1 h-2"> <Calendar/></h1> 45 days left</h1>
              </div>
          </div>


          <div className="ml-32 flex p-2">
              <User/>
        <h1 className="ml-1 text-xl">0 people Donated</h1>
          </div>

          <div className="w-[600px] ml-32">
            <h1 className=" text-xl mt-2">Description</h1>
          <p className="text-gray-600  text-md mb-4 ml-2 mr-2">{data.Description}</p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-1/2 flex flex-col">
           
           <div className="mt-20 h-96 shadow-2xl w-2/3 h-full ml-8">
             <div className="flex mt-4 justify-between p-6 items-center h-10">
             <div className="flex p-2">
               <Donate/>
               <h1 className="text-xl">Donate</h1>
               </div>

               <div className=" flex">
              <User/>
        <h1 className="ml-1 text-xl">0 people Donated</h1>
          </div>

             </div>


             <div className="w-full h-24 p-4 ml-4">
               <h1 className="text-xl">Raised</h1>
               <h1 className="text-xl">Rs.{data.Raised} of Rs.{data.Goal}</h1>
             </div>


             <div className="w-full flex items-center justify-center h-12">
                <button className="h-12 w-2/3 cursor-pointer rounded-3xl font-bold text-white bg-green-400">Scan QR Below</button>
             </div>

             <div className="w-full flex items-center flex-col justify-center">
                <img src={data.QRCode} alt="" />
          <p>Scan & donate with any app</p>

          <div className="flex items-center p-4">
            <img className="h-10 border-1 border-gray-400 rounded-3xl cover" src="https://img.icons8.com/fluent/512/bhim.png" alt="" />
            <img className="h-12 cover" src="https://www.citypng.com/public/uploads/preview/paytm-circle-logo-hd-png-701751694706614zmho56voff.png" alt="" />
            <img className="h-10  border-1 border-gray-400 rounded-3xl cover" src="https://toppng.com/uploads/preview/google-pay-gpay-logo-11530962961mwws81tde9.png" alt="" />
          </div>
             </div>


             <div className="w-full p-4 justify-center font-normal text-center flex flex-col items-center">
             <h1 className="font-normal p-1">Upload Payment ScreenShot and specify Amount for Proof</h1>
      <label htmlFor="vedant"
        className="block rounded-xl border-1 cursor-pointer h-10 w-1/3 flex items-center justify-center text-sm font-medium text-gray-900"
      >
        Choose file
      </label>
      <input id="vedant" onChange={getScreenshotURL} className="hidden" ref={ScreenShotQR} type="file"/>
       <input ref={AmountRef} className="h-10 w-2/3 border-1 mt-2 rounded-xl p-2" type="text" placeholder="Amount" />
                            <button onClick={handleQRScreenShotUpload} className="h-12 p-2 mt-4  w-2/3 cursor-pointer rounded-3xl font-bold text-white bg-green-400">Submit</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
