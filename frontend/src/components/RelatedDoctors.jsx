import  { useContext,useState ,useEffect} from 'react'
import { Appcontext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ReleatedDoctors = ( arr) => {
    const {docId,speciality}=arr;
    const {doctors}=useContext(Appcontext);
    const [relatedDoc,setRelatedDoc]=useState([]);
    const navigate=useNavigate();

    const fetchDocInfo = async () => {
        const relatedDoc=doctors.filter((doc)=> doc.speciality ===speciality );
        setRelatedDoc(relatedDoc);
        
    };
    useEffect(() => {
        fetchDocInfo();
    }, [docId,speciality]);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-500">
    <h1 className="text-3xl text-medium text-black">Related Doctors</h1>
    <p className="w-1/3 text-sm text-center">simply browse through our extensive list of trusted doctors</p>
    <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 ">
      {
        relatedDoc.length && relatedDoc.map((item,index)=>(
          <div 
         onClick={() =>{ navigate(`/appointments/${item._id}`);
         scrollTo(0,0)}} 
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
  )
}

export default ReleatedDoctors;