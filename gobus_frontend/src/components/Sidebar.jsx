import React, { useState } from "react";
import {
  FaBus,
  FaRoute,
  FaUserTie,
  FaTicketAlt,
  FaBuilding,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // Asegúrate de que el slice esté correctamente importado

const Sidebar = ({ setActiveView }) => {
  const menuItems = [
    { name: "Punto de Venta", icon: <MdOutlinePointOfSale />, view: "pos" },
    { name: "Historial de venta", icon: <FaMoneyBillWave />, view: "historial" },
    { name: "Viajes", icon: <FaTicketAlt />, view: "viajes" },
    { name: "Rutas", icon: <FaRoute />, view: "rutas" },
    { name: "Terminales", icon: <FaBuilding />, view: "terminales" },
    { name: "Buses", icon: <FaBus />, view: "buses" },
    { name: "Conductores", icon: <FaUserTie />, view: "conductores" },
    { name: "Agencias", icon: <FaMapMarkedAlt />, view: "agencias" },
  ];

  const [active, setActive] = useState("pos");
  const dispatch = useDispatch();

  return (
    <div className="h-screen bg-gray-800 text-white w-50 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/gobus.webp"
            alt="Logo"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`mb-4 flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                active === item.view
                  ? "bg-blue-500 shadow-lg"
                  : "hover:bg-blue-500 hover:shadow-md"
              }`}
              onClick={() => {
                setActive(item.view);
                setActiveView(item.view);
              }}
            >
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          className="w-full flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition"
          onClick={() => {
            dispatch(logout()); // Ejecuta la acción de logout
          }}
        >
          <FaSignOutAlt />
          <span className="font-semibold">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
