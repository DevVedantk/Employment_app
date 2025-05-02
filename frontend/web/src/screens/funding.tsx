import { useEffect, useState } from "react"
import { Footer } from "../components/footer"
import { FundingCard } from "../components/fundcard"
import { HeroSec } from "../components/Fundherosection"
import { Navbar } from "../components/navbar"
import axios from "axios"

export const RaiseFund = () => {
    const [posts,setposts]=useState([]);


    useEffect(()=>{
        axios.get("http://localhost:3000/user/allpost",{withCredentials:true}).then((resp)=>{
            // console.log(resp);
            setposts(resp.data.data)
        })
    },[])


    console.log("posts",posts);

    return <div className="h-screen w-full overflow-x-hidden">
        <Navbar />
        <HeroSec />

        <div className="h-screen mt-25 flex w-full">
            <div className="h-screen justify-center flex flex-col w-1/2">
               <div className="ml-16 mb-4">
               <h1 className="text-3xl font-semibold">What is Crowdfunding?</h1>
               <h1 className="text-3xl font-semibold">Everything You Should Know</h1>
               </div>

                <div className="px-16">
                    <p className="mb-8">Crowdfunding harnesses the power of social networks and the internet to give people the means to raise funds, help others overcome hardship, and meet aspirational goals. The core principle behind the crowdfunding definition is that you can help a friend or help an entire community.
                    </p>
                    <p className="mb-8">You can do everything from raising money for your surgery to fulfilling a student’s dream of attending college—and much more. You can also easily share your crowdfunding fundraiser via WhatsApp with friends and family or on TikTok and Instagram to use the power of social media.
                    </p>


                       <p className="mb-8">If you’ve ever found yourself wondering, “What is crowdfunding?” “What does crowdfunding mean?” or “What are the benefits of crowdfunding?” then keep reading. We’ll answer your questions about crowdfunding and give you top tips on bringing in donations.</p>
                </div>

                <div className="w-full ml-16">
                    <button className="border-1 bg-[#D6F34B]  cursor-pointer border-white px-8 py-4 rounded-full font-medium flex items-center gap-2">Start CrowdFunding</button>
                </div>
            </div>



            <div className="h-screen w-1/2 flex items-center justify-center">
                    <img className="cover p-8" src="https://www.gofundme.com/c/wp-content/uploads/2024/07/iStock-1232043247-aspect-ratio-560-355.jpg" alt="" />
            </div>
        </div>

          <div className="h-screen w-full">
                  <div className="w-full text-center mt-8">
                    <h1 className="text-4xl font-semibold">Explore our Projects</h1>
                  </div>

                  <div className="w-full flex gap-10 flex-wrap p-10 items-center ml-24">
                    {
                        posts.map((items)=>
                            <FundingCard data={items}/>
                        )
                    }
                    
                  </div>

                  <Footer/>
          </div>

{/* 
           <div className="mt-96">

            <Footer/>
           </div> */}
          
    </div>
}