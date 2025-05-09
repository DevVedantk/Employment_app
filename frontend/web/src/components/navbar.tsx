import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from 'lucide-react';
import {GeminiChatbot } from "./ChatBot"

export const Navbar = () => {

  const [openBot, setopenBot] = useState(false)

  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/user/auths", { withCredentials: true }).then((resp) => {
      console.log("check auths :", resp);
      if (resp.data.message === "authenticated") {
        setAuth(true);
      }
    });
  }, []);

  const toggleChatBot=()=>{
    setopenBot(!openBot)
  }

  return (<div>

    <nav className="fixed w-full font-poppins bg-white z-50 px-10 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div onClick={() => navigate("/")} className="flex cursor-pointer items-center gap-2">
          <Heart className="w-8 h-8 text-emerald-600" />
          <span className="text-2xl font-bold text-gray-500">NourishNet</span>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/")} className="cursor-pointer font-medium">Home</button>
            <button onClick={() => navigate("/raise-fund")} className="cursor-pointer font-medium">Raise Fund</button>
            <button onClick={() => navigate("/dashboard")} className="cursor-pointer font-medium">Dashboard</button>
            <button onClick={() => navigate("/about")} className="cursor-pointer font-medium">About</button>
            <button onClick={()=>toggleChatBot()} className="border border-2 block rounded-full p-2 font-semibold bg-black text-[#D6F34B]">AI assistant</button>
          </div>
          <button className="bg-[#D6F34B] text-black px-6 py-3 rounded-full font-medium flex items-center gap-2">
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>

    {
  openBot && (
    <div className="fixed w-[22rem] bottom-4 right-4 z-50 shadow-lg">
      <GeminiChatbot />
    </div>
  )
}
  </div>
  );
};