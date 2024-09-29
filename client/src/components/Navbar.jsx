import React from "react";
import { LuListTodo } from "react-icons/lu";
import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const jwtToken = Cookies.get("token");
  const navLinks = [
    {
      name: "home",
      path: "/",
      icon: <FaHome size={25} />,
    },
    { name: "about", path: "/about", icon: <FaInfoCircle size={25} /> },
    jwtToken
      ? {
          name: "to do",
          path: "/to-do-list",
          icon: <FcTodoList size={25} />,
        }
      : {},
    jwtToken
      ? {
          name: "log out",
          path: "/auth",
          icon: <FaSignOutAlt size={25} />,
          action: () => {
            Cookies.remove("token");
          },
        }
      : {
          name: "log in",
          path: "/auth",
          icon: <FaSignInAlt size={25} />,
        },
  ];

  return (
    <>
      <div className="fixed top-0 w-screen flex justify-around max-md:justify-between p-8 bg-white border-b-2">
        <Link to="/" className="flex justify-center items-center gap-3">
          <LuListTodo size={35} color="indigo" />
          <h1 className="max-md:hidden font-semibold text-2xl">TaskFlow</h1>
        </Link>
        <ul className="flex justify-center items-center gap-5 uppercase">
          {navLinks.map((eachNav, index) => {
            return (
              <Link
                to={eachNav.path}
                key={index}
                onClick={eachNav.action}
                className="flex justify-center items-center gap-2 p-2"
              >
                <p>{eachNav.icon}</p>
                <span className="max-md:hidden">{eachNav.name}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
