
import {ArrowRight } from 'lucide-react';
import { Navbar } from '../components/navbar';
import SpotlightCard from '../components/SpotLightCard';
import FlowingMenu from '../components/FlowingMenu';
import { Footer } from '../components/footer';
import { useNavigate } from 'react-router-dom';

const demoItems = [
    { link: '#', text: 'Trust', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Community', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Quality', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Distribution', image: 'https://picsum.photos/600/400?random=4' }
  ];
export const Home=()=> {
    const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-white">
    
    <Navbar/>

      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-black"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)'
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-6xl font-bold max-w-5xl leading-tight mb-6">
          "Feeding Hope, One Plate at a Time."
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mb-12">
          "A plate of food, a spark of grace,
A smile appears on every face.
We fight hunger with every meal,
Together we help the world to heal."
          </p>
          <div className="flex gap-4">
            <button onClick={()=>navigate("/dashboard")} className="bg-[#D6F34B] cursor-pointer text-black px-8 py-4 rounded-full font-medium flex items-center gap-2">
              Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={()=>navigate("/signup")} className="border-2 cursor-pointer border-white px-8 py-4 rounded-full font-medium flex items-center gap-2">
              Register
            </button>
            {/* <button onClick={()=>navigate("/voice-bot")} className="border-2 cursor-pointer border-white px-8 py-4 rounded-full font-medium flex items-center gap-2">
              Voice Chat Bot
            </button> */}
          </div>
        </div>
      </div>

      <div className='w-full h-screen bg-black flex flex-col'>
                
                
             <div className='w-full flex flex-col items-center h-1/2 justify-center'>
              <h1 className='text-8xl text-white uppercase font-bold'>Share Your Kindness</h1>
              <h1 className='text-8xl text-white uppercase font-bold'> With EveryOne!!</h1>
               <button onClick={()=>navigate("/dashboard")} className='h-12 cursor-pointer w-48 rounded-4xl font-semibold mt-8 bg-[#D6F34B]'>Donate Now</button>
             </div>
             <div className='flex w-full gap-12 items-center justify-center'>

             <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(225, 230, 231, 0.27)">
"There are people in the world so hungry, that God cannot appear to them except in the form of bread." — Mahatma Gandhi
</SpotlightCard>

<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(225, 230, 231, 0.27)">
"Hunger is not a problem. It is an obscenity. How wonderful it is that nobody need wait a single moment before starting to improve the world." — Anne Frank
</SpotlightCard>




<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(225, 230, 231, 0.27)">
"If you can’t feed a hundred people, then feed just one." — Mother Teresa
</SpotlightCard>
             </div>
      </div>

      <div className='h-2/3 w-full'>
      <div style={{ height: '600px', position: 'relative' }}>
  <FlowingMenu items={demoItems} />
</div>
      </div>

      <div>
        <Footer/>
      </div>

      
    </div>
  );
}


