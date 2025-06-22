document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const cards = Array.from(track.children);
  const leftButton = document.querySelector('.arrow.left');
  const rightButton = document.querySelector('.arrow.right');

  const cardWidth = cards[0].offsetWidth + 20; // Ancho + gap
  let currentIndex = 0;

  function updateCarousel() {
    const newTransform = -currentIndex * cardWidth;
    track.style.transform = `translateX(${newTransform}px)`;
  }

  rightButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= cards.length) {
      currentIndex = 0; // Reinicia al principio
    }
    updateCarousel();
  });

  leftButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = cards.length - 1; // Va al final
    }
    updateCarousel();
  });

  // En caso de que cambie el tamaño de la ventana
  window.addEventListener('resize', () => {
    updateCarousel(); // Recalcula en función del nuevo ancho
  });
});
