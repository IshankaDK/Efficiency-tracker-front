import React, { useState } from "react";
import PageHeader from "../PageHeader";
const user = {
  name: "John Doe",
  username: "johndoe",
  password: "mypassword",
  picture: "https://randomuser.me/api/portraits/med/men/20.jpg",
};

const Profile = () => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [picture, setPicture] = useState(user.picture);

  const handleUpdate = (event) => {
    event.preventDefault();
    onUpdate({ name, username, password, picture });
  };

  const onUpdate = (name, username, password, picture) => {
    console.log(name, username, password, picture);
  };
  return (
    <>
      <PageHeader title={"Your Profile"} />
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <img
            className="rounded-full h-20 w-20 mx-auto"
            src={picture}
            alt="Profile"
          />
        </div>
        <form onSubmit={handleUpdate}>
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
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-4">
          <label
            htmlFor="picture"
            className="block text-gray-700 font-bold mb-2"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={(e) => setPicture(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
