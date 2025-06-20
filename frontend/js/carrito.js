const cotizaciones = {
  USD: 1300, // ARS por USD
  EUR: 1400,
  ARS: 1
};

function actualizarTotales() {
  let total = 0;
  const filas = document.querySelectorAll("#carrito tbody tr");
  filas.forEach(fila => {
    const precio = parseFloat(fila.dataset.precio);
    const moneda = fila.dataset.moneda;
    const cantidad = parseInt(fila.querySelector(".cantidad").textContent);
    const subtotal = precio * cantidad;

    const simbolo = moneda === "EUR" ? "€" : "$";
    fila.querySelector(".subtotal").textContent = `${simbolo}${subtotal.toFixed(2)} ${moneda}`;

    total += subtotal * cotizaciones[moneda];
  });

  document.getElementById("total").textContent = `Total: $${total.toLocaleString()} ARS`;
}

document.querySelectorAll(".sumar").forEach(btn => {
  btn.addEventListener("click", () => {
    const cantidadElem = btn.parentElement.querySelector(".cantidad");
    cantidadElem.textContent = parseInt(cantidadElem.textContent) + 1;
    actualizarTotales();
  });
});

document.querySelectorAll(".restar").forEach(btn => {
  btn.addEventListener("click", () => {
    const cantidadElem = btn.parentElement.querySelector(".cantidad");
    let cantidad = parseInt(cantidadElem.textContent);
    if (cantidad > 0) {
      cantidadElem.textContent = cantidad - 1;
      actualizarTotales();
    }
  });
});

document.querySelectorAll(".eliminar").forEach(btn => {
  btn.addEventListener("click", () => {
    const fila = btn.closest("tr");
    fila.remove();
    actualizarTotales();
  });
});
