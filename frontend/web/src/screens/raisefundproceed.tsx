import { useLocation, useNavigate } from "react-router-dom";
import { FormField } from "../components/formfeild"
import { Navbar } from "../components/navbar"
import { UploadField } from "../components/uploadinputfield"
import { useRef, useState } from "react";
import axios from "axios";

export const RaiseFund2=()=>{

    const navigate=useNavigate();

    const PostId=useLocation().state;

    console.log("Location sein ",PostId);
    const QRref=useRef<HTMLInputElement>(null);
    const ThumnailRef=useRef<HTMLInputElement>(null);

    const DocumentRef=useRef<HTMLInputElement>(null);
    
    const UPIidRef=useRef<HTMLInputElement>(null);

    const [thumbnail,setthumbnail]=useState("");
    const [Document,setDocument]=useState("");
    const [QRCode,setQRCode]=useState("");


    const hanldefiles=async(file:any)=>{
        if(!file) return;

        const data=new FormData();
        data.append("file",file);
        data.append("upload_preset","employapp");
        data.append("cloud_name","dnlqcnhoy");
        const resp=await axios.post("https://api.cloudinary.com/v1_1/dnlqcnhoy/image/upload",data);
       
        // console.log("from cludinary response : ",resp.data.url);

        const URL=resp.data.url;
        console.log("yein hain url",URL);
        return URL;
    }


    const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file);
        if (!file) return;
        const url = await hanldefiles(file);
        console.log("return val",url)
        setthumbnail(url);
        event.target.value="";
    };
    
    const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const url = await hanldefiles(file);
        setDocument(url);
        event.target.value="";
    };
    
    const handleQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const url = await hanldefiles(file);
        setQRCode(url);
        event.target.value="";
    };
    // console.log("final url hain",img)

    const handleupload=async()=>{

    console.log("inside fn")
        console.log(UPIidRef.current?.value)
        console.log(QRref.current?.value)
        console.log(ThumnailRef.current?.value)
        console.log(DocumentRef.current?.value)

        if(UPIidRef.current?.value==="" || QRCode==="" || thumbnail==="" || Document===""){
            alert("Enter All necessary Details");
            return;
        }else{
       console.log("inside fn");
          
  const resp=await axios.post("http://localhost:3000/user/uploadDoc",{
          PostId:PostId,
          thumnailUrl:thumbnail,
          QRCodeUrl:QRCode,
          ValidProofUrl:Document,
          UPIid:UPIidRef.current?.value
    },{withCredentials:true})

     
    console.log("create ho gayi !!",resp);
     
    if(resp.data){
        alert("Post created!!");
        navigate("/raise-fund");
    }}
    }


    console.log("thum",thumbnail);
    console.log("qr",QRCode)
    console.log("doc",Document)
    return <div className="h-screen w-full">
        <div>
             <Navbar/>
        </div>

             
        <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full flex mt-16 h-32 items-center justify-center flex">
                <h1 className="text-4xl">Upload Your Valid Documents</h1>
                </div>


                <div className="w-full mt-6 gap-8 flex flex-col items-center justify-center">
        
                   <div className="w-full flex items-center justify-center">
                   <UploadField handlefn={handleThumbnailUpload} inputref={ThumnailRef} title="Upload Thumnail/CoverImage"/>
                   </div>

                   <div className="w-full flex items-center justify-center">
                    <UploadField handlefn={handleDocumentUpload} inputref={DocumentRef} title="Upload any Valid Document proof for fund raising"/>
                   </div>
                   <div className="flex flex-col w-full items-center">
                    <div className="w-full flex items-center justify-center">
                   <UploadField handlefn={handleQRUpload} inputref={QRref} title="Upload QR Code"/>
                    </div>
                  
                    <FormField inputref={UPIidRef} type="text" title="Enter UPI ID" placeholder="Enter Valid UPI Id e.g (user@axisbank)"/>
                
                   </div>

                    <div className="w-1/2">
                    <button onClick={handleupload} className="border-1 bg-[#D6F34B]  cursor-pointer border-white px-20 py-4 rounded-full font-medium flex items-center gap-2">Proceed</button>
                    </div>
                </div>
               </div>

    </div>
}