import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchViajes } from "../features/viajesSlice";
import { crearBoleto } from "../features/boletosSlice";
import { FaSearch } from "react-icons/fa";

const Pos = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [selectedViaje, setSelectedViaje] = useState(null); // Viaje seleccionado
  const [pasajero, setPasajero] = useState({
    nombre: '',
    documento: '',
    asiento: 0,
    estado: 'reservado',
  });

  // Obtener el estado de viajes desde Redux
  const { viajes, loading, error } = useSelector((state) => state.viajes);
  const { loading: creatingBoleto, error: boletoError } = useSelector(
    (state) => state.boletos
  );
  // Hacer la solicitud para obtener los viajes cuando el componente se monta
  useEffect(() => {
    dispatch(fetchViajes()); // Disparar la acción para cargar los viajes
  }, [dispatch]);

  // Mostrar loading mientras los viajes se están obteniendo
  if (loading) {
    return <div>Cargando viajes...</div>;
  }

  // Mostrar un mensaje de error si ocurre un problema
  if (error) {
    return <div>Error al cargar los viajes: {error}</div>;
  }

  const handleCardClick = (viaje) => {
    setSelectedViaje(viaje); // Establecer el viaje seleccionado
    setShowModal(true); // Mostrar el modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedViaje(null); // Limpiar el viaje seleccionado
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasajero({ ...pasajero, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Disparar la acción para crear el boleto
    dispatch(crearBoleto({viaje: selectedViaje, pasajero}));
    handleModalClose(); // Cerrar el modal después de la acción
  };

  return (
    <div
      style={{
        backgroundImage: "url('/fondo.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="p-6 bg-gray-100 w-[100%] h-[100%]"
    >
      <h1 className="text-center text-4xl font-bold mt-5 mb-10">Buscar Viaje</h1>

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
            <div
              key={viaje.id}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-slate-200 hover:shadow-xl"
              onClick={() => handleCardClick(viaje)} // Al hacer clic, abre el modal
            >
              <h3 className="font-semibold">
                <span className="font-bold">Origen: </span> {viaje.ruta.origen}
              </h3>
              <h3 className="font-semibold mb-2">
                <span className="font-bold">Destino: </span> {viaje.ruta.destino}
              </h3>
              <p>Fecha: {viaje.fecha_viaje}</p>
              <p>Hora: {viaje.hora_salida}</p>

              <p className="font-semibold mt-2">
                Tipo de servicio:{" "}
                {viaje.bus.tipo === "ES"
                  ? "Especial"
                  : viaje.bus.tipo === "EJ"
                  ? "Ejecutivo"
                  : "Vip"}
              </p>
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

      {/* Modal */}
      {showModal && selectedViaje && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleModalClose}
        >
          <div
            className="bg-white p-6 rounded-lg w-1/3"
            onClick={(e) => e.stopPropagation()} // Evitar que el click en el modal lo cierre
          >
            <h2 className="text-2xl font-semibold mb-4">Venta de Boleto</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2">Documento de Identidad</label>
                <input
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4"
                  placeholder="Ingrese el documento"
                  name="documento"
                  value={pasajero.documento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Nombre</label>
                <input
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4"
                  placeholder="Ingrese el nombre"
                  name="nombre"
                  value={pasajero.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Asiento</label>
                <input
                  type="numbre"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4"
                  placeholder="Ingrese el número de asiento"
                  name="asiento"
                  value={pasajero.asiento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Tipo de Boleto</label>
                <select
                  name="estado"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4"
                  value={pasajero.estado}
                  onChange={handleInputChange}
                >
                  <option value="reservado">Reservado</option>
                  <option value="confirmado">Confirmado</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={creatingBoleto}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {creatingBoleto ? 'Creando...' : 'Comprar Boleto'}
              </button>
              <button
                type="button"
                className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={handleModalClose}
              >
                Cancelar
              </button>
            </form>
            {boletoError && (
              <div className="text-red-500 mt-4">
                <p>Error: {boletoError}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pos;


