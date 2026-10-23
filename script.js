
/* =========================================
   ALGEON — 30 EJERCICIOS
   6 VISIBLES + ORDEN ALEATORIO + REINICIAR
   ========================================= */

const EJERCICIOS_ALGEON = [
  { titulo: "Ecuación básica", ecuacion: "3x + 6 = 21", respuesta: 5, pista: "Resta 6 a ambos lados y divide entre 3." },
  { titulo: "Multiplicación", ecuacion: "2x = 18", respuesta: 9, pista: "Divide ambos lados entre 2." },
  { titulo: "Despeje básico", ecuacion: "x - 7 = 12", respuesta: 19, pista: "Suma 7 a ambos lados." },
  { titulo: "Suma sencilla", ecuacion: "x + 8 = 20", respuesta: 12, pista: "Resta 8 a ambos lados." },
  { titulo: "División", ecuacion: "x / 4 = 6", respuesta: 24, pista: "Multiplica ambos lados por 4." },
  { titulo: "Doble de un número", ecuacion: "5x = 35", respuesta: 7, pista: "Divide 35 entre 5." },
  { titulo: "Resta y despeje", ecuacion: "x - 9 = 14", respuesta: 23, pista: "Suma 9 a ambos lados." },
  { titulo: "Suma y división", ecuacion: "2x + 4 = 16", respuesta: 6, pista: "Resta 4 y luego divide entre 2." },
  { titulo: "Ecuación con resta", ecuacion: "4x - 8 = 20", respuesta: 7, pista: "Suma 8 y divide entre 4." },
  { titulo: "Incógnita sencilla", ecuacion: "x + 15 = 32", respuesta: 17, pista: "Resta 15 a ambos lados." },
  { titulo: "Multiplicación avanzada", ecuacion: "6x = 54", respuesta: 9, pista: "Divide ambos lados entre 6." },
  { titulo: "Ecuación con división", ecuacion: "x / 3 = 8", respuesta: 24, pista: "Multiplica ambos lados por 3." },
  { titulo: "Dos operaciones", ecuacion: "3x + 5 = 26", respuesta: 7, pista: "Resta 5 y divide entre 3." },
  { titulo: "Despeje con resta", ecuacion: "7x - 14 = 28", respuesta: 6, pista: "Suma 14 y divide entre 7." },
  { titulo: "Ecuación con paréntesis", ecuacion: "2(x + 3) = 18", respuesta: 6, pista: "Divide entre 2 y después resta 3." },
  { titulo: "Incógnita en ambos lados", ecuacion: "3x + 4 = x + 14", respuesta: 5, pista: "Resta x y después resta 4." },
  { titulo: "Ecuación equilibrada", ecuacion: "5x - 6 = 2x + 9", respuesta: 5, pista: "Resta 2x y suma 6 a ambos lados." },
  { titulo: "Paréntesis", ecuacion: "3(x - 2) = 15", respuesta: 7, pista: "Divide entre 3 y luego suma 2." },
  { titulo: "División y suma", ecuacion: "x / 2 + 5 = 11", respuesta: 12, pista: "Resta 5 y multiplica el resultado por 2." },
  { titulo: "Ecuación de dos pasos", ecuacion: "4x + 12 = 40", respuesta: 7, pista: "Resta 12 y divide entre 4." },
  { titulo: "Nivel avanzado", ecuacion: "8x - 10 = 46", respuesta: 7, pista: "Suma 10 y divide entre 8." },
  { titulo: "Incógnita a ambos lados", ecuacion: "6x + 2 = 3x + 20", respuesta: 6, pista: "Resta 3x y después resta 2." },
  { titulo: "Paréntesis y resta", ecuacion: "4(x + 1) = 28", respuesta: 6, pista: "Divide entre 4 y resta 1." },
  { titulo: "Ecuación con fracción", ecuacion: "x / 5 + 3 = 9", respuesta: 30, pista: "Resta 3 y multiplica por 5." },
  { titulo: "Desafío de igualdad", ecuacion: "9x - 7 = 65", respuesta: 8, pista: "Suma 7 y divide entre 9." },
  { titulo: "Dos incógnitas algebraicas", ecuacion: "7x + 3 = 4x + 24", respuesta: 7, pista: "Resta 4x y luego resta 3." },
  { titulo: "Distribución", ecuacion: "5(x - 2) = 35", respuesta: 9, pista: "Divide entre 5 y suma 2." },
  { titulo: "Ecuación combinada", ecuacion: "2x + 7 = 3x - 5", respuesta: 12, pista: "Resta 2x y suma 5 a ambos lados." },
  { titulo: "Reto final I", ecuacion: "4(2x - 1) = 28", respuesta: 4, pista: "Divide entre 4, suma 1 y divide entre 2." },
  { titulo: "Reto final II", ecuacion: "3(x + 4) - 2 = 25", respuesta: 5, pista: "Suma 2, divide entre 3 y resta 4." }
];

