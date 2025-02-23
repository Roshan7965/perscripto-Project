import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-gray-500 text-center w-full pt-10 text-2xl font-medium">
        <p>
          ABOUT<span className="text-gray-700 ml-2 font-semibold">US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 my-10 ">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 ">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-600">Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      {/* section Why choose Us */}
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold"> CHOOSE US</span>
        </p>
      </div>
      <div className=" w-full flex flex-col md:flex-row flex-shrink-0 ">
        <div className="border text-gray-600 py-16 px-16 flex flex-col items-start gap-5 hover:bg-primary border border-gray-200  hover:text-white">
          <p className=" font-bold">EFFICIENCY:</p>
          <p className=" text-sm">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border text-gray-600 py-16 px-16 flex flex-col items-start gap-5 hover:bg-primary border border-gray-200  hover:text-white">
          <p className=" font-bold">CONVENIENCE:</p>
          <p className=" text-sm">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border text-gray-600 py-16 px-16 flex flex-col items-start gap-5 hover:bg-primary border border-gray-200  hover:text-white">
          <p className=" font-bold">PERSONALIZATION:</p>
          <p className=" text-sm">
          Tailored recommendations and reminders to help you stay on top of your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
