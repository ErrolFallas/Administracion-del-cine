import { getPeliculas, postPeliculas, deletePeliculas, updatePatchPeliculas } from "../services/servicePeliculas.js";

window.onbeforeunload = () => "estas seguro de salir"

let tituloPelicula = document.getElementById("tituloPelicula");
let sinopsisPelicula = document.getElementById("sinopsisPelicula");
let duracionPelicula = document.getElementById("duracionPelicula");
let clasificacionPelicula = document.getElementById("clasificacionPelicula");
let generoPelicula = document.getElementById("generoPelicula");
let fechaInicio = document.getElementById("fechaInicio");
let fechaFin = document.getElementById("fechaFin");
let horaInicio = document.getElementById("horaInicio");
let estado = document.getElementById("estado");
let material = document.getElementById("material");

let btnGuardarPelicula = document.getElementById("btnGuardarPelicula");

function calcularHoraFin(horaInicio, duracion) {
    const [horaI, minutoI] = horaInicio.split(":").map(Number);
    const [horaD, minutoD] = duracion.split(":").map(Number);

    const inicioEnMinutos = (horaI * 60) + minutoI;
    const duracionEnMinutos = (horaD * 60) + minutoD;

    const totalMinutos = inicioEnMinutos + duracionEnMinutos;

    const horaFin = Math.floor(totalMinutos / 60) % 24;
    const minutoFin = totalMinutos % 60;

    return `${horaFin.toString().padStart(2, "0")}:${minutoFin
        .toString()
        .padStart(2, "0")}`;
}

btnGuardarPelicula.addEventListener("click", async function () {
    try {
        if (tituloPelicula.value.trim() === "" || sinopsisPelicula.value.trim() === "" || duracionPelicula.value.trim() === "" || clasificacionPelicula.value.trim() === "" || generoPelicula.value.trim() === "" || fechaInicio.value.trim() === "" || fechaFin.value.trim() === "" || horaInicio.value.trim() === "" || estado.value.trim() === ""
        ) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error",
                confirmButtonText: "OK"
            });
        } else {
            const horaFinCalculada = calcularHoraFin(
                horaInicio.value.trim(),
                duracionPelicula.value.trim()
            );

            const pelicula = {
                titulo: tituloPelicula.value.trim(),
                sinopsis: sinopsisPelicula.value.trim(),
                duracion: duracionPelicula.value.trim(),
                clasificacion: clasificacionPelicula.value.trim(),
                genero: generoPelicula.value.trim(),
                fechaInicio: fechaInicio.value.trim(),
                fechaFin: fechaFin.value.trim(),
                horaInicio: horaInicio.value.trim(),
                horaFin: horaFinCalculada,
                estado: estado.value.trim(),
                material: material.src
            };

            await postPeliculas(pelicula);

            Swal.fire({
                title: "Registro exitoso",
                text: "La película fue registrada correctamente",
                icon: "success",
                confirmButtonText: "Continuar"
            });

            /* Limpiar campos */
            tituloPelicula.value = "";
            sinopsisPelicula.value = "";
            duracionPelicula.value = "";
            clasificacionPelicula.value = "";
            generoPelicula.value = "";
            fechaInicio.value = "";
            fechaFin.value = "";
            horaInicio.value = "";
            estado.value = "";
        }
    } catch (error) {
        console.error("Error al registrar la película", error);
    }
});