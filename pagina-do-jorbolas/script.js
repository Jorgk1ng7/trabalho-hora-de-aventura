const content = document.getElementById('content');

fetch('http://localhost:3000/kingdoms')
  .then(res => {
    if (!res.ok) throw new Error('Erro na resposta: ' + res.status);
    return res.json();
  })
  .then(data => {
    content.innerHTML = '';
    if (data.length === 0) {
      content.innerHTML = '<p>Nenhum reino encontrado.</p>';
      return;
    }

    data.forEach(kingdom => {
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
      content.appendChild(container);
    });
  })
  .catch(err => {
    content.innerHTML = `<p>Erro: ${err.message}</p>`;
    console.error('Erro ao buscar dados:', err);
  });