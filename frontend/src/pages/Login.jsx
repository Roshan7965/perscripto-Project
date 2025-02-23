import {useContext, useState} from 'react'
import { Appcontext } from '../context/AppContext';
import { toast } from "react-toastify";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {backendUrl,token,setToken}=useContext(Appcontext);
  const[state,setState]=useState("Sign Up");
  const[email,setEmail]=useState('');
  const[name,setName]=useState('');
  const[password,setPassword]=useState('');

  console.log(token);

  const navigate=useNavigate();
 

  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try
    {
      if(state==="Sign Up"){
        
        const {data}=await axios.post(backendUrl+"/api/user/register",{name,password,email});
        if(data.success){
          localStorage.setItem("token",data.token);
          setToken(data.token);
          navigate('/');
          
        }else{
          console.log(data.message);
          toast.error(data.message);
        }
      }
      else if(state==="Login"){
        
        const {data}=await axios.post(backendUrl+'/api/user/login',{email,password});
        if(data.success){
          localStorage.setItem("token",data.token);
          setToken(data.token);
          toast.success("login successfully");
          navigate('/');
          
        }else{
          console.log(data.message);
          toast.error(data.message);
        }
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center ">
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold' >{state ==='Sign Up'? "Create Account":"Login"}</p>
        <p className=''>Please {state ==='Sign Up'? "sign up":"log in"} to took appointment</p>
        {
          state==="Sign Up" && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setName(e.target.value)} value={name} required/>
        </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        </div>
        <button  type = 'submit' className='w-full py-2 my-2  bg-primary text-base text-white rounded-md'>{state==='Sign Up'?"Create Account":"Login"}</button>
        {
          state === "Sign Up" 
          ? <p>Already have an account ?<span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          :<p>Create an new account ?<span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span> </p>

        }
      </div>
    </form>
  )
}

export default Login