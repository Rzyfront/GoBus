import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBoletos, deleteBoleto } from "../features/boletosSlice";

const Ventas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { boletos, status, error } = useSelector((state) => state.boletos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBoletos());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este boleto?")) {
      dispatch(deleteBoleto(id));
    }
  };

  const handleCreate = () => {
    navigate("/pos");
  };

  const handleEdit = (id) => {
    navigate(`/boletos/${id}/editar`);
  };

  return (
    <div className="p-6 bg-slate-200 w-[100%] h-[100%]">
      <h1 className="text-2xl font-bold mb-6">Historial de Ventas</h1>
      <div className="mb-4 w-100 flex justify-end">
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Crear Nuevo Boleto
        </button>
      </div>

      {status === 'loading' && <p>Cargando boletos...</p>}
      {(status === 'failed') && <p className="text-red-500">Error: {error}</p>}

      {boletos.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Pasajero</th>
              <th className="py-3 px-6 text-left">Viaje ID</th>
              <th className="py-3 px-6 text-left">Asiento</th>
              <th className="py-3 px-6 text-left">Precio</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {boletos.map((boleto) => (
              <tr
                key={boleto.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-6">{boleto.id}</td>
                <td className="py-3 px-6">
                  {boleto.pasajero?.nombre} ({boleto.pasajero?.documento_identidad})
                </td>
                <td className="py-3 px-6">
                  {boleto.viaje}
                </td>
                <td className="py-3 px-6">{boleto.asiento}</td>
                <td className="py-3 px-6">{boleto.precio}</td>
                <td className="py-3 px-6">{boleto.estado}</td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    onClick={() => handleEdit(boleto.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(boleto.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay boletos registrados.</p>
      )}
    </div>
  );
};

export default Ventas;