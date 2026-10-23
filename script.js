
/* =========================================
   ALGEON — INTERACTIVIDAD Y PROGRESO
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Elementos de la ventana de ejercicios
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

  // Elementos del progreso
  const textoProgreso = document.getElementById("textoProgreso");
  const textoPuntuacion = document.getElementById("textoPuntuacion");
  const barraProgreso = document.getElementById("barraProgreso");
  const progresoRelleno = document.getElementById("progresoRelleno");

  // Estado del ejercicio actual
  let ejercicioActual = null;

  // Guardamos los ejercicios completados correctamente.
  // Set evita contar dos veces el mismo ejercicio.
  const ejerciciosCompletados = new Set();

  const botonesEjercicio = document.querySelectorAll(".btn-resolver");
  const totalEjercicios = botonesEjercicio.length;

  // Abrir la ventana de un ejercicio
  function abrirEjercicio(boton) {
    ejercicioActual = boton;

    preguntaModal.textContent = boton.dataset.pregunta || "DESAFÍO";
    tituloModal.innerHTML = 'Resuelve la ecuación<span>.</span>';
    enunciadoModal.textContent = boton.dataset.enunciado || "Encuentra el valor de x.";

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

    // Colocar el cursor en el campo de respuesta
    setTimeout(() => entradaRespuesta.focus(), 100);
  }

  // Cerrar la ventana
  function cerrarVentana() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    ejercicioActual = null;
  }

  // Mostrar mensajes de resultado
  function mostrarResultado(mensaje, tipo) {
    resultado.textContent = mensaje;
    resultado.className = `answer-feedback visible ${tipo}`;
  }

  // Actualizar la barra de progreso
  function actualizarProgreso() {
    const completados = ejerciciosCompletados.size;

    const porcentaje = totalEjercicios > 0
      ? Math.round((completados / totalEjercicios) * 100)
      : 0;

    textoProgreso.textContent = `${porcentaje}%`;

    textoPuntuacion.textContent =
      `Has completado ${completados} de ${totalEjercicios} ejercicios.`;

    progresoRelleno.style.width = `${porcentaje}%`;

    barraProgreso.setAttribute("aria-valuenow", completados);
  }

  // Conectar los botones Resolver
  botonesEjercicio.forEach((boton) => {
    boton.addEventListener("click", () => {
      abrirEjercicio(boton);
    });
  });

  // Comprobar la respuesta
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!ejercicioActual) return;

    const respuestaUsuario = Number(entradaRespuesta.value);
    const respuestaCorrecta = Number(ejercicioActual.dataset.respuesta);

    if (
      entradaRespuesta.value.trim() === "" ||
      !Number.isFinite(respuestaUsuario)
    ) {
      mostrarResultado(
        "Escribe una respuesta válida antes de comprobar.",
        "incorrect"
      );
      return;
    }

    if (respuestaUsuario === respuestaCorrecta) {
      ejerciciosCompletados.add(ejercicioActual);

      mostrarResultado(
        "¡Correcto! 🎉 Has resuelto la ecuación.\nTu progreso se ha actualizado.",
        "correct"
      );

      // Evitar volver a responder el ejercicio ya completado
      entradaRespuesta.disabled = true;
      formulario.hidden = true;
      botonReintentar.hidden = true;
      cerrarResultado.textContent = "¡Continuar!";

      actualizarProgreso();
    } else {
      const pista = ejercicioActual.dataset.pista || "Intenta despejar x paso a paso.";

      mostrarResultado(
        `Todavía no es correcto. 💡\nPista: ${pista}`,
        "incorrect"
      );

      botonReintentar.hidden = false;
      cerrarResultado.textContent = "Cerrar";
    }
  });

  // Volver a intentar
  botonReintentar.addEventListener("click", () => {
    entradaRespuesta.value = "";
    entradaRespuesta.disabled = false;

    resultado.textContent = "";
    resultado.className = "answer-feedback";

    botonReintentar.hidden = true;
    entradaRespuesta.focus();
  });

  // Cerrar desde la X
  cerrarModal.addEventListener("click", cerrarVentana);

  // Cerrar desde el botón inferior
  cerrarResultado.addEventListener("click", cerrarVentana);

  // Cerrar al hacer clic fuera de la ventana
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      cerrarVentana();
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modal.classList.contains("active")) {
      cerrarVentana();
    }
  });

  // Iniciar la barra de progreso
  actualizarProgreso();

  console.log("ALGEON está listo. ¡A aprender álgebra!");
});
