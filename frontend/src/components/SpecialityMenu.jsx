import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col gap-4 items-center py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="w-1/3 text-sm text-center">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex gap-4 pt-5 sm:justify-center w-full overflow-scroll ">
        {specialityData.map((item, index) => {
          return (
            <Link onClick={()=>scrollTo(0,0)}
              className="flex flex-col items-centre flex-shrink-0 text-xs cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
              to={`./doctors/${item.speciality}`}
            >
              <img className="w-24" src={item.image} alt="image" />
              <p>{item.speciality}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;
