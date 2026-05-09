function recuperarTexto(idComponente) {
  let componente;
  let valorIngresado;
  componente = document.getElementById(idComponente);
  valorIngresado = componente.value;
  return valorIngresado;
}

function recuperarElemento(idComponente) {
  let componente = document.getElementById(idComponente);
  return componente;
}

function recuperarInt(idComponente) {
  let valorCaja = recuperarTexto(idComponente);
  let valorEntero = parseInt(valorCaja);
  return valorEntero;
}
function recuperarFloat(idComponente) {
  let valorCaja = recuperarTexto(idComponente);
  let valorFlotante = parseFloat(valorCaja);
  return valorFlotante;
}
function mostrarTexto(idComponente, mensaje) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.innerText = mensaje;
}
function mostrarTextoEnCaja(idComponente, mensaje) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.value = mensaje;
}

function mostrarImagen(idComponente, rutaImagen) {
  let componente;
  componente = document.getElementById(idComponente);
  componente.src = rutaImagen;
}

function validarCedula(cedula) {
  if (cedula.length !== 10) {
    return false;
  }

  if (isNaN(cedula)) {
    return false;
  }

  return true;
}

function validarContacto(contacto) {
  if (contacto.length !== 10) {
    return false;
  }

  if (isNaN(contacto)) {
    return false;
  }

  return true;
}

function capitalizarTexto(nombre) {
  let texto = nombre.trim().toLowerCase();

  let primeraLetra = texto.charAt(0).toUpperCase();
  let restoNombre = texto.slice(1);

  return primeraLetra + restoNombre;
}

function validarTexto(valor) {
  let soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(valor);
  return soloLetras;
}
