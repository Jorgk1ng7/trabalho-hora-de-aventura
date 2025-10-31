const carousel = document.getElementById('carousel');

fetch('http://localhost:3000/kingdoms')
  .then(res => {
    if (!res.ok) throw new Error('Erro na resposta: ' + res.status);
    return res.json();
  })
  .then(data => {
    carousel.innerHTML = '';

    const kingdoms = data || [];

    if (kingdoms.length === 0) {
      carousel.innerHTML = '<p>Nenhum reino encontrado.</p>';
      return;
    }

    kingdoms.forEach(kingdom => {
      const container = document.createElement('div');
      container.className = 'kingdom-container';

      const img = document.createElement('img');
      img.src = kingdom.image;
      img.alt = kingdom.name;
      img.className = 'kingdom-image';

      const title = document.createElement('div');
      title.className = 'kingdom-title';
      title.textContent = kingdom.name;

      const description = document.createElement('div');
      description.className = 'kingdom-description';
      description.textContent = kingdom.description;

      container.appendChild(img);
      container.appendChild(title);
      container.appendChild(description);
      carousel.appendChild(container);
    });
  })
  .catch(err => {
    carousel.innerHTML = `<p>Erro: ${err.message}</p>`;
    console.error('Erro ao buscar dados:', err);
  });

// Navegação do carrossel
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -320, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: 320, behavior: 'smooth' });
});
