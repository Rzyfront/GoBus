import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchViajes } from "../features/viajesSlice"; // Traemos la acción asincrónica
import { FaSearch } from "react-icons/fa";

const Pos = () => {
  const dispatch = useDispatch();
  
  // Obtener el estado de viajes desde Redux
  const { viajes, loading, error } = useSelector((state) => state.viajes);

  const token = localStorage.getItem("access_token");

  // Hacer la solicitud para obtener los viajes cuando el componente se monta
  useEffect(() => {
    dispatch(fetchViajes(token)); // Disparar la acción para cargar los viajes
  }, [dispatch]);

  // Mostrar loading mientras los viajes se están obteniendo
  if (loading) {
    return <div>Cargando viajes...</div>;
  }

  // Mostrar un mensaje de error si ocurre un problema
  if (error) {
    return <div>Error al cargar los viajes: {error}</div>;
  }

  return (
    <div 
    style={{
              backgroundImage: "url('/fondo.webp')", // Ruta de la imagen de fondo
              backgroundSize: "cover", // Asegura que la imagen cubra todo el fondo
               backgroundPosition: "center", // Centra la imagen
               backgroundAttachment: "fixed" // Fija la imagen mientras se desplaza la página
             }}
    className="p-6 bg-gray-100 w-[100%] h-[100%]"
    >
      <h1 className="text-center text-4xl font-bold m-10">Buscar Viaje</h1>
 
      {/* Filtros */}
       <div className="flex justify-center flex-col sm:flex-row sm:gap-6 sm:items-center mb-6">
         <input
           type="text"
           placeholder="Origen"
           className="px-4 py-2 border border-gray-300 rounded-lg mb-4 sm:mb-0"
         />
         <input
           type="text"
           placeholder="Destino"
           className="px-4 py-2 border border-gray-300 rounded-lg mb-4 sm:mb-0"
         />
         <input
           type="date"
           className="px-4 py-2 border border-gray-300 rounded-lg"
         />
         <button
           className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
           onClick={() => {
             console.log("Buscando...");
           }}
         >
           <FaSearch />
           Buscar
         </button>
       </div>


        {/* Mostrar los viajes como tarjetas */}
        {viajes.length > 0 ? (
      <div className="grid grid-cols-3 gap-4 mt-10">
          {viajes.map((viaje) => (
            <div key={viaje.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold"><span className="font-bold">Origen: </span> {viaje.ruta.origen}</h3>
              <h3 className="font-semibold mb-2"><span className="font-bold">Destino: </span> {viaje.ruta.destino}</h3>
              <p>Fecha: {viaje.fecha_viaje}</p>
              <p>Hora: {viaje.hora_salida}</p>

              <p className="font-semibold mt-2">Tipo de servicio: {viaje.bus.tipo == 'ES' ? 'Especial' : viaje.bus.tipo == 'EJ' ? 'Ejecutivo' : 'Vip' }</p>
              <p className="font-semibold">Precio: {viaje.precio}</p>
              {/* Puedes agregar más detalles de cada viaje aquí */}
            </div>
          ))}
      </div>
        ) : (
          <div className="w-[100%] flex items-center justify-center mt-10">
          <p>No se encontraron viajes que coincidan con la búsqueda.</p>
          </div>
        )}
    </div>
  );
};

export default Pos;

