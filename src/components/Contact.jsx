import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTiktok,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-md p-4">  <h2 className="text-3xl font-extrabold text-gray-900">
          About Efficiency Tracker
        </h2>
        <ul className="list-disc list-inside mb-4 mt-8">
          <li className="flex items-center mb-2">
            <FaEnvelope className="mr-2 text-blue-600" />
            <a
              href="mailto:example@example.com"
              className="text-blue-600 hover:underline"
            >
              example@example.com
            </a>
          </li>
          <li className="flex items-center mb-2">
            <FaFacebook className="mr-2 text-blue-600" />
            <a
              href="https://facebook.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @example
            </a>
          </li>
          <li className="flex items-center mb-2">
            <FaInstagram className="mr-2 text-pink-600" />
            <a
              href="https://instagram.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              @example
            </a>
          </li>
          <li className="flex items-center mb-2">
            <FaTiktok className="mr-2 text-black" />
            <a
              href="https://tiktok.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline"
            >
              @example
            </a>
          </li>
          <li className="flex items-center">
            <FaPhone className="mr-2 text-green-600" />
            <a
              href="tel:+1234567890"
              className="text-green-600 hover:underline"
            >
              (123) 456-7890
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
