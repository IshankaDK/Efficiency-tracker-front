import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <body className="bg-gray-10 ">
       <div className="flex justify-center h-screen w-screen items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center " >
            <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">LOGIN</h1>
            <div className="w-3/4 mb-6">
                <input type="email" name="email" id="email" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="User Name"/>
            </div>
            <div className="w-3/4 mb-6">
                <input type="password" name="password" id="password" className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 " placeholder="Password"/>
            </div>
            <div className="w-3/4 flex flex-row justify-between">
            </div>
            <div className="w-3/4 mt-4">
                <button type="submit" className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"> LOGIN</button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Don't have an account?</span>
              <Link to="/register"
                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign
                up</Link>
            </p>
        </div>
       </div>
    </body>
  );
};

export default Login;
