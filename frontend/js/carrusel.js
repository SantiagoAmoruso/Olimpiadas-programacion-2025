document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const cards = Array.from(track.children);
  const leftButton = document.querySelector('.arrow.left');
  const rightButton = document.querySelector('.arrow.right');

  if (cards.length === 0 || !leftButton || !rightButton) return;

  let currentIndex = 0;

  function getCardWidth() {
    return cards[0].offsetWidth + 20; // Incluye el gap
  }

  function updateCarousel() {
    const newTransform = -currentIndex * getCardWidth();
    track.style.transform = `translateX(${newTransform}px)`;
  }

  rightButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  leftButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
});
