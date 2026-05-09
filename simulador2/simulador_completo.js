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
  let seccion3 = recuperarElemento("credito").classList.remove("activa");
  let seccion4 = recuperarElemento("contacto").classList.remove("activa");
  let seccion5 = recuperarElemento("listaCreditos").classList.remove("activa");
}

function mostrarSeccion(id) {
  ocultarSecciones();
  let seccion1 = document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  let mensajeTasa = recuperarElemento("mensajeTasa");
  mensajeTasa.classList.remove("aviso");
  mensajeTasa.classList.remove("verificado");

  let cmpTasa = recuperarInt("tasaInteres");
  if (cmpTasa >= 10 && cmpTasa <= 20) {
    mensajeTasa.classList.add("verificado");
    mostrarTexto(
      "mensajeTasa",
      "Tasa configurada correctamente: " + cmpTasa + " %",
    );
    tasaInteres = cmpTasa;
  } else {
    mensajeTasa.classList.add("aviso");
    mostrarTexto("mensajeTasa", "Tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente() {
  let cmpCedula = recuperarTexto("cedula").trim();
  let cmpNombre = recuperarTexto("nombre").trim();
  let cmpApellido = recuperarTexto("apellido").trim();
  let cmpIngresos = recuperarFloat("ingresos");
  let cmpEgresos = recuperarFloat("egresos");
  let cmpCorreo = recuperarTexto("correo");
  let cmpContacto = recuperarTexto("txtContacto").trim();
  let cmpDireccion = recuperarTexto("direccion").trim();
  let cmpAviso = recuperarElemento("txtAviso");

  cmpNombre = capitalizarTexto(cmpNombre);
  cmpApellido = capitalizarTexto(cmpApellido);
  cmpDireccion = capitalizarTexto(cmpDireccion);

  cmpAviso.classList.remove("aviso");
  cmpAviso.classList.remove("verificado");

  if (!validarCedula(cmpCedula)) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "La cédula debe tener 10 digitos";
    return;
  }

  if (cmpNombre === "") {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese el nombre";
    return;
  }

  if (cmpNombre.length < 3 || !validarTexto(cmpNombre)) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese un nombre válido";
    return;
  }

  if (cmpApellido === "") {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese el apellido";
    return;
  }

  if (cmpApellido.length < 3 || !validarTexto(cmpApellido)) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese un Apellido válido";
    return;
  }

  if (isNaN(cmpIngresos) || cmpIngresos <= 0) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese ingresos válidos";
    return;
  }

  if (isNaN(cmpEgresos) || cmpEgresos < 0) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese egresos válidos";
    return;
  }

  if (cmpCorreo === "") {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese un Correo";
    return;
  }

  if (cmpCorreo.length < 3) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese un correo válido";
    return;
  }

  if (!validarContacto(cmpContacto)) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "El contacto debe tener exactamente 10 números";
    return;
  }

  if (cmpDireccion === "") {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese la dirección";
    return;
  }

  if (cmpDireccion.length < 3 || !validarTexto(cmpDireccion)) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "Ingrese una dirección válida";
    return;
  }

  if (clienteSeleccionado !== null) {
    clienteSeleccionado.cedula = cmpCedula;
    clienteSeleccionado.nombre = cmpNombre;
    clienteSeleccionado.apellido = cmpApellido;
    clienteSeleccionado.ingresos = cmpIngresos;
    clienteSeleccionado.correo = cmpCorreo;
    clienteSeleccionado.egresos = cmpEgresos;
    clienteSeleccionado.contacto = cmpContacto;
    clienteSeleccionado.direccion = cmpDireccion;

    clienteSeleccionado = null;
    cmpAviso.classList.add("verificado");
    cmpAviso.innerText = "Cliente actualizado correctamente";
    pintarCliente();
    limpiar();
    return;
  }

  let existente = buscarCliente(cmpCedula);

  if (existente !== null) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "La cédula ya está registrada";
    return;
  }

  let cliente = {
    cedula: cmpCedula,
    nombre: cmpNombre,
    apellido: cmpApellido,
    correo: cmpCorreo,
    ingresos: cmpIngresos,
    egresos: cmpEgresos,
    contacto: cmpContacto,
    direccion: cmpDireccion,
  };

  clientes.push(cliente);

  cmpAviso.innerText = "Cliente guardado";
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
                    <td>${clientes[indice].correo}</td>
                    <td>${clientes[indice].ingresos}</td>
                    <td>${clientes[indice].egresos}</td>
                    <td>
                      <button onclick="seleccionarCliente('${clientes[indice].cedula}')">Actualizar</button>
                      <button onclick="eliminar('${indice}')">Eliminar</button>
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
    mostrarTextoEnCaja("correo", clienteSeleccionado.correo);
    mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);
    mostrarTextoEnCaja("txtContacto", clienteSeleccionado.contacto);
    mostrarTextoEnCaja("direccion", clienteSeleccionado.direccion);
  }
}

