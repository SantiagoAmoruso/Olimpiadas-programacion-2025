
  const track = document.getElementById("carousel-track");
  const leftBtn = document.querySelector(".arrow.left");
  const rightBtn = document.querySelector(".arrow.right");

  let cardWidth = 0;
  let cardsPerPage = 3;


  const initInfiniteCarousel = () => {
    const cards = track.children;
    cardWidth = cards[0].offsetWidth + 20; 

    const total = cards.length;
    for (let i = 0; i < cardsPerPage; i++) {
      const firstClone = cards[i].cloneNode(true);
      const lastClone = cards[total - 1 - i].cloneNode(true);
      track.appendChild(firstClone);
      track.insertBefore(lastClone, track.firstChild);
    }

 
    track.style.transform = `translateX(-${cardWidth * cardsPerPage}px)`;
  };

  let index = cardsPerPage;

  const moveCarousel = (direction) => {
    index += direction;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${cardWidth * index}px)`;

    track.addEventListener('transitionend', () => {
      if (index <= 0) {
        track.style.transition = 'none';
        index = track.children.length - (cardsPerPage * 2);
        track.style.transform = `translateX(-${cardWidth * index}px)`;
      }
      if (index >= track.children.length - cardsPerPage) {
        track.style.transition = 'none';
        index = cardsPerPage;
        track.style.transform = `translateX(-${cardWidth * index}px)`;
      }
    }, { once: true });
  };

  rightBtn.addEventListener("click", () => moveCarousel(1));
  leftBtn.addEventListener("click", () => moveCarousel(-1));

  window.addEventListener("load", initInfiniteCarousel);
  window.addEventListener("resize", () => {
    cardWidth = track.children[0].offsetWidth + 20;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  });