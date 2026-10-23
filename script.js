
/* =========================================
   ALGEON — 30 EJERCICIOS Y PROGRESO
   Máximo 6 tarjetas visibles a la vez.
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const ejercicios = [
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

  const modal = document.getElementById("modalEjercicio");
  const cerrarModal = document.getElementById("cerrarModal");
  const cerrarResultado = document.getElementById("cerrarResultado");
  const formulario = document.getElementById("formularioRespuesta");
  const entradaRespuesta = document.getElementById("respuestaUsuario");
  const tituloModal = document.getElementById("modalTitulo");
  const preguntaModal = document.getElementById("modalPregunta");
  const enunciadoModal = document.getElementById("modalEnunciado");
  const resultado = document.getElementById("resultadoRespuesta");
  const botonReintentar = document.getElementById("intentarDeNuevo");

  const textoProgreso = document.getElementById("textoProgreso");
  const textoPuntuacion = document.getElementById("textoPuntuacion");
  const barraProgreso = document.getElementById("barraProgreso");
  const progresoRelleno = document.getElementById("progresoRelleno");
  const contenedorEjercicios = document.getElementById("exerciseGrid");

  if (
    !modal || !cerrarModal || !cerrarResultado || !formulario ||
    !entradaRespuesta || !tituloModal || !preguntaModal ||
    !enunciadoModal || !resultado || !botonReintentar ||
    !textoProgreso || !textoPuntuacion || !barraProgreso ||
    !progresoRelleno || !contenedorEjercicios
  ) {
    console.error("ALGEON: falta algún elemento necesario en el HTML.");
    return;
  }

  const MAX_VISIBLES = 6;
  const totalEjercicios = ejercicios.length;
  const ejerciciosCompletados = new Set();

  let siguienteEjercicio = 0;
  let ejercicioActual = null;
  let tarjetaPendienteDeRetirar = null;

  // Crea una tarjeta con el diseño original.
  function crearTarjeta(ejercicio, indice) {
    const numero = indice + 1;
    const nivel = Math.ceil(numero / 10);
    const tarjeta = document.createElement("article");

    tarjeta.className = "exercise-card";

    const nivelClase = nivel === 2
      ? "purple"
      : nivel === 3
        ? "pink"
        : "";

    tarjeta.innerHTML = `
      <div class="card-top">
        <span class="level-badge ${nivelClase}">
          NIVEL 0${nivel}
        </span>
        <span class="card-number">
          ${String(numero).padStart(2, "0")} / ${totalEjercicios}
        </span>
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

    boton.dataset.indice = indice;
    boton.dataset.pregunta = `Desafío ${numero}`;
    boton.dataset.enunciado = `Resuelve: ${ejercicio.ecuacion}. ¿Cuánto vale x?`;
    boton.dataset.respuesta = String(ejercicio.respuesta);
    boton.dataset.pista = ejercicio.pista;

    boton.addEventListener("click", () => abrirEjercicio(boton));

    return tarjeta;
  }

  // Muestra solo las primeras seis tarjetas pendientes.
  function cargarTarjetasIniciales() {
    contenedorEjercicios.innerHTML = "";

    for (
      let i = 0;
      i < MAX_VISIBLES && siguienteEjercicio < totalEjercicios;
      i++
    ) {
      const tarjeta = crearTarjeta(
        ejercicios[siguienteEjercicio],
        siguienteEjercicio
      );

      contenedorEjercicios.appendChild(tarjeta);
      siguienteEjercicio++;
    }
  }

  // Al completar una tarjeta, entra la siguiente de la lista.
  function retirarTarjetaCompletada() {
    if (!tarjetaPendienteDeRetirar) return;

    const tarjeta = tarjetaPendienteDeRetirar.closest(".exercise-card");

    if (tarjeta) {
      tarjeta.remove();
    }

    tarjetaPendienteDeRetirar = null;

    if (siguienteEjercicio < totalEjercicios) {
      const nuevaTarjeta = crearTarjeta(
        ejercicios[siguienteEjercicio],
        siguienteEjercicio
      );

      contenedorEjercicios.appendChild(nuevaTarjeta);
      siguienteEjercicio++;
    }

    if (
      ejerciciosCompletados.size === totalEjercicios &&
      siguienteEjercicio === totalEjercicios
    ) {
      contenedorEjercicios.innerHTML = `
        <div class="all-completed">
          <h3>¡Felicitaciones! 🎉</h3>
          <p>Has completado los 30 ejercicios de ALGEON.</p>
        </div>
      `;
    }
  }

  function abrirEjercicio(boton) {
    ejercicioActual = boton;

    preguntaModal.textContent = boton.dataset.pregunta;
    tituloModal.innerHTML = 'Resuelve la ecuación<span>.</span>';
    enunciadoModal.textContent = boton.dataset.enunciado;

    entradaRespuesta.value = "";
    entradaRespuesta.disabled = false;

    resultado.textContent = "";
    resultado.className = "answer-feedback";

    formulario.hidden = false;
    botonReintentar.hidden = true;
    cerrarResultado.textContent = "Cerrar";

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setTimeout(() => entradaRespuesta.focus(), 100);
  }

  function cerrarVentana() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Si respondió correctamente, avanzar incluso si cierra con la X.
    retirarTarjetaCompletada();

    ejercicioActual = null;
  }

  function mostrarResultado(mensaje, tipo) {
    resultado.textContent = mensaje;
    resultado.className = `answer-feedback visible ${tipo}`;
  }

  function actualizarProgreso() {
    const completados = ejerciciosCompletados.size;
    const porcentaje = Math.round(
      (completados / totalEjercicios) * 100
    );

    textoProgreso.textContent = `${porcentaje}%`;

    textoPuntuacion.textContent =
      `Has completado ${completados} de ${totalEjercicios} ejercicios.`;

    progresoRelleno.style.width = `${porcentaje}%`;
    barraProgreso.setAttribute("aria-valuemax", totalEjercicios);
    barraProgreso.setAttribute("aria-valuenow", completados);
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!ejercicioActual) return;

    const textoRespuesta = entradaRespuesta.value.trim();
    const respuestaUsuario = Number(textoRespuesta);
    const respuestaCorrecta = Number(ejercicioActual.dataset.respuesta);

    if (textoRespuesta === "" || !Number.isFinite(respuestaUsuario)) {
      mostrarResultado(
        "Escribe una respuesta válida antes de comprobar.",
        "incorrect"
      );
      return;
    }

    if (Math.abs(respuestaUsuario - respuestaCorrecta) < 0.000001) {
      ejerciciosCompletados.add(ejercicioActual);
      tarjetaPendienteDeRetirar = ejercicioActual;

      mostrarResultado(
        "¡Correcto! 🎉 Has resuelto la ecuación. Tu progreso se ha actualizado.",
        "correct"
      );

      entradaRespuesta.disabled = true;
      formulario.hidden = true;
      botonReintentar.hidden = true;
      cerrarResultado.textContent = "¡Continuar!";

      ejercicioActual.disabled = true;
      ejercicioActual.textContent = "Completado ✓";
      ejercicioActual.classList.add("completado");

      actualizarProgreso();
    } else {
      mostrarResultado(
        `Todavía no es correcto. 💡 Pista: ${ejercicioActual.dataset.pista}`,
        "incorrect"
      );

      botonReintentar.hidden = false;
      cerrarResultado.textContent = "Cerrar";
    }
  });

  botonReintentar.addEventListener("click", () => {
    entradaRespuesta.value = "";
    entradaRespuesta.disabled = false;

    resultado.textContent = "";
    resultado.className = "answer-feedback";

    botonReintentar.hidden = true;
    entradaRespuesta.focus();
  });

  cerrarModal.addEventListener("click", cerrarVentana);
  cerrarResultado.addEventListener("click", cerrarVentana);

  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      cerrarVentana();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modal.classList.contains("active")) {
      cerrarVentana();
    }
  });

  cargarTarjetasIniciales();
  actualizarProgreso();

  console.log("ALGEON está listo con 30 ejercicios y máximo 6 tarjetas visibles.");
});
