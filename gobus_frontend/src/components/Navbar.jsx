import React from "react";
import { useSelector } from 'react-redux';
const Navbar = () => {

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-900 text-white h-[60px] flex justify-end items-center px-6">
    {isAuthenticated && (
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold">{user.username}</h1>
        <img
          src="/user.webp" // Ruta de la imagen predeterminada
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    )}
  </div>
  );
};

export default Navbar;
