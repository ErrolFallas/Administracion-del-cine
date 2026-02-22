/* =======================
   GET SALAS
======================= */
async function getSalas() {
    try {
        const respuesta = await fetch("http://localhost:3000/salas");
        const datosSalas = await respuesta.json();
        return datosSalas;
    } catch (error) {
        console.error("Error al obtener salas", error);
    }
}
export { getSalas };


/* =======================
   POST SALAS
======================= */
async function postSalas(salas) {
    try {
        const respuesta = await fetch("http://localhost:3000/salas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(salas)
        });

        const datoSala = await respuesta.json();
        return datoSala;
    } catch (error) {
        console.error("Error al agregar la sala", error);
    }
}
export { postSalas };


/* =======================
   PUT SALAS
======================= */
async function updateSalas(id, salas) {
    try {
        const respuesta = await fetch(`http://localhost:3000/salas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(salas)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar la sala", error);
    }
}
export { updateSalas };


/* =======================
   DELETE SALAS
======================= */
async function deleteSalas(id) {
    try {
        await fetch(`http://localhost:3000/salas/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error("Error al eliminar la sala", error);
    }
}
export { deleteSalas };


/* =======================
   PATCH SALAS
======================= */
async function updatePatchSalas(id, salas) {
    try {
        const respuesta = await fetch(`http://localhost:3000/salas/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(salas)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al editar la sala", error);
    }
}
export { updatePatchSalas };