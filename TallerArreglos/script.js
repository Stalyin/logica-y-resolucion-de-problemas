let edadesIzquierda = [];
let edadesDerecha = [];

function agregarEdad() {
  let edad = recuperarInt("edad");

  if (isNaN(edad)) {
    mostrarTexto("txtInput", "Por favor ingresa un valor");
    recuperarElemento("txtInput").classList.add("input-validate");
    return;
  }

  mostrarTexto("txtInput", "");
  recuperarElemento("txtInput").classList.remove("input-validate");
  edadesIzquierda.push(edad);
  pintarArregloIzquierda();
}

function pintarArregloIzquierda() {
  let tablaEdades = recuperarElemento("tablaIzquierda");
  let contenedor = "";

  for (let indice = 0; indice < edadesIzquierda.length; indice++) {
    contenedor += `<tr>
                            <td>${edadesIzquierda[indice]}</td>
                            <td>
                                <button class="btn-eliminar" onclick="eliminarIzquierdo(${indice})">Eliminar</button>
                            </td>
                            <td>
                                <button class="btn-mover" onclick="moverHaciaDerecha(${indice});">➜</button>
                            </td>
                        </tr>
                  `;
  }

  let filaSuma = `  <tr>
                      <td>
                        ${sumaEdades(edadesIzquierda)}
                      </td>
                      <td>
                       Suma de Edades
                      </td>
                    </tr>
                  `;

  tablaEdades.innerHTML = contenedor + filaSuma;
}

function eliminarIzquierdo(indice) {
  edadesIzquierda.splice(indice, 1);
  pintarArregloIzquierda();
}

function pintarArregloDerecho() {
  let tablaDerecha = recuperarElemento("tablaDerecha");
  let contenedor = "";

  for (let indice = 0; indice < edadesDerecha.length; indice++) {
    contenedor += `<tr>
                            <td>
                                <button class="btn-mover" onclick="moverHaciaIzquierda(${indice})">⬅</button>
                            </td>
                            <td>${edadesDerecha[indice]}</td>
                            <td>
                                <button class="btn-eliminar" onclick="eliminarDerecho(${indice})">Eliminar</button>
                            </td>
                            
                        </tr>
                  `;
  }
  let filaSuma = `  <tr>
                      <td>
                        ${sumaEdades(edadesDerecha)}
                      </td>
                      <td>
                       Suma de Edades
                      </td>
                    </tr>
                  `;
  tablaDerecha.innerHTML = contenedor + filaSuma;
}

function eliminarDerecho(indice) {
  edadesDerecha.splice(indice, 1);
  pintarArregloDerecho();
}

function moverHaciaDerecha(indice) {
  let valores = edadesIzquierda[indice];
  edadesDerecha.push(valores);
  eliminarIzquierdo(indice);

  pintarArregloDerecho();
}

function moverHaciaIzquierda(indice) {
  let valores = edadesDerecha[indice];
  edadesIzquierda.push(valores);
  eliminarDerecho(indice);
  pintarArregloIzquierda();
}

function limpiarTablas() {
  edadesDerecha.splice(0);
  edadesIzquierda.splice(0);

  pintarArregloDerecho();
  pintarArregloIzquierda();
}

function moverTodoHaciaDerecha() {
  for (let indice = 0; indice < edadesIzquierda.length; indice++) {
    let valor = edadesIzquierda[indice];
    edadesDerecha.push(valor);
  }

  edadesIzquierda.splice(0);
  pintarArregloDerecho();
  pintarArregloIzquierda();
}

function moverTodoHaciaIzquierda() {
  for (let indice = 0; indice < edadesDerecha.length; indice++) {
    let valor = edadesDerecha[indice];
    edadesIzquierda.push(valor);
  }

  edadesDerecha.splice(0);
  pintarArregloDerecho();
  pintarArregloIzquierda();
}

function sumaEdades(arreglos) {
  let sumaEdad = 0;
  for (let indice = 0; indice < arreglos.length; indice++) {
    sumaEdad += arreglos[indice];
  }

  return sumaEdad;
}