function eliminar(indice) {
  clientes.splice(indice, 1);
  pintarCliente();
}

function limpiar() {
  recuperarElemento("cedula").value = "";
  recuperarElemento("nombre").value = "";
  recuperarElemento("apellido").value = "";
  recuperarElemento("correo").value = "";
  recuperarElemento("ingresos").value = "";
  recuperarElemento("egresos").value = "";
  recuperarElemento("txtContacto").value = "";
  recuperarElemento("direccion").value = "";
}

function buscarClienteCredito() {
  let cmpCedula = recuperarTexto("buscarCedulaCredito");
  let cliente = buscarCliente(cmpCedula);

  let resultadoCliente = recuperarElemento("datosClienteCredito");
  let contenedor = "";

  clienteSeleccionado = null;

  if (cliente !== null) {
    clienteSeleccionado = cliente;

    contenedor = `
                  <h3>Datos del Cliente</h3>
                  <p><strong>Cédula:</strong>${cliente.cedula}</p>
                  <p><strong>Nombre:</strong>${cliente.nombre}</p>
                  <p><strong>Apellido:</strong>${cliente.apellido}</p>
                  <p><strong>Ingresos:</strong>${cliente.ingresos}</p>
                  <p><strong>Egresos:</strong>${cliente.egresos}</p>
                   `;
  } else {
    contenedor = `
                 <h3> El cliente no Existe </h3>
                 `;
  }

  resultadoCliente.innerHTML = contenedor;
}

function buscarContactoCliente() {
  let cmpCedula = recuperarTexto("buscarContactoCedula");
  let cliente = buscarCliente(cmpCedula);
  let creditosCliente = buscarCreditos(cmpCedula);
  let cmpAviso = recuperarElemento("txtAvisoContacto");

  let resultadoContacto = recuperarElemento("tablaContacto");
  let contenedor = "";

  clienteSeleccionado = null;

  if (!validarCedula(cmpCedula)) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "La cédula debe tener 10 digitos";
    return;
  }

  let credito =
    creditosCliente.length === 0 ? "Sin creditos" : creditosCliente.length;

  if (cliente !== null) {
    clienteSeleccionado = cliente;
    cmpAviso.innerHTML = "";

    contenedor = `
                 <tr>
                    <td>${clienteSeleccionado.cedula}</td>
                    <td>${clienteSeleccionado.nombre}</td>
                    <td>${clienteSeleccionado.apellido}</td>
                    <td>${clienteSeleccionado.contacto}</td>
                    <td>${clienteSeleccionado.direccion}</td>
                    <td>${credito}</td>
                  </tr>
                   `;
  } else {
    contenedor = `
                 <h3> El cliente no Existe </h3>
                 `;
  }

  resultadoContacto.innerHTML = contenedor;
}

