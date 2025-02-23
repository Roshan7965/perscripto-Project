import { useContext, useState } from "react";
import { Appcontext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData,backendUrl,token,loadUserProfile } = useContext(Appcontext);
  
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  
  const updateUserProfileData=async()=>{
    
    try {
      console.log("first")
      const formData=new FormData();
      formData.append('name',userData.name);
      formData.append('dob',userData.dob);
      formData.append('gender',userData.gender);
      formData.append('phone',userData.phone);
      formData.append('address',JSON.stringify(userData.address));
      
      image && formData.append('image',image);
      
      const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}});
      
      if(data.success){
        toast.success(data.message);
        await loadUserProfile();
        setIsEdit(false);
        setImage(false);
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error);
    }
  }

  return (
    userData && (
      <div className="flex flex-col">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer ">
              <img className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              /> 
              <img className="w-10 absolute bottom-12 right-12  " src={image ? "" : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <img
            className="max-w-36 rounded-md mt-10 mb-10"
            src={userData.image}
            alt=""
          />
        )}

        {isEdit ? (
          <input  
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
          />
        ) : (
          <p className=" text-xl font-semibold">{userData.name}</p>
        )}
        <hr className="w-2/3 h-[1.1px] bg-gray-500 font-medium my-4 " />
        <div className="text-gray-500 flex flex-col">
          <p className="text-sm underline font-light">CONTACT INFORMATION</p>
          <div className="flex gap-16 text-sm my-2 items-baseline">
            <p className="text-gray-900">Email Id:</p>
            <p className="underline text-primary ">{userData.email}</p>
          </div>
          <div className="flex gap-20 text-sm my-2 items-baseline">
            <p className="text-gray-900">Phone:</p>
            {isEdit ? (
              <input
               className="bg-gray-200"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={userData.phone}
              />
            ) : (
              <p className="text-sm ml-2 underline text-primary ">
                {userData.phone}
              </p>
            )}
          </div>
          <div className="flex gap-16 text-sm my-2 items-baseline">
            <p className="text-gray-900">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-200 mb-1"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                />
                <br />
                <input
                  className="bg-gray-200"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                />
              </p>
            ) : (
              <p>
                <p>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              </p>
            )}
          </div>
        </div>
        <div className="text-gray-500 flex flex-col">
          <p className="text-sm underline font-light mt-5 mb-3">
            BASIC INFORMATION
          </p>
          <div className="flex gap-16 text-sm my-2 items-baseline">
            <p className="text-gray-800">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-200"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="">{userData.gender}</p>
            )}
          </div>
          <div className="flex gap-14 text-sm my-2 items-baseline">
            <p className="text-gray-800">Birthday:</p>
            {isEdit ? (
              <input
                className="bg-gray-200"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-5">
          {isEdit ? (
            <button
              className="py-2 px-5  rounded-full border border-primary hover:bg-primary hover:text-white transition-all duration-500"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="py-2 px-5 rounded-full  border border-primary  hover:bg-primary hover:text-white transition-all duration-500"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
