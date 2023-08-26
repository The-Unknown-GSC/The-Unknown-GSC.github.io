const pokedexContainer = document.getElementById("pokedex");
const sortingSelect = document.getElementById("sortingSelect");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const paginationButtons = document.getElementById("paginationButtons"); // Added

let currentPage = 1;
const itemsPerPage = 20;
let isLoading = false;

const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
};

async function fetchPokemons(ascending = true) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        let pokemonList = data.results;
        if (sortingSelect.value === "name-asc") {
            pokemonList = sortByName(pokemonList, ascending);
        } else if (sortingSelect.value === "name-desc") {
            pokemonList = sortByName(pokemonList, !ascending);
        } else if (sortingSelect.value === "number") {
            pokemonList = sortByNumber(pokemonList);
        }

        displayPokemonList(pokemonList);

        // Show/hide pagination buttons based on search results
         if (pokemonList.length > 0) {
        paginationButtons.removeAttribute("hidden");
        if (currentPage === 1) {
            prevPageBtn.setAttribute("hidden", "");
        } else {
            prevPageBtn.removeAttribute("hidden");
        }
        if (pokemonList.length < itemsPerPage) {
            nextPageBtn.setAttribute("hidden", "");
        } else {
            nextPageBtn.removeAttribute("hidden");
        }
    } else {
        paginationButtons.setAttribute("hidden", "");
    }
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function sortByName(pokemonList, ascending = true) {
    return pokemonList.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return ascending ? comparison : -comparison;
    });
}


function sortByName(pokemonList, ascending = true) {
    return pokemonList.sort((a, b) => {
        const numA = parseInt(a.url.split("/")[6]);
        const numB = parseInt(b.url.split("/")[6]);
        return ascending ? numA - numB : numB - numA;
    });
}


function displayPokemonList(pokemonList) {
    let pokemonListHTML = "";

    for (const pokemon of pokemonList) {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                const typeTags = pokemonData.types.map(type => {
                    const capitalizedType = capitalizeFirstLetter(type.type.name);
                    const typeColor = typeColors[type.type.name] || "#000000";
                    const typeClass = type.type.name === "poison" ? "poison-type" : "";
                    return `<div class="type-tag" style="background-color: ${typeColor}; font-family: 'Flexo-Medium', arial, sans-serif;">${capitalizedType}</div>`;
                }).join("");
                const capitalizedName = capitalizeFirstLetter(pokemonData.name);
                const imgSrc = pokemonData.sprites.front_default;
                const nationalDexNumber = pokemonData.id;

                // Determine the size of the image to display
                const imageSize = Math.max(150, pokemonData.sprites.front_default.length);

                pokemonListHTML += `
                    <div class="pokemon-card">
                        <img src="${imgSrc}" alt="${capitalizedName}" style="width: ${imageSize}px; height: ${imageSize}px;">
                        <h3>${capitalizedName}</h3>
                        <div class="dex-number">#${nationalDexNumber.toString().padStart(3, '0')}</div>
                        <div class="types-container">${typeTags}</div>
                    </div>
                `;

                pokedexContainer.innerHTML = pokemonListHTML;
            })
            .catch(error => {
                console.error("Error fetching Pokémon data:", error);
            });
    }
}


sortingSelect.addEventListener("change", () => {
    const sortingOption = sortingSelect.value;

    if (sortingOption === "name-asc") {
        fetchPokemons(true); // A-Z sorting
    } else if (sortingOption === "name-desc") {
        fetchPokemons(false); // Z-A sorting
    } else if (sortingOption === "number") {
        fetchPokemons(); // Number sorting
    }
});


prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPokemons();
    }
});

nextPageBtn.addEventListener("click", () => {
    currentPage++;
    fetchPokemons();
});


document.getElementById("searchBtn").addEventListener("click", () => {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const filteredPokemons = pokemonList.filter(pokemon => pokemon.name.includes(searchInput));
    displayPokemonList(filteredPokemons); // Call the display function with the filtered data
});

// Initial fetch
fetchPokemons();