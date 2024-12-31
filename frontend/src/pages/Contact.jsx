import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-gray-500 text-center w-full pt-10 text-2xl font-medium">
        <p>
          CONTACT <span className="text-gray-700  font-semibold">US</span>{" "}
        </p>
      </div>
      <div className="flex flex-col justify-center w-full  md:items-start  md:flex-row gap-12 mt-5">
        <img className=" w-4/5 md:max-w-[360px] " src={assets.contact_image} />
        <div className="flex flex-col items-start ">
          <p className="text-gray-600 text-md font-semibold my-5">OUR OFFICE</p>
          <p className="text-gray-400 text-sm mb-6">Raut Plzaa Bvcoel Lavale  <br></br>Pune </p>
         
          <div className="flex flex-col mb-5 text-sm text-gray-400">
            <p className="">Tel: (000) 000-0000</p>
            <p>Email: tanpureroshan3517@gmail.com</p>
          </div>
          <p className="text-gray-600 text-md font-semibold mb-8">CAREERS AT PRESCRIPTO</p>
          <p className="text-gray-400 text-sm mb-6">Learn more about our teams and job openings.</p>
          <button className="py-3 px-4 border border-gray-900 hover:bg-black hover:text-white transition-all duration-500 ">Explore job</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
