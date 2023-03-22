import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../apiURL";
import { useSnackbar } from "notistack";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function handleChange(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  }

  const login = async () => {
    const data = loginData;
    await axios
      .post(`${baseURL}/auth/login`, data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user", res.data._id);
          if (res.data.role === "Employer") {
            navigate("/dashboard-employer");
          } else if (res.data.role === "Employee") {
            navigate("/dashboard-employee");
          }else{
            navigate("/");
          }
        }
      })
      .catch((err) => {
        enqueueSnackbar("Login failed.Try again", {
          variant: "error",
        });
        console.log(err.response);
      });
  };
  return (
    <div className="bg-gray-10 ">
      <div className="flex justify-center h-screen w-screen items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center ">
          <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
            Efficiency Tracker Login
          </h1>
          <div className="w-3/4 mb-6">
            <input
              type="email"
              name="username"
              id="username"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
              placeholder="Name or User Name"
              onChange={handleChange}
            />
          </div>
          <div className="w-3/4 mb-6">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 "
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="w-3/4 flex flex-row justify-between"></div>
          <div className="w-3/4 mt-4">
            {/* <Link to="/dashboard"> */}
            <button
              type="button"
              className="py-4  w-full rounded text-blue-50 font-bold bg-blue-700 hover:bg-blue-500"
              onClick={() => login()}
            >
              {" "}
              LOGIN
            </button>
            {/* </Link> */}
          </div>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Don't have an account?</span>
            <Link
              to="/register"
              className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
