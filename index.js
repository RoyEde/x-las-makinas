// Variables
let azar;
let separacion = /\s/;

// Elemento que almacena el texto original
const nodoTexto = document.getElementById('texto');

const nodoResultado = document.getElementById('resultado');

/// Boton
const nodoBoton = document.getElementById('boton');

/// Azar
const nodoAzar = document.getElementById('azar');

// Separacion
const nodoSeparacion = document.getElementById('separacion');

// Cambia el método de separación según el valor de selección del checkbox
nodoSeparacion.addEventListener(
  'change',
  event => (separacion = event.target.checked ? /\s/ : ' ')
);

// Separa el texto
const romperTexto = texto => texto.split(separacion);

// Toma una cantidad fija de palabras desde una posición específica.
const palabrasPorCantidad = (palabras, indice, cantidad) => {
  const palabrasNuevas = palabras.slice(indice * cantidad, (indice + 1) * cantidad).join(' ')
  return palabrasNuevas;
}

const generarTextoAlAzar = () => {
  // Si el valor de azar está seteado, entonces se puede operar con el texto.
  if (azar) {
    const texto = nodoTexto.value;
    // Romper el texto en palabras según la lógica de separación elegida.
    const textoRoto = romperTexto(texto);
    // Iterar por todas las palabras
    const textoAlAzar = textoRoto
      .map((_, indice) =>
        palabrasPorCantidad(
          textoRoto,
          indice,
          // Genera un número al azar entre 1 y el valor de azar
          Math.floor(Math.random() * azar + 1)
        )
      )
      .filter(palabra => !!palabra)
      .join('\n');
    nodoResultado.textContent = textoAlAzar;
  }
};

// Si se apretan las teclas ctrl y Enter al mismo tiempo, generar un texto al azar.
nodoTexto.addEventListener('keypress', event => {
  if (event.ctrlKey && event.code === 'Enter') generarTextoAlAzar();
});

nodoBoton.addEventListener('click', generarTextoAlAzar);

nodoAzar.addEventListener('input', event => {
  const valor = event.target.value;
  if (!azar && valor) nodoBoton.removeAttribute('disabled');
  if (valor) azar = valor;
  else {
    azar = undefined;
    nodoBoton.setAttribute('disabled', true);
  }
});
