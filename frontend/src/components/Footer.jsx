import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="mx-5 sm:mx-0">
      <div className="flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left section */}
        <div className="">
          <img className="mb-5 w-40" src={assets.logo}></img>
          <p className=" w-full md:w-2/3 text-sm text-gray-700 leading-6 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat,
            vel fuga? Dolor soluta atque perferendis eaque ipsum inventore minus
            necessitatibus corporis quis rerum vel quod nam, odio ratione,
            perspiciatis sapiente.
          </p>
        </div>
        {/* Middle section  */}
        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col text-sm text-gray-700 gap-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy policy </li>
          </ul>
        </div>
        {/* right section  */}
        <div >
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col text-sm text-gray-700 gap-2">
            <li>+91-000-000-000</li>
            <li>tanpureroshan3517@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* Copyright text */}
     
      <div >
      
        <hr className="border-none outline-none h-[0.3px] w-full bg-gray-400" />
        <p className=" py-5 text-center text-gray-700">Copyright 2024 @ RoshanTanpure.dev - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
