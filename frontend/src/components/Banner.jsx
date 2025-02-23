import { assets } from "../assets/assets_frontend/assets";

const Banner = () => {
  return (
    <div className="w-full flex items-center bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20  py-5">
        {/* left div */}
        <div className=" w-full flex items-center flex-col   md:w-1/2 md:items-start ">
            <div className= "  flex-col text-stone-50 text-3xl md:text-4xl lg:text-5xl sm:block items-center">
              <p >Book Appointment </p>
              <p className="md:mt-4 sm:mt-2 ">With 100+ Trusted Doctors</p>
            </div>
            <button className=" mt-10 md:px-8 md:py-4 px-6 py-3   bg-white text-gray-500 font-light  rounded-full">Create Account</button>
        </div>

        {/* right div */}
        <div className=" w-0 md:w-1/2 pt-10 px-3 flex items-center">
            <img className=" left-0 bottom-0 hidden md:block" src={assets.appointment_img}/>
        </div>
    </div>
  )
}

export default Banner;