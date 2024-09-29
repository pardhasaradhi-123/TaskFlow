import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";

const AddTask = ({ isClose, setIsClose }) => {
  const [message, setMessage] = useState({ title: "", body: "" });
  const [myProfile, setmyProfile] = useState();

  const jwtToken = Cookies.get("token");

  const fetchMyProfileData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/myProfile", {
        method: "GET",
        headers: { "x-token": jwtToken },
      });
      if (res.ok) {
        const data = await res.json();
        setmyProfile(data);
      } else {
        console.error(res.text());
      }
    } catch (err) {
      console.error(`${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.title === "" && message.body === "") {
      toast.warn("Enter a message !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      let newToDo = {
        title: message.title,
        body: message.body,
        email: myProfile.email,
      };
      const addTask = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/v1/task/addTask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newToDo),
          });
          const data = await res.json();
          return data;
        } catch (err) {
          console.error(err.message);
        }
      };
      addTask();
      setMessage({ title: "", body: "" });
      toast.success(`Data added !`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsClose(!isClose);
    }
  };
  useEffect(() => {
    fetchMyProfileData();
  }, []);

  return (
    <div className="w-screen h-screen bg-indigo-100 fixed top-0">
      <div className="h-full flex justify-around items-center p-5">
        <div className="border-2 p-5 bg-white rounded-lg w-96">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl capitalize">Add task</h1>
              <button
                onClick={() => {
                  setIsClose(!isClose);
                }}
              >
                <IoClose size={28} color="red" />
              </button>
            </div>
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="title" className="font-medium text-md capitalize">
                title :
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter a title"
                value={message.title}
                onChange={(e) => {
                  setMessage({ ...message, title: e.target.value });
                }}
                className="p-3 my-3 bg-indigo-100 focus:outline-indigo-600 outline-none rounded-md placeholder:tracking-wide"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="body" className="font-medium text-md capitalize">
                message :
              </label>
              <textarea
                name="body"
                placeholder="Enter a message"
                value={message.body}
                onChange={(e) => {
                  setMessage({ ...message, body: e.target.value });
                }}
                className="min-w-full max-w-full min-h-36 my-3 p-3 rounded-md max-h-40 border-none bg-indigo-100 focus:outline-indigo-600 placeholder:tracking-wide"
              ></textarea>
            </div>
            <button className="w-full bg-indigo-500 p-3 rounded-md text-white font-semibold hover:bg-indigo-600 uppercase">
              add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
