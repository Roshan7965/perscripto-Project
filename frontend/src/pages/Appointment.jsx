import { useContext, useEffect, useState } from "react";
import { Appcontext } from "../context/AppContext";
import {  useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";

const Appointment = () => {
  const { doctors, currencySymbol ,backendUrl,getAllDoctors,token} = useContext(Appcontext);
  const { docId } = useParams();
  const navigate=useNavigate();
  
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null); 
  const [docSolts, setDocSolts] = useState([]);
  const [soltIndex, setSoltIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  
    
  };
  const getAvailableSolts = async () => {
    setDocSolts([]);
    //getting current date
    let today = new Date();
    
    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      //setting endTime of Date
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting Hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
       
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        let day=currentDate.getDate();
        let month=currentDate.getMonth()+1;
        let year=currentDate.getFullYear();

        const slotDate=day+"_"+month+"_"+year;
        const slotTime=formattedTime;

        const isSlotAvailable = docInfo?.slots_booked?.[slotDate]?.includes(slotTime) ? false : true;



        if(isSlotAvailable){
          timeSlots.push({
            datetime:new Date(currentDate),
            time:formattedTime
          })
        }
       
        
        //increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSolts((prev) => [...prev, timeSlots]);
    }
  };

  
  const bookAppointment=async()=>{
    if(!token){
      toast.error("Login to book Appointment")
      return navigate('/login');
    }
    try {
      const date=docSolts[soltIndex][0].datetime
      
      let day=date.getDate();
      let month=date.getMonth()+1;
      let year=date.getFullYear();

      const slotDate=day+"_"+month+"_"+year;

      const {data}=await axios.post(backendUrl+"/api/user/book-appointment",{docId,slotTime,slotDate},{headers:{token}});
      if(data.success){
        toast.success(data.message);
        getAllDoctors();
        navigate("/my-appointments");
      
      }else{
        toast.error(data.message);
      }
      
      
    } catch (error) {
         console.log(error.message);
         toast.error(error.message);
    } 
  }


  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSolts();
  }, [docInfo]);
 
  return (
    <div>
      {/* firstPart */}
      <div className="flex flex-col md:flex-row  gap-4">
        <div className="bg-primary rounded-lg md:max-w-72  md:max-h-fit flex items-center justify-center w-full">
          <img className=" " src={docInfo?.image} />
        </div>
        <div className="flex flex-col px-8 py-6 border w-full sm:3/4 border-gray-400 rounded-lg">
          <div className="flex gap-3">
            <p className="text-3xl text-gray-800">{docInfo?.name}</p>
            <img src={assets.verified_icon}></img>
          </div>
          <div className="flex gap-3 text-gray-600 items-center">
            <p className="">MBBS-{docInfo?.speciality}</p>
            <p className="border border-gray-400 py-[2px] px-[6px] text-[10px] rounded-full my-2">
              {docInfo?.experience}
            </p>
          </div>
          <div className="flex gap-3 text-sm text-black my-1 ">
            <p>About</p>
            <img className="w-3" src={assets.info_icon} />
          </div>
          <div className="text-[14px] text-gray-600">
            <p>{docInfo?.about}</p>
          </div>
          <div className="text-gray-700 text-md mt-3  ">
            <p>
              Appointment fee:
              <span className="text-black">
                {currencySymbol}
                {docInfo?.fees}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* -----BOOKING solts*/}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-4 items-center w-full overflow-x-scroll mt-4">
          {docSolts?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setSoltIndex(index);
                }}
                key={index}
                className={`text-center px-1 py-6 min-w-16 rounded-full cursor-pointer ${
                  soltIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-400"
                }`}
              >
                <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4" >
          {
            docSolts[soltIndex]?.map((item, index) => {
              return (
                <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 py-2 px-4 border border-gray-400 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white':'text-gray-400 border border-gray-400' } `} key={index}>
                  {item.time.toLowerCase()}
                </p>
              );
            })}
        </div>
        <button onClick={bookAppointment} className=" px-5 sm:px-15 md:px-20 py-3 text-center my-6 font-light text-white bg-primary rounded-full text-sm ">Book an appointment</button>
      </div>

      {/* --------Releated Doctors--------- */}
      
      <RelatedDoctors docId={docId}  speciality={docInfo?.speciality}/>
    </div>

  );
};

export default Appointment;
