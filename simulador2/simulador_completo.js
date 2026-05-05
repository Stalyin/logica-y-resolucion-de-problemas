let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSecciones() {
  let seccion1 = recuperarElemento("clientes").classList.remove("activa");
  let seccion2 = recuperarElemento("parametros").classList.remove("activa");
}

function mostrarSeccion(id) {
  ocultarSecciones();
  let seccion1 = document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  let cmpTasa = recuperarInt("tasaInteres");
  if (cmpTasa >= 10 && cmpTasa <= 20) {
    mostrarTexto(
      "mensajeTasa",
      "Tasa configurada correctamente: " + cmpTasa + " %",
    );
    tasaInteres = cmpTasa;
  } else {
    mostrarTexto("mensajeTasa", "Tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente() {
  let cmpCedula = recuperarTexto("cedula");
  let cmpNombre = recuperarTexto("nombre");
  let cmpApellido = recuperarTexto("apellido");
  let cmpIngresos = recuperarFloat("ingresos");
  let cmpEgresos = recuperarFloat("egresos");

  if (clienteSeleccionado !== null) {
    clienteSeleccionado.nombre = cmpNombre;
    clienteSeleccionado.apellido = cmpApellido;
    clienteSeleccionado.ingresos = cmpIngresos;
    clienteSeleccionado.egresos = cmpEgresos;

    clienteSeleccionado = null;
    console.log("Cliente actualizado");
    pintarCliente();
    limpiar();
    return;
  }

  let existente = buscarCliente(cmpCedula);

  if (existente !== null) {
    console.log("Cliente existente");
    return;
  }

  let cliente = {
    cedula: cmpCedula,
    nombre: cmpNombre,
    apellido: cmpApellido,
    ingresos: cmpIngresos,
    egresos: cmpEgresos,
  };

  clientes.push(cliente);
  console.log("Cliente agregado");
  pintarCliente();
  limpiar();
}

function pintarCliente() {
  let tablaClientes = recuperarElemento("tablaClientes");
  let contenedor = "";

  for (let indice = 0; indice < clientes.length; indice++) {
    contenedor += `<tr>
                    <td>${clientes[indice].cedula}</td>
                    <td>${clientes[indice].nombre}</td>
                    <td>${clientes[indice].apellido}</td>
                    <td>${clientes[indice].ingresos}</td>
                    <td>${clientes[indice].egresos}</td>
                    <td>
                      <button onclick="seleccionarCliente('${clientes[indice].cedula}')">Actualizar</button>
                      <button>Eliminar</button>
                    </td>
                  </tr>
                  `;
  }

  tablaClientes.innerHTML = contenedor;
}

function buscarCliente(cedula) {
  let clienteEncontrado = null;

  for (let indice = 0; indice < clientes.length; indice++) {
    let clienteActual = clientes[indice];

    if (clienteActual.cedula === cedula) {
      clienteEncontrado = clienteActual;
      break;
    }
  }

  return clienteEncontrado;
}

function seleccionarCliente(cedula) {
  clienteSeleccionado = buscarCliente(cedula);

  if (clienteSeleccionado !== null) {
    mostrarTextoEnCaja("cedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("nombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("apellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);
  }
}

function limpiar() {
  recuperarElemento("cedula").value = "";
  recuperarElemento("nombre").value = "";
  recuperarElemento("apellido").value = "";
  recuperarElemento("ingresos").value = "";
  recuperarElemento("egresos").value = "";
}
