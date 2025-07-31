
import { CiMail } from "react-icons/ci";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

const ExpertDirectoryCard = (props:any) => {
  return <div className="border rounded-md  bg-white p-5 w-full  hover:shadow-md" >
  
  
   <div className="mb-6" >
   <div className="flex mt-0 space-x-3 " >
  
  <div className="w-15 h-15 bg-gradient-to-br from-blue-500 to-purple-600 border rounded-full flex 
                  items-center justify-center overflow-hidden">
     {props.image ? (
       <img className="w-full h-full object-cover"
           src={props.image}   alt="" /> ) : 
           ( <span className="text-white font-bold text-[17px]">
         {props.name.split(' ').map((name: string) => name[0]).join('')}
       </span>
     )}
   </div>
 
  <div className="flex-1 ">
   <div className="text-bold text-[16px] font-semibold">{props.name}</div>
   <div className="flex space-x-2 mt-1 mb-1" >
   <span className="text-xs  px-2 py-0.5 rounded-full bg-purple-100 text-purple-800"> {props.role}</span>
     <span className="text-sm m-0.5 text-gray-600"> {props.department}</span> 
   </div>
   <div className="text-sm flex items-center space-x-2 text-gray-600 ">
     <span><IoCalendarClearOutline/></span>
     <span className="">joined {props.date}</span>
     </div>
   </div>
 </div >
 
 <div className=" flex-1 min-h-0 overflow-hidden ">
  <h4 className="mt-2 text-sm text-gray-700 mb-1 font-medium"> Skills & Expertise</h4>
  <div className="flex flex-wrap overflow-y-auto max-h-[60px] w-fit gap-1 mt-1 ">
   <span className="px-1 text-[11px] py-1 bg-blue-50 text-blue-700 whitespace-nowrap rounded-full">{props.skill1}</span>
   {props.skill2 &&<span className="px-2 text-[11px]  py-1 bg-blue-50 text-blue-700 whitespace-nowrap rounded-full">{props.skill2}</span>}
   {props.skill3 &&<span className="px-2 text-[11px]  py-1 bg-blue-50 text-blue-700 whitespace-nowrap rounded-full">{props.skill3}</span>}
   { props.skill4 && <span className="px-2 text-[11px] py-1 bg-blue-50 text-blue-700 whitespace-nowrap rounded-full">{props.skill4}</span>}
  </div>
 </div>
  </div>
   
   <div className="flex text-gray-800 text-sm border-t border-gray-200 pt-3  ">
    <p className="flex items-center ml-6 gap-1"><CiMail/>   <span > Contact</span></p> 
    
    <p className="flex items-center ml-3 gap-1"><IoPersonOutline/> 
    <span >view profile </span></p>
  </div>
  </div>
}

export default ExpertDirectoryCard
