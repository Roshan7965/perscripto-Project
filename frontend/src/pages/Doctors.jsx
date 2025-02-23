import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Appcontext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();

  const { doctors } = useContext(Appcontext);

  const[filterDoc,setFilterDoc]=useState([]);
  const[showFilter,setFilter]=useState(false);
  const navigate=useNavigate();

  const ApplyFilter=()=>{
    
    if(speciality){
      setFilterDoc(doctors.filter( doc=>doc.speciality=== speciality))
      
    }else{
      setFilterDoc(doctors);
    }
  }
  
  useEffect(()=>{
    ApplyFilter();
  },[doctors,speciality]);

  return (
    <div>
      <p className="text-gray-600 "> Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row gap-5 mt-5">
      <button onClick={()=>setFilter(prev=>!prev)} className={`px-3 py-1 w-fit rounded text-sm border sm:hidden transition-all ${showFilter ? "bg-primary text-white":""}` }>Filter</button>
      <div className={`flex-col gap-4 text-sm text-gray-600  ${showFilter ? 'flex':'hidden sm:flex'}`}>
          <p onClick={()=>speciality==="General physician"?navigate('/doctors'):navigate('/doctors/General physician')}  className={`border  w-[200px] border-gray-300 py-1.5 px-3 cursor-pointer rounded-md ${speciality==="General physician"?"bg-indigo-100 text-black":"" }`} >General physician</p>
          <p onClick={()=>speciality==="Gynecologist"?navigate('/doctors'):navigate('/doctors/Gynecologist')}  className={`border  w-[200px] border-gray-300 py-1.5 px-3 cursor-pointer rounded-md ${speciality==="Gynecologist"?"bg-indigo-100 text-black":"" }`} >Gynecologist</p>
          <p onClick={()=>speciality==="Neurologist"?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`border  w-[200px] border-gray-300 py-1.5 px-3 cursor-pointer rounded-md ${speciality==="Neurologist"?"bg-indigo-100 text-black":"" }`} >Neurologist</p>
          <p onClick={()=>speciality==="Dermatologist"?navigate('/doctors'):navigate('/doctors/Dermatologist')}className={`border  w-[200px] border-gray-300 py-1.5 px-3 cursor-pointer rounded-md ${speciality==="Dermatologist"?"bg-indigo-100 text-black":"" }`} >Dermatologist</p>
          <p onClick={()=>speciality==="Gastroenterologist"?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`border  w-[200px] border-gray-300 py-1.5 px-3 cursor-pointer rounded-md ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black":"" }`} >Gastroenterologist</p>
          <p onClick={()=>speciality==="Pediatricians"?navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`border  w-[200px] border-gray-300 py-1.5 px-3 cursor-pointer rounded-md ${speciality==="Pediatricians"?"bg-indigo-100 text-black":"" }`}>Pediatricians</p>
        </div>
        <div className=" w-full grid  grid-cols-auto gap-4 gap-y-6 ">
          {
            filterDoc.map((item, index) => (
           <div 
             onClick={() => navigate(`/appointments/${item._id}`)} 
             key={index} 
             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
           >
             <img className="bg-blue-50" src={item.image} alt="Doctor" />
             <div className="flex flex-col py-4 px-4">
               <div className="flex items-center gap-2">
               <p className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-600" } rounded-full`}></p>
               <p className={`${item.available ? "text-green-500" : "text-gray-600"}`}>{item.available ?"Available":"Unavailable"}</p>
               </div>
               <p className="text-xl font-medium">{item.name}</p>
               <p className="text-sm text-gray-500">{item.speciality}</p>
             </div>
           </div>
         ))
          }
        </div>
      </div>
    </div>
  );
};

export default Doctors;
