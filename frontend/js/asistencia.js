
  document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const faqItems = document.querySelectorAll('.faq-item');

    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();

      faqItems.forEach(item => {
        const question = item.querySelector('h3').textContent.toLowerCase();
        const answer = item.querySelector('p').textContent.toLowerCase();

        if (question.includes(query) || answer.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
