import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaPlusCircle, FaEdit, FaTrashAlt, FaListAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    {
      para: "Create new tasks quickly to stay organized.",
      icon: <FaPlusCircle size={35} />,
      bgColor: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      para: "Edit and update tasks to adapt to changing priorities.",
      icon: <FaEdit size={35} />,
      bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
    },
    {
      para: "Delete tasks once they’re completed or no longer needed.",
      icon: <FaTrashAlt size={35} />,
      bgColor: "bg-gradient-to-r from-red-400 to-red-600",
    },
    {
      para: "View all your tasks in one place with a clean, user-friendly interface.",
      icon: <FaListAlt size={35} />,
      bgColor: "bg-gradient-to-r from-gray-400 to-gray-600",
    },
  ];

  return (
    <>
      <div>
        <Navbar />
        <div className="mt-[100px] h-screen max-sm:h-auto p-5">
          <div className="flex flex-col justify-center items-center">
            <LuListTodo size={75} color="indigo" />
            <p className="text-center p-4 text-lg">
              Welcome to <span className="font-bold">TaskFlow</span>, your go-to
              solution for staying organized and productive. Our mission is
              simple: to help you manage your tasks effortlessly so you can
              focus on what truly matters.
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold">
              With an intuitive interface and powerful features, TaskFlow allows
              you to:
            </p>
            <ul className="p-4 grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
              {features.map((eachFeature, index) => {
                return (
                  <li
                    key={index}
                    className={`cursor-pointer p-3 rounded-lg flex flex-col gap-9 justify-center items-center tracking-wide ${eachFeature.bgColor} transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                    data-aos="fade-up"
                  >
                    {eachFeature.icon}
                    {eachFeature.para}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
