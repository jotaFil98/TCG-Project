import React from 'react';

function Tienda() {
  const productos = [
    { id: 1, nombre: "Sobre Básico", precio: 100, descripcion: "3 cartas comunes." },
    { id: 2, nombre: "Sobre de Élite", precio: 300, descripcion: "Incluye 1 rara garantizada." },
    { id: 3, nombre: "Pack de Iniciación", precio: 500, descripcion: "10 cartas y 50 monedas extra." }
  ];

  return (
    <main className="shop-dashboard">
      <header className="shop-header">
        <h1>Tienda</h1>
        <div className="wallet">
          <span>Saldo: <strong>1,250 🪙</strong></span>
        </div>
      </header>

      <section className="products-grid">
        {productos.map((prod) => (
          <div key={prod.id} className="product-card">
            <h3>{prod.nombre}</h3>
            <p>{prod.descripcion}</p>
            <div className="price-tag">{prod.precio} 🪙</div>
            <button className="boton-buy">Comprar</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Tienda;