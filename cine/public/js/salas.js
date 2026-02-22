import { getSalas, postSalas, deleteSalas, updatePatchSalas } from "../services/serviceSalas.js";
import { getPeliculas, postPeliculas, deletePeliculas, updatePatchPeliculas } from "../services/servicePeliculas.js";
window.onbeforeunload = () => "estas seguro de salir"

let nombreSala = document.getElementById("nombreSala");
let capacidadSala = document.getElementById("capacidadSala");
let tipoSala = document.getElementById("tipoSala");
let estadoSala = document.getElementById("estadoSala");
let equipamiento = document.getElementById("equipamiento");

const contenedorPeliculas = document.getElementById("contenedorPeliculas");

let btnGuardarSala = document.getElementById("btnGuardarSala");

async function cargarPeliculasEnSelect() {
    try {

        let peliculas = await getPeliculas(); /* obtener películas */
        contenedorPeliculas.textContent = "";

        let selectPeliculas = document.createElement("select");
        selectPeliculas.id = "peliculaSeleccionada"; /* el id de este select */


        const optionDefault = document.createElement("option");/*  opción por defecto */
        optionDefault.value = "";
        optionDefault.textContent = "Seleccione una película";
        selectPeliculas.appendChild(optionDefault);


        for (let i = 0; i < peliculas.length; i++) {  /* recorrer películas del DB.json */
            const option = document.createElement("option");
            option.value = peliculas[i].id;           /* id película */
            option.textContent = peliculas[i].titulo;  /* nombre */
            selectPeliculas.appendChild(option);
        }


        contenedorPeliculas.appendChild(selectPeliculas); /* agregar select al contenedor */

    } catch (error) {
        console.error("Error al cargar películas", error);
    }
}

cargarPeliculasEnSelect();

btnGuardarSala.addEventListener("click", async function () {
    try {
        const selectPeliculas = document.getElementById("peliculaSeleccionada");
        if (nombreSala.value.trim() === "" || capacidadSala.value.trim() === "" || tipoSala.value.trim() === "" || estadoSala.value.trim() === "" || equipamiento.value.trim() === ""
        ) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error",
                confirmButtonText: "OK"
            });
        } else {
            const peliculas = await getPeliculas();

        const peliculaSeleccionada = peliculas.find(
            pelicula => pelicula.id == selectPeliculas.value
        );
        if (!peliculaSeleccionada) {
            Swal.fire({
                title: "Error",
                text: "Película no encontrada",
                icon: "error"
            });
            return;
        } else {
            const sala = {
                nombre: nombreSala.value.trim(),
                capacidad: capacidadSala.value.trim(),
                tipo: tipoSala.value.trim(),
                estado: estadoSala.value.trim(),
                equipamiento: equipamiento.value.trim(),
                peliculaId: peliculaSeleccionada.id,
                peliculaTitulo: peliculaSeleccionada.titulo,
                horaInicioSala: peliculaSeleccionada.horaInicio,
                horaFinSala: peliculaSeleccionada.horaFin
            };

            await postSalas(sala);
        

            Swal.fire({
                title: "Registro exitoso",
                text: "La sala fue registrada correctamente",
                icon: "success",
                confirmButtonText: "Continuar"
            });

            /* Limpiar campos */
            nombreSala.value = "";
            capacidadSala.value = "";
            tipoSala.value = "";
            estadoSala.value = "";
            equipamiento.value = "";
        }
        }
  
    } catch (error) {
        console.error("Error al registrar la sala", error);
    }
});