
import { assets } from '../assets/assets_frontend/assets'

const header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/* Left part */}
        <div className='md:w-1/2 flex  flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className=' text-3xl md:text-4xl lg:text-5xl  text-white font-semibold leading-tight md:leading-tight lg:leading-tight '>Book Appointment<br/>With Trusted Doctors</p>
            <div className='flex flex-col md:flex-row items-center text-white  gap-3 text-sm font-light' >
                <img  className="w-28" src={assets.group_profiles} alt="groupImage"/>
                <p >Simply browse through our extensive list of trusted doctors, <br className='hidden  sm:block'/>schedule your appointment hassle-free.</p>
            </div>
            <a href="#speciality" className='flex gap-2 items-center  py-3 px-8 rounded-full text-gray-600 text-sm  bg-white m-auto md:m-0 
                hover:scale-105 transition-all duration-300'  >
                BooK appointment  <img className='w-3' src={assets.arrow_icon}></img>
            </a>

        </div>

        {/* right part */}
        <div className="md:w-1/2 relative ">
            <img className='w-full md:absolute  bottom-0  h-auto  rounded-lg' src={assets.header_img} alt="appointmentImg"/>
        </div>
    </div>
  )
}

export default header