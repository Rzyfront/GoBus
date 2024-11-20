import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

// Simulación de viajes (puedes reemplazarlo con datos reales o hacer una llamada a la API)
const tripsData = [
  { id: 1, origen: "Bogotá", destino: "Medellín", fecha: "2024-11-20", descripcion: "Viaje 1" },
  { id: 2, origen: "Cali", destino: "Cartagena", fecha: "2024-11-21", descripcion: "Viaje 2" },
  { id: 3, origen: "Barranquilla", destino: "Santa Marta", fecha: "2024-11-22", descripcion: "Viaje 3" },
  { id: 4, origen: "Medellín", destino: "Cali", fecha: "2024-11-23", descripcion: "Viaje 4" },
  { id: 5, origen: "Bogotá", destino: "Cali", fecha: "2024-11-24", descripcion: "Viaje 5" },
  // Agrega más viajes si lo deseas
];

const Pos = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [allTrips, setAllTrips] = useState(tripsData);

  useEffect(() => {
    // Si no hay filtros, muestra los últimos 15 viajes
    if (!origen && !destino && !fecha) {
      setFilteredTrips(allTrips.slice(0, 15)); // Muestra los primeros 15 viajes
    } else {
      // Filtra los viajes según los criterios
      setFilteredTrips(
        allTrips.filter(
          (trip) =>
            (origen ? trip.origen.toLowerCase().includes(origen.toLowerCase()) : true) &&
            (destino ? trip.destino.toLowerCase().includes(destino.toLowerCase()) : true) &&
            (fecha ? trip.fecha === fecha : true)
        )
      );
    }
  }, [origen, destino, fecha, allTrips]);

  return (
    <div 
    style={{
        backgroundImage: "url('/fondo.webp')", // Ruta de la imagen de fondo
        backgroundSize: "cover", // Asegura que la imagen cubra todo el fondo
        backgroundPosition: "center", // Centra la imagen
        backgroundAttachment: "fixed" // Fija la imagen mientras se desplaza la página
      }}
    className="p-6 bg-gray-100 w-[100%] h-[100%]">
      <h2 className="text-2xl font-bold text-center mt-10 mb-4">Buscar Viaje</h2>

      {/* Filtros */}
      <div className="flex justify-center flex-col sm:flex-row sm:gap-6 sm:items-center mb-6">
        <input
          type="text"
          placeholder="Origen"
          className="px-4 py-2 border border-gray-300 rounded-md mb-4 sm:mb-0"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destino"
          className="px-4 py-2 border border-gray-300 rounded-md mb-4 sm:mb-0"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button
          className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => {
            // Este es el trigger para hacer la búsqueda
            console.log("Buscando...");
          }}
        >
          <FaSearch />
          Buscar
        </button>
      </div>

      {/* Lista de viajes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-20">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <div key={trip.id} className="bg-white p-4 rounded-md shadow-lg">
              <h3 className="font-semibold text-lg">{trip.descripcion}</h3>
              <p><strong>Origen:</strong> {trip.origen}</p>
              <p><strong>Destino:</strong> {trip.destino}</p>
              <p><strong>Fecha:</strong> {trip.fecha}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron viajes que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default Pos;
