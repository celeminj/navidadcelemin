// Manejar el envío del formulario
document.getElementById('cartaForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const contenido = document.getElementById('contenido').value;
    const url = document.getElementById('url').value;

    // Obtener las cartas guardadas en localStorage
    let cartas = JSON.parse(localStorage.getItem('cartas')) || [];

    // Añadir la nueva carta al array
    cartas.push({ nombre, contenido, url });

    // Guardar el array de cartas actualizado en localStorage
    localStorage.setItem('cartas', JSON.stringify(cartas));

    alert('Carta enviada correctamente.');
    loadCartas(); // Cargar las cartas después de enviar una nueva
    document.getElementById('cartaForm').reset(); // Limpiar el formulario
});

// Cargar las cartas enviadas
function loadCartas() {
    // Obtener las cartas guardadas
    const cartas = JSON.parse(localStorage.getItem('cartas')) || [];
    const cartasList = document.getElementById('cartasList');

    // Limpiar la lista para evitar duplicados
    cartasList.innerHTML = '';

    // Iterar sobre cada carta y agregarla a la lista
    cartas.forEach((carta, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${carta.nombre}:</strong> ${carta.contenido} <br>
            ${carta.url ? `<a href="${carta.url}" target="_blank">Ver regalo</a>` : ''}
            <br>
            <button onclick="deleteCarta(${index})">Borrar</button>
        `;
        cartasList.appendChild(li);
    });
}

// Borrar una carta
function deleteCarta(index) {
    // Obtener las cartas actuales
    let cartas = JSON.parse(localStorage.getItem('cartas')) || [];
    cartas.splice(index, 1); // Eliminar la carta seleccionada

    // Actualizar las cartas en localStorage
    localStorage.setItem('cartas', JSON.stringify(cartas));

    // Recargar la lista de cartas
    loadCartas();
}

// Cargar las cartas al iniciar
window.onload = function () {
    loadCartas();
};
