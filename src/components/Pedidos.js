import React, { useEffect, useRef, useState } from 'react';
import api from '../services/api';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    clickSoundRef.current = new Audio('/mario-bros-lose-life.mp3');
    fetchPedidos();
  }, []);

  const reproducirSonido = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Reinicia el sonido si está en reproducción
      clickSoundRef.current.play();
    }
  };

  const fetchPedidos = async () => {
    try {
      const res = await api.get('/pedidos');
      setPedidos(res.data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await api.put(`/pedidos/${id}`, { estado: nuevoEstado });
      fetchPedidos();
    } catch (error) {
      console.error('Error al actualizar estado', error);
    }
  };

  const eliminarPedido = async (id) => {
    try {
      await api.delete(`/pedidos/${id}`);
      fetchPedidos();
    } catch (error) {
      console.error('Error al eliminar pedido', error);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '27px 900px ', marginleft: '2rem auto' }}>
      <h2>Lista de Pedidos</h2>

      {pedidos.length === 0 ? (
        <p style={{ color: '#aaa' }}>No hay pedidos registrados.</p>
      ) : (
        pedidos.map(pedido => {
          const totalCalculado = pedido.productos.reduce(
            (acc, prod) => acc + prod.cantidad * prod.precio_unitario,
            0
          );

          return (
            <div
              key={pedido._id}
              style={{
                border: '2px solid #00ffcc',
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                boxShadow: '0 0 20px #00ffcc50',
                padding: '1.5rem',
                marginBottom: '2rem',
                animation: 'fadeIn 1s ease-in-out'
              }}
            >
              <h3>Pedido #{pedido._id}</h3>
              <p><strong>Cliente:</strong> {pedido.cliente.nombre}</p>
              <p><strong>Correo:</strong> {pedido.cliente.correo}</p>
              <p><strong>Teléfono:</strong> {pedido.cliente.telefono}</p>
              <p><strong>Dirección:</strong> {pedido.cliente.direccion}</p>
              <p><strong>Estado:</strong> <span style={{ color: '#00ffcc' }}>{pedido.estado}</span></p>

              <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                <h4 style={{ color: '#00ffcc' }}>Productos:</h4>
                <ul>
                  {pedido.productos.map((prod, idx) => (
                    <li key={idx}>
                      {prod.nombre} - {prod.cantidad} x ${prod.precio_unitario} = <strong>${(prod.cantidad * prod.precio_unitario).toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#00ffcc' }}>
                <strong>Total:</strong> ${totalCalculado.toFixed(2)}
              </p>

              <div style={{ marginTop: '1.5rem' }}>
                <label htmlFor={`estado-${pedido._id}`} style={{ marginRight: '0.5rem' }}>Actualizar Estado:</label>
                <select
                  id={`estado-${pedido._id}`}
                  value={pedido.estado}
                  onChange={e => actualizarEstado(pedido._id, e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="procesando">Procesando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                </select>
              </div>

              <button
                style={{ marginTop: '1.5rem' }}
                onClick={() => {
                  reproducirSonido();
                  eliminarPedido(pedido._id);
                }}
              >
                Eliminar Pedido
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Pedidos;

