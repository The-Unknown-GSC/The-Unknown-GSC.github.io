const hintButton = document.getElementById("hintButton");
const quitButton = document.getElementById("quitButton");
const pokeHeight = document.getElementById("poke-height");
const pokeWeight = document.getElementById("poke-weight");
const searchButton = document.getElementById("searchButton");
const pokemonInput = document.getElementById("pokemonInput");
const feedbackMessage = document.getElementById("feedbackMessage");

const apiUrl = "https://pokeapi.co/api/v2/pokemon/1";

// Fetch Pokémon data from API
async function fetchPokemonData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Display Pokémon characteristics
async function displayPokemonInfo() {
    const pokemonData = await fetchPokemonData();
    pokeHeight.textContent = `Height: ${pokemonData.height} decimetres`;
    pokeWeight.textContent = `Weight: ${pokemonData.weight} hectograms`;
}

quitButton.addEventListener("click", () => {
    alert("Bulbasaur");
    // You can add more logic to end the game or reset it here
});

// Initial display of Pokémon information
displayPokemonInfo();
// ... (previous JavaScript code)
searchButton.addEventListener("click", () => {
    const userGuess = pokemonInput.value.toLowerCase();

    fetchPokemonData().then(pokemonData => {
        const actualPokemonName = pokemonData.name.toLowerCase();
        
        if (userGuess === actualPokemonName) {
            feedbackMessage.textContent = "Correct! You guessed the Pokémon!";
        } else {
            feedbackMessage.textContent = "Wrong! Your guess is incorrect.";
        }
    });
});

// pokeguesser.js
const pokemonList = ["pikachu", "charmander", "bulbasaur", "squirtle", /* ... */];
let selectedPokemon;

function getRandomPokemon() {
  const randomIndex = Math.floor(Math.random() * pokemonList.length);
  return pokemonList[randomIndex];
}

function fetchPokemonDetails(pokemonName) {
  // Fetch Pokémon details using the PokeAPI or other Pokémon API
  // Update the UI with the fetched data
}

function startNewGame() {
  selectedPokemon = getRandomPokemon();
  fetchPokemonDetails(selectedPokemon);
}

document.getElementById("searchButton").addEventListener("click", () => {
  const userGuess = document.getElementById("pokemonInput").value.toLowerCase();
  if (userGuess === selectedPokemon) {
    document.getElementById("feedbackMessage").textContent = "Correct! It's " + selectedPokemon;
  } else {
    document.getElementById("feedbackMessage").textContent = "Incorrect. Try again!";
  }
});

document.getElementById("hintButton").addEventListener("click", () => {
  // Provide a hint, such as the type of the selected Pokémon
});

document.getElementById("quitButton").addEventListener("click", () => {
  startNewGame();
});

startNewGame();

function getRandomAttribute(pokemonData) {
    const attributes = ["height", "weight", "base_experience"]; // Add more attributes if needed
    const randomIndex = Math.floor(Math.random() * attributes.length);
    const randomAttribute = attributes[randomIndex];
    return {
        name: randomAttribute,
        value: pokemonData[randomAttribute]
    };
}

// Display the attribute that the player needs to guess
function displayAttributeToGuess(attribute) {
    document.getElementById("guessAttribute").textContent = `Guess the ${attribute.name.replace('_', ' ')}:`;
    document.getElementById("attributeValue").textContent = attribute.value;
}

// Fetch Pokémon details using the PokeAPI and update UI
function displayCharacteristicsToGuess(attributes) {
    for (let i = 0; i < 3; i++) {
        const guessAttribute = document.getElementById(`guessAttribute${i + 1}`);
        const attributeValue = document.getElementById(`attributeValue${i + 1}`);
  
        guessAttribute.textContent = `Guess the ${attributes[i].name}:`;
        attributeValue.textContent = attributes[i].value;
    }
}

// Fetch Pokémon details using the PokeAPI and update UI
document.getElementById("hintButton").addEventListener("click", () => {
    // Provide a hint, such as the type of the selected Pokémon
    fetchPokemonData(selectedPokemon)
        .then(pokemonData => {
            const hint = `This Pokémon is of type: ${pokemonData.types[0].type.name}`;
            alert("Hint: " + hint);
        })
        .catch(error => {
            console.error("Error fetching Pokémon details for hint:", error);
        });
});


// Event listener for the search button
searchButton.addEventListener("click", () => {
    const userGuess = pokemonInput.value.toLowerCase();

    if (userGuess === selectedPokemon) {
        feedbackMessage.textContent = "Correct! You guessed the Pokémon!";
    } else {
        feedbackMessage.textContent = "Incorrect. Try again!";
    }
});

// Start a new game when the Quit button is clicked
quitButton.addEventListener("click", () => {
  startNewGame();
});

// Start a new game initially
startNewGame();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


document.getElementById("hintButton").addEventListener("click", () => {
    // Provide a hint, such as the type of the selected Pokémon
    fetchPokemonData(selectedPokemon)
        .then(pokemonData => {
            const hint = `This Pokémon is of type: ${pokemonData.types[0].type.name}`;
            alert("Hint: " + hint);
        })
        .catch(error => {
            console.error("Error fetching Pokémon details for hint:", error);
        });
});

function startNewGame() {
    selectedPokemon = getRandomPokemon();
    fetchPokemonDetails(selectedPokemon);
}