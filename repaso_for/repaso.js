function mostrar(opcion) {
  switch (opcion) {
    case 1:
      ejercicio1();
      break;
    case 2:
      imprimirCentenas();
      break;
    case 3:
      imprimirCentenasRegresivo();
      break;
    case 4:
      mostrarMensaje1();
      break;
    case 5:
      mostrarMensaje2();
      break;
    case 6:
      mostrarMensaje3();
      break;
    case 7:
      mostrarMensaje4();
      break;
    case 8:
      ImprimirTabla3();
      break;
    case 9:
      imprimirPares();
      break;
    case 10:
      ejercicioAnidado();
      break;
    case 11:
      imprimirPiramide();
      break;
    case 12:
      piramideInvertida();
      break;
    default:
      break;
  }
}

function ejercicio1() {
  for (let i = 1; i <= 5; i++) {
    console.log(i);
  }
}

function imprimirCentenas() {
  for (let valorInicial = 1200; valorInicial < 2400; valorInicial += 100) {
    console.log(valorInicial);
  }
}

function imprimirCentenasRegresivo() {
  for (let valorIncial = 1700; valorIncial > 800; valorIncial -= 100) {
    console.log(valorIncial);
  }
}

function mostrarMensaje1() {
  for (let valorInicial = 5; valorInicial < 8; valorInicial++) {
    console.log(valorInicial);
  }
}

function mostrarMensaje2() {
  for (let valorInicial = 10; valorInicial >= 8; valorInicial--) {
    console.log(valorInicial);
  }
}

function mostrarMensaje3() {
  for (let valorInicial = 0; valorInicial < 10; valorInicial++) {
    console.log(valorInicial);
  }
}

function mostrarMensaje4() {
  for (let valorInicial = 8; valorInicial > 5; valorInicial--) {
    console.log(valorInicial);
  }
}

function ImprimirTabla3() {
  for (let i = 1; i <= 10; i++) {
    console.log("3x" + i + "=" + 3 * i);
  }
}

function imprimirPares() {
  for (let i = 2; i <= 20; i += 2) {
    console.log(i);
  }
}

// ejercicio Extra
function ejercicioAnidado() {
  for (let i = 10; i <= 30; i += 10) {
    for (let j = 1; j <= 3; j++) {
      console.log("A" + i + "-" + j);
    }
  }
}

function imprimirPiramide() {
  for (let i = 2; i <= 9; i++) {
    let linea = "";

    for (let j = 1; j <= i; j++) {
      linea += i;
    }
    console.log(linea);
  }
}

function piramideInvertida() {
  for (let numero = 9; numero >= 1; numero--) {
    console.log(String(numero).repeat(numero));
  }
}