let reiniciarALGEON = null;

document.addEventListener("DOMContentLoaded", () => {
  const MAX_VISIBLES = 6;
  const total = EJERCICIOS_ALGEON.length;

  const obtener = id => document.getElementById(id);

  const modal = obtener("modalEjercicio");
  const cerrarModal = obtener("cerrarModal");
  const cerrarResultado = obtener("cerrarResultado");
  const formulario = obtener("formularioRespuesta");
  const entrada = obtener("respuestaUsuario");
  const tituloModal = obtener("modalTitulo");
  const preguntaModal = obtener("modalPregunta");
  const enunciadoModal = obtener("modalEnunciado");
  const resultado = obtener("resultadoRespuesta");
  const botonReintentar = obtener("intentarDeNuevo");

  const textoProgreso = obtener("textoProgreso");
  const textoPuntuacion = obtener("textoPuntuacion");
  const barraProgreso = obtener("barraProgreso");
  const progresoRelleno = obtener("progresoRelleno");
  const contenedor = obtener("exerciseGrid");

  if (
    !modal || !cerrarModal || !cerrarResultado || !formulario ||
    !entrada || !tituloModal || !preguntaModal || !enunciadoModal ||
    !resultado || !botonReintentar || !textoProgreso ||
    !textoPuntuacion || !barraProgreso || !progresoRelleno || !contenedor
  ) {
    console.error("ALGEON: falta algún elemento necesario en el HTML.");
    return;
  }

  let lista = [];
  let siguiente = 0;
  let actual = null;
  let tarjetaPendiente = null;
  let completados = new Set();

  // Mezcla los ejercicios para crear una nueva ronda.
  function mezclarEjercicios() {
    const copia = [...EJERCICIOS_ALGEON];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }

  function crearTarjeta(ejercicio, indice) {
    const numeroOriginal = EJERCICIOS_ALGEON.indexOf(ejercicio) + 1;
    const nivel = Math.ceil(numeroOriginal / 10);
    const tarjeta = document.createElement("article");

    tarjeta.className = "exercise-card";

    const claseNivel = nivel === 2 ? "purple" : nivel === 3 ? "pink" : "";

    tarjeta.innerHTML = `
      <div class="card-top">
        <span class="level-badge ${claseNivel}">NIVEL 0${nivel}</span>
        <span class="card-number">${String(indice + 1).padStart(2, "0")} / ${total}</span>
      </div>
      <h3></h3>
      <p>Encuentra el valor desconocido.</p>
      <div class="equation"></div>
      <button class="btn-resolver" type="button">
        Resolver <span>↗</span>
      </button>
    `;

    tarjeta.querySelector("h3").textContent = ejercicio.titulo;
    tarjeta.querySelector(".equation").textContent = ejercicio.ecuacion;

    const boton = tarjeta.querySelector(".btn-resolver");

    boton.dataset.pregunta = `Desafío ${indice + 1}`;
    boton.dataset.enunciado = `Resuelve: ${ejercicio.ecuacion}. ¿Cuánto vale x?`;
    boton.dataset.respuesta = String(ejercicio.respuesta);
    boton.dataset.pista = ejercicio.pista;

    boton.addEventListener("click", () => abrirEjercicio(boton));

    return tarjeta;
  }

  function cargarIniciales() {
    contenedor.innerHTML = "";
    siguiente = 0;

    while (siguiente < MAX_VISIBLES && siguiente < total) {
      contenedor.appendChild(crearTarjeta(lista[siguiente], siguiente));
      siguiente++;
    }
  }

  function actualizarProgreso() {
    const cantidad = completados.size;
    const porcentaje = Math.round((cantidad / total) * 100);

    textoProgreso.textContent = `${porcentaje}%`;
    textoPuntuacion.textContent =
      `Has completado ${cantidad} de ${total} ejercicios.`;

    progresoRelleno.style.width = `${porcentaje}%`;
    barraProgreso.setAttribute("aria-valuemax", total);
    barraProgreso.setAttribute("aria-valuenow", cantidad);
  }

  function avanzarTarjeta() {
    if (!tarjetaPendiente) return;

    const tarjeta = tarjetaPendiente.closest(".exercise-card");

    if (tarjeta) tarjeta.remove();

    tarjetaPendiente = null;

    if (siguiente < total) {
      contenedor.appendChild(crearTarjeta(lista[siguiente], siguiente));
      siguiente++;
    }

    if (completados.size === total) {
      contenedor.innerHTML = `
        <div class="all-completed">
          <h3>¡Felicitaciones! 🎉</h3>
          <p>Has completado los 30 ejercicios de ALGEON.</p>
          <p>Pulsa Reiniciar para comenzar una nueva ronda.</p>
        </div>
      `;
    }
  }

  function abrirEjercicio(boton) {
    actual = boton;

    preguntaModal.textContent = boton.dataset.pregunta;
    tituloModal.innerHTML = 'Resuelve la ecuación<span>.</span>';
    enunciadoModal.textContent = boton.dataset.enunciado;

    entrada.value = "";
    entrada.disabled = false;
    resultado.textContent = "";
    resultado.className = "answer-feedback";

    formulario.hidden = false;
    botonReintentar.hidden = true;
    cerrarResultado.textContent = "Cerrar";

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setTimeout(() => entrada.focus(), 100);
  }

  function cerrarVentana() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    avanzarTarjeta();
    actual = null;
  }

  function mostrarResultado(mensaje, tipo) {
    resultado.textContent = mensaje;
    resultado.className = `answer-feedback visible ${tipo}`;
  }

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    if (!actual) return;

    const texto = entrada.value.trim();
    const respuestaUsuario = Number(texto);
    const correcta = Number(actual.dataset.respuesta);

    if (texto === "" || !Number.isFinite(respuestaUsuario)) {
      mostrarResultado("Escribe una respuesta válida antes de comprobar.", "incorrect");
      return;
    }

    if (Math.abs(respuestaUsuario - correcta) < 0.000001) {
      completados.add(actual);
      tarjetaPendiente = actual;

      mostrarResultado(
        "¡Correcto! 🎉 Has resuelto la ecuación. Tu progreso se ha actualizado.",
        "correct"
      );

      entrada.disabled = true;
      formulario.hidden = true;
      botonReintentar.hidden = true;
      cerrarResultado.textContent = "¡Continuar!";

      actual.disabled = true;
      actual.textContent = "Completado ✓";
      actual.classList.add("completado");

      actualizarProgreso();
    } else {
      mostrarResultado(
        `Todavía no es correcto. 💡 Pista: ${actual.dataset.pista}`,
        "incorrect"
      );

      botonReintentar.hidden = false;
      cerrarResultado.textContent = "Cerrar";
    }
  });

  botonReintentar.addEventListener("click", () => {
    entrada.value = "";
    entrada.disabled = false;
    resultado.textContent = "";
    resultado.className = "answer-feedback";
    botonReintentar.hidden = true;
    entrada.focus();
  });

  cerrarModal.addEventListener("click", cerrarVentana);
  cerrarResultado.addEventListener("click", cerrarVentana);

  modal.addEventListener("click", evento => {
    if (evento.target === modal) cerrarVentana();
  });

  document.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && modal.classList.contains("active")) {
      cerrarVentana();
    }
  });

  // El botón Reiniciar del index.html llama esta función.
  reiniciarALGEON = function () {
    if (!confirm("¿Reiniciar ALGEON? Tu progreso actual volverá a cero y los ejercicios cambiarán de orden.")) {
      return;
    }

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    actual = null;
    tarjetaPendiente = null;
    completados = new Set();
    lista = mezclarEjercicios();

    cargarIniciales();
    actualizarProgreso();

    document.getElementById("ejercicios").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  // Comienza cada sesión con un orden aleatorio.
  lista = mezclarEjercicios();
  cargarIniciales();
  actualizarProgreso();

  console.log("ALGEON listo: 30 ejercicios, 6 visibles y reinicio aleatorio.");
});
