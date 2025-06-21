
function pasarValor(){
    const input1 = document.getElementById('origen').value
    const input2 = document.getElementById('destino').value

    document.getElementById('origen').value = input2
    document.getElementById('destino').value = input1;
}

document.querySelectorAll('.icono').forEach(icon => {
  icon.addEventListener('click', () => {
    icon.nextElementSibling.focus(); // enfoca el input
    icon.nextElementSibling.showPicker?.(); // abre el calendario si es compatible
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const botones = document.querySelectorAll(".tipo-btn");
  const vuelta = document.getElementById("vuelta");
  const pasajerosClase = document.getElementById("pasajerosClase");
  const multidestinoExtra = document.getElementById("multidestinoExtra");
  const buscar = document.getElementById("Buscar");
  const ida = document.getElementById("Ida");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      botones.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");

      const tipo = boton.dataset.tipo;

      if (tipo === "soloIda") {
        ida.innerHTML= 'Ida'
        vuelta.style.display = "none";
        buscar.style.display = "flex"
        multidestinoExtra.innerHTML = "";
      } else if (tipo === "multidestino") {
        vuelta.style.display = "none";
        ida.innerHTML= 'Fechas'
        buscar.style.display = "none"
        renderizarFormularioMultidestino();
      } else {
        vuelta.style.display = "block";
        buscar.style.display = "flex"
        ida.innerHTML= 'Ida'
        multidestinoExtra.innerHTML = "";
      }
    });
  });

  function renderizarFormularioMultidestino() {
    multidestinoExtra.innerHTML = "";

    // Agregamos el primer tramo (no se puede eliminar)
    agregarTramo(true);

    // Botón para agregar más tramos
    const btnAgregar = document.createElement("button");
    btnAgregar.className = "btn"
    btnAgregar.id = "agregarTramo";
    btnAgregar.style.marginTop = "10px";
    btnAgregar.style.zIndex = "10"
    btnAgregar.innerHTML = `
        <p>+ Agregar tramo</p>
    `;

    const btnBuscar = document.createElement("button");
    btnBuscar.className = "btn"
    btnBuscar.innerHTML = `
        <div class="icono"><img src="../svg/buscador/plane-departure-solid.svg" alt=""></div>
        <p>Buscar</p>
    `

    btnAgregar.addEventListener("click", () => {
        agregarTramo(false); // tramos adicionales sí se pueden eliminar
    });
    
    multidestinoExtra.appendChild(btnAgregar);
    multidestinoExtra.appendChild(btnBuscar)
}

let contadorTramos = 1;


function agregarTramo(esPrimerTramo = false) {
  const tramo = document.createElement("div");
  tramo.classList.add("formulario", "tramo");

  const numeroTramo = contadorTramos++;
  const titulo = `<h4 style="grid-column: 1 / -1; font-size: 16px; margin-bottom: 10px;">Tramo ${numeroTramo}</h4>`;

  tramo.innerHTML = `
    ${!esPrimerTramo ? '<button class="btn-eliminar-tramo" title="Eliminar tramo">✖</button>' : ""}
    <div class="desdeDonde">
        <div>
          <label for="">Origen</label>
          <div class="inputs">
            <div class="icono"><img src="../svg/buscador/xmark-solid.svg" alt=""></div>
            <input type="text" placeholder="Ingrese origen" id="origen">
          </div>
        </div>
        <button class="icono btn-intercambio">
            <img src="../svg/buscador/arrow-right-arrow-left-solid.svg">
            </button>
        <div>
          <label for="">Destino</label>
          <div class="inputs">
            <div class="icono"><img src="../svg/buscador/location-dot-solid.svg" alt=""></div>
            <input type="text" placeholder="Ingrese destino" id="destino">
          </div>
        </div>
      </div>
    <div class="contenedorFechas">
      <label>Fecha</label>
      <div class="inputs">
        <div class="icono"><img src="../svg/buscador/calendar-days-solid.svg"></div>
        <input type="date">
      </div>
    </div>
  `;

  // Solo agregar evento si no es el primer tramo
  if (!esPrimerTramo) {
    tramo.querySelector(".btn-eliminar-tramo").addEventListener("click", () => {
      tramo.remove();
      contadorTramos--
    });
  }

  const btnIntercambio = tramo.querySelector(".btn-intercambio");
  btnIntercambio.addEventListener("click", () => {
    const inputs = tramo.querySelectorAll(".desdeDonde input");
    if (inputs.length === 2) {
      const temp = inputs[0].value;
      inputs[0].value = inputs[1].value;
      inputs[1].value = temp;
    }
  });

  const btnAgregar = document.getElementById("agregarTramo");
  multidestinoExtra.insertBefore(tramo, btnAgregar);
}


});
