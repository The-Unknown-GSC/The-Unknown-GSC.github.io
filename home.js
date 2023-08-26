const pokemonImages = document.querySelector('.pokemon-images');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');



let currentTranslateX = 0;
rightArrow.addEventListener('click', () => {
    currentTranslateX -= 220; // Adjust this value according to your image width + margin
    updateTranslateX();
  });
  
leftArrow.addEventListener('click', () => {
    currentTranslateX += 220; // Adjust this value according to your image width + margin
    updateTranslateX();
  });
 
function updateTranslateX() {
  pokemonImages.style.transform = `translateX(${currentTranslateX}px)`;
}