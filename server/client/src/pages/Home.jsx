import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const jwtToken = Cookies.get("token");

  return (
    <>
      <div>
        <Navbar />
        <div className="mt-[100px] h-[500px] flex flex-col gap-3 justify-center items-center">
          <p className="text-xl max-sm:text-lg text-center">
            Organize, prioritize, and track your to-dos effortlessly with
            <strong> TaskFlow</strong> – your ultimate productivity companion
          </p>
          <Link to={`${jwtToken ? "/to-do-list" : "/auth"}`}>
            <button class="bg-purple-600 hover:bg-purple-700 text-white font-medium p-4 rounded tracking-wide">
              Create Task
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
