import axios from "axios";
import cryptoJs from "crypto-js";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../apiURL";
import PageHeader from "../PageHeader";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordFromDB, setOldPasswordFromDB] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = () => {
    if (oldPassword != null && password != null) {
      if (cryptoJs.SHA256(oldPassword).toString() === oldPasswordFromDB) {
        onUpdate(name, email, password);
      } else {
        enqueueSnackbar("Please enter correct password.", {
          variant: "error",
        });
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`${baseURL}/user/find`, {
        params: { user: localStorage.getItem("user") },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setName(res.data.username);
          setEmail(res.data.email);
          setOldPasswordFromDB(res.data.password);
        }
      })
      .catch((err) => console.log(err));
  };

  const onUpdate = (name, email, password) => {
    console.log(localStorage.getItem("user"));
    const data = {
      id: localStorage.getItem("user"),
      name: name,
      email: email,
      password: password,
    };
    console.log(data);
    axios
      .put(`${baseURL}/user/update`, data)
      .then((res) => {
        if (res.status == 200) {
          enqueueSnackbar("User updated.", {
            variant: "success",
          });
          getUser();
        }
      })
      .catch((err) => {
        enqueueSnackbar("User updated failed.Try again", {
          variant: "error",
        });
        getUser();console.log(err)});
  };
  return (
    <>
      <PageHeader title={"Your Profile"} />
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-20">
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="oldPassword"
              type="password"
              placeholder="********"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-4"></div>
          <div className="flex items-center justify-between">
            <button
              disabled={password == null}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleUpdate()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
