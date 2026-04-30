let cajaValor = document.getElementById("txtValor");
cajaValor.addEventListener("input", validar);

function validar() {
  let cajaValor = document.getElementById("txtValor");
  let textInfo = document.getElementById("txtTableInfo");
  let badge = document.getElementById("badge");
  let mensajeAyuda = document.getElementById("txtAyuda");
  let valor = cajaValor.value;

  if (valor !== "") {
    cajaValor.classList.remove("input-error");
    badge.classList.remove("rigth-info-error");
    badge.classList.add("rigth-info-check");

    mensajeAyuda.innerText = "Ahora presiona el Boton Probar";
    textInfo.innerText = "del " + valor;
  } else {
    textInfo.innerText = "";
  }
}

function generarTablas() {
  let tarjetaTabla = document.getElementById("tabla");
  let contenedor = document.getElementById("tablaResultados");
  let cajaValor = document.getElementById("txtValor");
  let badge = document.getElementById("badge");
  let mensajeAyuda = document.getElementById("txtAyuda");
  let textInfo = document.getElementById("txtTableInfo");
  let imagen = document.getElementById("imgCard");

  let contenido = "";
  let valor = cajaValor.value;

  if (valor === "") {
    badge.classList.remove("rigth-info");
    badge.classList.remove("rigth-info-check");
    badge.classList.add("rigth-info-error");
    cajaValor.classList.add("input-error");

    imagen.src = "./images/error.png";
    mensajeAyuda.innerText = "Por favor ingresa un valor Numérico";
    return;
  }

  if (valor !== "") {
    tarjetaTabla.classList.add("tabla-oculta");
  }

  contenedor.classList.add("tabla-card2");
  tarjetaTabla.classList.remove("tabla-card");
  textInfo.innerText = "del " + valor;

  for (let i = 1; i <= 10; i++) {
    let resultado = valor * i;

    contenido += `
      <div class="fila">
        <span class="icon icon-${i}">★</span>
        <p>${valor} x ${i} = ${resultado}</p>
      </div>
    `;
  }

  contenedor.innerHTML = contenido;
}
