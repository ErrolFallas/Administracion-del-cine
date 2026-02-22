/* =======================
   GET PELÍCULAS
======================= */
async function getPeliculas() {
    try {
        const respuesta = await fetch("http://localhost:3000/peliculas");
        const datosPeliculas = await respuesta.json();
        return datosPeliculas;
    } catch (error) {
        console.error("Error al obtener películas", error);
    }
}
export { getPeliculas };


/* =======================
   POST PELÍCULAS
======================= */
async function postPeliculas(peliculas) {
    try {
        const respuesta = await fetch("http://localhost:3000/peliculas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(peliculas)
        });

        const datoPelicula = await respuesta.json();
        return datoPelicula;
    } catch (error) {
        console.error("Error al agregar la película", error);
    }
}
export { postPeliculas };


/* =======================
   PUT PELÍCULAS
======================= */
async function updatePeliculas(id, peliculas) {
    try {
        const respuesta = await fetch(`http://localhost:3000/peliculas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(peliculas)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar la película", error);
    }
}
export { updatePeliculas };


/* =======================
   DELETE PELÍCULAS
======================= */
async function deletePeliculas(id) {
    try {
        await fetch(`http://localhost:3000/peliculas/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error("Error al eliminar la película", error);
    }
}
export { deletePeliculas };


/* =======================
   PATCH PELÍCULAS
======================= */
async function updatePatchPeliculas(id, peliculas) {
    try {
        const respuesta = await fetch(`http://localhost:3000/peliculas/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(peliculas)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al editar la película", error);
    }
}
export { updatePatchPeliculas };