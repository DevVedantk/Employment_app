import { Calendar } from "lucide-react"
import { User } from "../svg/user"
import { useNavigate } from "react-router-dom"

interface PostDataType{
  id: string,
  Description:string
  Documents:string,
  Goal:string,
  QRCode:string,
  Raised:string,
  UPIid:string,
  img:string,
  name:string
}

interface FundingCardProps {
  data: PostDataType;
}

export const FundingCard = ({ data }: FundingCardProps) => {

  console.log("yein aaya data this one", data)
  const navigate = useNavigate();

  return <div onClick={() => navigate("/detail-post",{
    state:{postdata:data}
  })} className="h-[500px] cursor-pointer w-1/4 rounded-xl shadow-xl">
    <div className="h-[200px] w-full">
      <img className="cover rounded-xl h-full w-full" src={data.img} alt="" />
    </div>

    <div className="p-4">
      <div>
        <h1 className="text-xl font-semibold p-2">{data.name}</h1>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 ml-2 mr-2">{data.Description}</p>
      </div>


      <div className="flex justify-between">
        <h1 className="ml-2">Raised: Rs.{data.Raised}</h1>
        <h1 className="mr-8">{Number((Number(data.Raised)/Number(data.Goal))*100)}%</h1>
      </div>
      <div className=" flex justify-between">
        <h1 className="ml-2">Goal: Rs.{data.Goal}</h1>
        <h1 className="mr-8 flex"> <h1 className="mr-1 h-2"> <Calendar /></h1> 45 days left</h1>
      </div>


      <div className="flex ml-1 mt-2 p-1">
        <User />
        <h1 className="ml-1">0 people Donated</h1>
      </div>

      <div className="p-2 flex w-full items-center justify-center">
        <button className="border-1 bg-[#D6F34B] cursor-pointer px-12 py-2 rounded-full font-medium flex items-center gap-2">Donate Now</button>
      </div>
    </div>

  </div>
}