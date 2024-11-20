import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Pos from "../components/Pos";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("pos");

  const renderView = () => {
    switch (activeView) {
      case "pos":
        return <Pos />;
      case "buses":
        return <div>Componente para Buses</div>;
      case "conductores":
        return <div>Componente para Conductores</div>;
      case "rutas":
        return <div>Componente para Rutas</div>;
      case "viajes":
        return <div>Componente para Viajes</div>;
      case "terminales":
        return <div>Componente para Terminales</div>;
      case "agencias":
        return <div>Componente para Agencias</div>;
      default:
        return <Pos />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* Usamos un estilo en línea para aplicar el cálculo */}
        <div
          className="bg-gray-100 flex-1 w-full"
          style={{ height: "calc(100vh - 60px)" }}
        >
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
