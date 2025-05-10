import { Footer } from "../components/footer"
import { Navbar } from "../components/navbar"
import donate  from "../images/about.jpeg"
import {Heart} from "lucide-react"
import { useNavigate } from 'react-router-dom';





export const About=()=>{
    const navigate=useNavigate();

    return <div className="h-screen w-full overflow-x-hidden">
        <Navbar/>

       
      <section className="mt-36 justify-center items-center flex flex-col ">
        <div className="flex flex-wrap  w-[82%] justify-between "> 
            <div className="lg:w-[50%]">
                <h1 className="text-7xl font-bold ">Sharing Food, </h1>
                <h1 className="text-[#D6F34B] mt-4 lg:ml-7 text-7xl font-bold">Spreading Hope</h1>
                <p className="ml-15 mt-10 font-medium  w-[80%]">Join our community effort to redistribute food and essential items to those in need. Every donation, every volunteer hour makes a difference.</p>
                <div className="w-full ml-16 mt-10 flex gap-4">
  <button onClick={()=>navigate("/raise-fund")}   className="border border-white bg-[#D6F34B] hover:bg-[#c6e636] transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer  px-4 py-1 rounded-full font-medium flex items-center gap-2 text-md">
    Donate
  </button>
  
          <button  onClick={()=>navigate("/dashboard")}  className="border border-white bg-[#D6F34B] hover:bg-[#c6e636] transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer px-5 py-2 rounded-full font-medium flex items-center gap-2 text-md">
    Contribute
  </button>
      
  
</div>


            </div>
            <div className="md:mt-4 sm:mt-6">
  <img
    src={donate}
    alt="Donate"
    className="h-[23rem] w-[35rem] rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
  />
</div>
        
        </div>
      </section>
       <section className="mt-10 bg-gradient-to-b from-sunshine-50 to-white py-20 px-6">
        <div className="container mx-auto text-center animate-fade-in-up">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-5xl font-bold  mb-6 text-gray-800">
            Our <span className="text-[#D6F34B]">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 mb-10">
            Bridging the gap between abundance and need through compassionate community action.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={()=>navigate("/raise-fund")}    className="border border-white bg-[#D6F34B] hover:bg-[#c6e636] transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer px-6 py-2 rounded-full font-medium flex items-center gap-2 text-xl">
    Donate
  </button>
          </div>
        
      
        </div>

      </section>
       
      <section className="py-16 px-6 ">
  <div className="container mx-auto">
    {/* <h2 className="text-3xl font-montserrat font-bold text-gray-800 text-center mb-10">
      Our Approach
    </h2> */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      <div className="bg-white border border-sunshine-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-montserrat font-semibold mb-4 text-gray-800">
          Real-Time Distribution
        </h3>
        <p className="text-gray-600 mb-4">
          Our platform connects donors and recipients in real-time using geo-location technology. This allows for:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Immediate matching of available food/items with nearby recipients</li>
          <li>Minimized food waste through quick response times</li>
          <li>Optimized logistics with the shortest possible routes</li>
          <li>Live tracking of donations from source to recipient</li>
        </ul>
      </div>

      <div className="bg-white border border-sunshine-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-montserrat font-semibold mb-4 text-gray-800">
          Community-Centered Model
        </h3>
        <p className="text-gray-600 mb-4">
          We believe lasting change happens at the neighborhood level through:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Hyperlocal distribution networks that understand specific community needs</li>
          <li>Direct involvement of community members as volunteers and participants</li>
          <li>Building relationships between donors, volunteers, and recipients</li>
          <li>Creating sustainable, self-supporting community food systems</li>
        </ul>
      </div>

    </div>
  </div>
</section>
<section className="mt-3 bg-gradient-to-b from-sunshine-50 to-white py-12 px-6">
        <div className="container mx-auto text-center animate-fade-in-up">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-5xl font-bold  mb-6 text-gray-800">
            How You Can Help
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 mb-10">
          There are many ways to contribute to our mission of fighting hunger and helping those in need.
          </p>
          
      
        </div>

      </section>
      <section className="py-5 px-4 mb-12 ">
      <div className="flex flex-wrap justify-center gap-6">
        
        {/* Card 1 */}
        <div className="w-full sm:w-[400px] bg-white rounded-lg shadow-lg p-6">
          <div className=" items-start gap-4">
          <Heart className="text-green-500 w-8 h-8 mt-1 drop-shadow-[0_2px_6px_rgba(34,197,94,0.7)]" />
            <div>
                <div className="p-3 mb-10">

              <h2 className="text-xl m-2 font-bold text-gray-800 mb-2">Donate Food & Items</h2>
              <p className="text-gray-600 text-sm">
                Share your excess food, groceries, or essential items with those who need them most in your community.
              </p>
                </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full sm:w-[400px] bg-white rounded-lg shadow-lg p-6">
          <div className=" items-start gap-4">
          <Heart className="text-green-500 w-8 h-8 mt-1 drop-shadow-[0_2px_6px_rgba(34,197,94,0.7)]" />
            <div>
                <div className="p-3 mb-10">

              <h2 className="text-xl m-2 font-bold text-gray-800 mb-2">Donate Food & Items</h2>
              <p className="text-gray-600 text-sm">
                Share your excess food, groceries, or essential items with those who need them most in your community.
              </p>
                </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full sm:w-[400px] bg-white rounded-lg shadow-lg p-6">
          <div className=" items-start gap-4">
          <Heart className="text-green-500 w-8 h-8 mt-1 drop-shadow-[0_2px_6px_rgba(34,197,94,0.7)]" />
            <div>
                <div className="p-3 mb-10">

              <h2 className="text-xl m-2 font-bold text-gray-800 mb-2">Donate Food & Items</h2>
              <p className="text-gray-600 text-sm">
                Share your excess food, groceries, or essential items with those who need them most in your community.
              </p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <Footer/>
       
    </div>
}