/**
 * Muestra la información de un Pokémon en el DOM.
 * @param {Object} poke - Objeto que contiene la información del Pokémon.
 */
function mostrarPokemon(poke) {
    // Obtener los tipos del Pokémon y crear las etiquetas correspondientes.
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // Formatear el ID del Pokémon.
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Crear el elemento div para mostrar la información del Pokémon.
    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.innerHTML = `
        <p class="pokemon-id-back">#${poke.id}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

/**
 * Desplaza la ventana hacia arriba de manera suave.
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// Obtener el elemento del DOM que contiene la lista de Pokémon.
const listaPokemon = document.querySelector('#lista-pokemon');

// Obtener los botones del encabezado.
const btnHeader = document.querySelectorAll('.btn-header');

// URL base de la API de Pokémon.
let URL = 'https://pokeapi.co/api/v2/pokemon/';

// Obtener la información de los primeros 151 Pokémon.
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then((data) => mostrarPokemon(data));
}

// Agregar un evento de clic a cada botón del encabezado.
btnHeader.forEach((btn) => 
    btn.addEventListener('click', (event) => {
        const btnId = event.currentTarget.id;

        // Limpiar la lista de Pokémon en el DOM.
        listaPokemon.innerHTML = "";

        // Obtener la información de los primeros 151 Pokémon según el botón seleccionado.
        for (let i = 1; i <= 151; i++) {
            fetch(URL + i)
                .then((response) => response.json())
                .then((data) => { 

                    if (btnId === "verTodos") {
                        mostrarPokemon(data);
                    } else {
                        const tipos = data.types.map((type) => type.type.name);
                        if (tipos.some(tipo => tipo.includes(btnId))) {
                            mostrarPokemon(data);
                        }
                    }
                });
        }
    }));
