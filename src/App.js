import React from 'react';
import Productos from './components/Productos';
import Clientes from './components/Clientes';
import Pedidos  from './components/Pedidos';
import NuevoPedido from './components/NuevoPedido';
import BuscarProducto from './components/BuscarProducto';
import ProductosSinStock from './components/ProductosSinStock';

function App() {
  return (
    <div>
      <Productos />
      <BuscarProducto />
      <ProductosSinStock />
      <Clientes />
      <Pedidos />
      <NuevoPedido />
    </div>
  );
}

export default App;
