import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";

const Authentication = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const filteredFormData = isLogIn
    ? [
        {
          name: "email",
          type: "email",
          placeholder: "Enter your Email",
          label: "Email",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Enter your Password",
          label: "Password",
        },
      ]
    : [
        {
          name: "username",
          type: "text",
          placeholder: "Enter your Username",
          label: "Username",
        },
        {
          name: "email",
          type: "email",
          placeholder: "Enter your Email",
          label: "Email",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Enter your Password",
          label: "Password",
        },
      ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isLogIn) {
      if (!formData.username) newErrors.username = "Username is required";
    }
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailPattern.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    const sign = async () => {
      try {
        const res = await fetch(
          `${
            isLogIn
              ? "http://localhost:5000/api/v1/auth/sign"
              : "http://localhost:5000/api/v1/auth/register"
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (res.ok) {
          const result = await res.json();
          if (isLogIn) {
            Cookies.set("token", result.token, { expires: 7 });
            navigate("/");
          } else {
            setIsLogIn(!isLogIn);
          }
        } else {
          const errorText = await res.text();
          toast.error(`${errorText}`);
        }
      } catch (err) {
        toast.error(`${err.message}`);
      }
    };

    sign();
    setFormData({ username: "", email: "", password: "" });
  };
  return (
    <>
      <Navbar />
      <div className="pt-[200px] pb-[60px] h-auto max-sm:pb-0 max-sm:pt-[100px] flex justify-center items-center bg-indigo-100">
        <div
          className={`bg-indigo-600 rounded-xl flex justify-center items-center gap-10 max-sm:flex-col max-sm:pl-0 max-sm:h-screen max-sm:rounded-none max-sm:w-screen ${
            isLogIn && "flex-row-reverse pl-0"
          } `}
        >
          <div className="max-w-96 text-gray-100 text-center p-5 text-xl tracking-wide">
            {isLogIn ? (
              <p>
                Stay organized and accomplish your goals with ease. Log in to
                manage your tasks, set priorities, and track your progress
                effortlessly!
              </p>
            ) : (
              <p>
                Stay on top of tasks with<strong> TaskFlow!</strong> Sign up to
                create, manage, and track your to-do lists effortlessly and
                achieve your goals faster.
              </p>
            )}
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center p-5 bg-white rounded-xl w-96">
                <div className="flex justify-center items-center">
                  <h1 className="font-bold capitalize text-2xl p-3">
                    {isLogIn ? "log in" : "Sign up"}
                  </h1>
                </div>
                {filteredFormData.map((eachInput, index) => {
                  return (
                    <div key={index} className="flex flex-col justify-center">
                      <label
                        htmlFor={eachInput.name}
                        className="font-semibold my-2 capitalize tracking-wide"
                      >
                        {eachInput.label} :
                      </label>
                      <input
                        name={eachInput.name}
                        type={eachInput.type}
                        value={formData[eachInput.name]}
                        onChange={handleChange}
                        placeholder={eachInput.placeholder}
                        className="rounded-md p-3 border-none bg-indigo-200 focus:outline-indigo-700 placeholder:text-black placeholder:tracking-wide"
                      />
                      {errors[eachInput.name] && (
                        <span className="text-red-500 text-sm">
                          {errors[eachInput.name]}
                        </span>
                      )}
                    </div>
                  );
                })}
                <button className="w-full p-3 mt-4 tracking-wide uppercase font-semibold bg-indigo-700 hover:bg-indigo-800 rounded-md text-white">
                  {isLogIn ? "log in" : "sign up"}
                </button>

                <div className="mt-4 text-sm ">
                  {isLogIn ? (
                    <p>
                      'Don't have an account'?
                      <span
                        onClick={() => {
                          setIsLogIn(!isLogIn);
                          setErrors({});
                        }}
                        className="text-indigo-900 font-semibold cursor-pointer"
                      >
                        {" "}
                        Create an Account
                      </span>
                    </p>
                  ) : (
                    <p>
                      Already have an account?
                      <span
                        onClick={() => {
                          setIsLogIn(!isLogIn);
                          setErrors({});
                        }}
                        className="text-indigo-900 font-semibold cursor-pointer"
                      >
                        {" "}
                        Log in
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
