import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { doctors } from "../assets/assets_frontend/assets";

export const Appcontext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      console.log(data);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
        
      } else {
        setUserData(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    getAllDoctors();
  }, []);

  useEffect(() => {
    loadUserProfile();
  }, [token]);
  
  const value = {
    doctors,getAllDoctors,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfile,
  };
  return (
    // eslint-disable-next-line react/prop-types
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};

export default AppContextProvider;