function formatearDinero(valor) {
  return new Intl.NumberFormat("es-EC", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

function calcularCredito() {
  let montoCredito = recuperarFloat("montoCredito");
  let plazoCredito = recuperarInt("plazoCredito");
  let solicitarCredito = recuperarElemento("btnSolicitarCredito");
  let resultadoCredito = recuperarElemento("resultadoCredito");
  let contenedor = "";

  resultadoCredito.classList.remove("aprobado");
  resultadoCredito.classList.remove("rechazado");

  if (clienteSeleccionado === null) {
    contenedor = `
      <h3>No es posible calcular</h3>
      <p>Por favor busca y selecciona un cliente existente.</p>
    `;

    resultadoCredito.innerHTML = contenedor;
    return;
  }

  if (isNaN(montoCredito) || montoCredito <= 0) {
    contenedor = `
      <h3>Monto inválido</h3>
      <p>Ingresa un monto de crédito válido.</p>
    `;

    resultadoCredito.innerHTML = contenedor;
    return;
  }

  if (isNaN(plazoCredito) || plazoCredito <= 0) {
    contenedor = `
      <h3>Plazo inválido</h3>
      <p>Ingresa un plazo válido en años.</p>
    `;

    resultadoCredito.innerHTML = contenedor;
    return;
  }

  let montoDisponible = calcularDisponible(
    clienteSeleccionado.ingresos,
    clienteSeleccionado.egresos,
  );

  let capacidadPago = calcularCapacidadPago(montoDisponible);
  let interes = calcularInteresSimple(montoCredito, tasaInteres, plazoCredito);
  let totalPago = calcularTotalPagar(montoCredito, interes);
  let cuotaMensual = calcularCuotaMensual(totalPago, plazoCredito);
  let estadoCredito = aprobarCredito(capacidadPago, cuotaMensual);

  let mensaje = "";

  resultadoCredito.classList.add(estadoCredito ? "aprobado" : "rechazado");
  mensaje = estadoCredito ? "Aprobado" : "Rechazado";
  solicitarCredito.disabled = !estadoCredito;

  cuotaCalculada = cuotaMensual;
  montoCalculado = montoCredito;
  plazoCalculado = plazoCredito;
  creditoAprobado = estadoCredito;

  contenedor = `
    <h3>Resultados Crédito</h3>

    <p><strong>Capacidad de pago:</strong> $ ${formatearDinero(capacidadPago)}</p>
    <p><strong>Total a pagar:</strong> $ ${formatearDinero(totalPago)}</p>
    <p><strong>Cuota mensual:</strong> $ ${formatearDinero(cuotaMensual)}</p>

    <br>

    <p><strong>Resultado:</strong> ${mensaje}</p>
  `;

  resultadoCredito.innerHTML = contenedor;
}

function calcularDisponible(ingresos, egresos) {
  let resultado = ingresos - egresos;
  if (resultado < 0) {
    return 0;
  }
  return resultado;
}

function calcularCapacidadPago(montoDisponible) {
  let capacidad = montoDisponible * 0.5;
  return capacidad;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
  let interes = plazoAnios * monto * (tasa / 100);
  return interes;
}

function calcularTotalPagar(monto, interes) {
  let total = monto + interes + 100;
  return total;
}

function calcularCuotaMensual(total, plazoAnios) {
  let meses = plazoAnios * 12;
  let cuota = total / meses;
  return cuota;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
  if (capacidadPago > cuotaMensual) {
    return true;
  } else {
    return false;
  }
}

function solicitarCredito() {
  let resultadoCredito = recuperarElemento("resultadoCredito");

  let resultadoCliente = recuperarElemento("datosClienteCredito");

  let cliente = clienteSeleccionado;

  if (cliente !== null) {
    let credito = {
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      correo: cliente.correo,
      contacto: cliente.contacto,
      direccion: cliente.direccion,
      monto: montoCalculado,
      tasa: tasaInteres,
      plazo: plazoCalculado,
      cuota: cuotaCalculada,
      estado: creditoAprobado,
    };

    creditos.push(credito);
    mostrarTextoEnCaja("montoCredito", "");
    mostrarTextoEnCaja("plazoCredito", "");
    mostrarTextoEnCaja("buscarCedulaCredito", "");
    resultadoCredito.innerHTML = `<p>Credito Registrado</p>`;
    resultadoCliente.innerHTML = "";
  }
}

function buscarCreditos(cedula) {
  let creditosEncontrados = [];

  for (let indice = 0; indice < creditos.length; indice++) {
    let creditoActual = creditos[indice];

    if (creditoActual.cedula === cedula) {
      creditosEncontrados.push(creditoActual);
    }
  }

  return creditosEncontrados;
}

function pintarCreditos(creditos) {
  let tablaCreditos = recuperarElemento("tablaCreditos");
  let contenedor = "";

  if (creditos.length === 0) {
    tablaCreditos.innerHTML = `
      <tr>
        <td colspan="9">No existen créditos registrados.</td>
      </tr>
    `;
    return;
  }

  for (let indice = 0; indice < creditos.length; indice++) {
    let creditoActual = creditos[indice];
    let estado = creditoActual.estado ? "Aprobado" : "Rechazado";
    contenedor += `
      <tr>
        <td>${creditoActual.cedula}</td>
        <td>${creditoActual.nombre}</td>
        <td>${creditoActual.apellido}</td>
        <td>${creditoActual.correo}</td>
        <td>$ ${formatearDinero(creditoActual.monto)}</td>
        <td>${creditoActual.tasa}%</td>
        <td>${creditoActual.plazo} años</td>
        <td>$ ${formatearDinero(creditoActual.cuota)}</td>
        <td>${estado}</td>
      </tr>
    `;
  }

  tablaCreditos.innerHTML = contenedor;
}

function buscarCreditosCliente() {
  let cmpAviso = recuperarElemento("txtAvisoCredito");
  let cmpCedula = recuperarTexto("buscarCedulaListado").trim();

  if (!validarCedula(cmpCedula)) {
    cmpAviso.classList.add("aviso");
    cmpAviso.innerText = "La cédula debe tener 10 digitos";
    return;
  }

  cmpAviso.innerHTML = "";
  let creditosCliente = buscarCreditos(cmpCedula);

  pintarCreditos(creditosCliente);
}
