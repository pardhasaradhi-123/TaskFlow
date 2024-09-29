import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../assets/data_not_found.json";
import Navbar from "./Navbar";
import ToDoForm from "../pages/AddTask";
import Cookies from "js-cookie";
import Aos from "aos";

const ToDoData = () => {
  const [toDo, setToDo] = useState([]);
  const [myProfile, setmyProfile] = useState([]);
  const [isClose, setIsClose] = useState(false);

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

  const fetchListData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/task/getTasks/${myProfile._id}`,
        {
          method: "GET",
          headers: { "x-token": jwtToken },
        }
      );
      if (res.ok) {
        const list = await res.json();
        setToDo(list);
      } else {
        console.error(res.text());
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/task/deleteTask/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: myProfile.email }),
        }
      );
      if (res.ok) {
        const list = await res.json();
        toast.error(`${list.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchListData();
      } else {
        console.log(res.text());
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      let newToDo;
      const res = await fetch(
        `http://localhost:5000/api/v1/task/updateTask/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newToDo),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchMyProfileData();
    if (myProfile._id) {
      fetchListData();
    }
  }, [myProfile._id]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="mt-[100px] flex flex-col justify-center items-center">
          <div className=" w-full flex justify-end items-center p-3">
            <button
              className="flex justify-center items-center gap-1 uppercase bg-green-500 hover:bg-green-600 p-3 text-white rounded-md font-medium"
              onClick={() => {
                setIsClose(true);
              }}
            >
              <IoMdAdd size={25} />
              new task
            </button>
          </div>
          <div>
            {toDo.length === 0 ? (
              <div className="h-[450px] w-screen flex justify-center items-center">
                <div className="text-center">
                  <Lottie
                    animationData={animationData}
                    className="h-[400px]"
                    loop={true}
                  />
                  <p className="text-2xl text-gray-600 font-bold">
                    No Data Found
                  </p>
                </div>
              </div>
            ) : (
              toDo?.map((eachToDo, index) => {
                return (
                  <div
                    key={eachToDo._id}
                    className="flex justify-center items-center w-screen xl:w-[1400px] bg-indigo-50 mb-4 p-3 rounded-md"
                    data-aos="fade-up"
                  >
                    <div className="w-full grid grid-cols-2 gap-5 max-sm:flex max-sm:flex-col">
                      <div className="flex items-center gap-2">
                        <p className="font-bold">{index + 1}.</p>
                        <div className="w-full p-2">
                          <h1 className="font-semibold p-3">
                            {eachToDo.title}
                          </h1>
                          <p className="w-full">{eachToDo.body}</p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center gap-12 max-sm:w-full max-sm:justify-around">
                        <button
                          onClick={() => {
                            handleDelete(eachToDo._id);
                          }}
                        >
                          <FaTrash size={28} color="red" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {isClose && <ToDoForm isClose={isClose} setIsClose={setIsClose} />}
        </div>
      </div>
    </>
  );
};

export default ToDoData;
