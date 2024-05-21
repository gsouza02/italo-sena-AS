let flashcards = [];

function iniciar() {
  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="container">
      <button class="button" onclick="carregarConjunto()">CARREGAR CONJUNTO</button>
      <button class="button" onclick="criarConjunto()">CRIAR CONJUNTO</button>
      <button class="button" onclick="voltar()">VOLTAR</button>
    </div>
  `;
}

function voltar() {
  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="title">FLASHCARDS
      <div class="subtitle">FRASE DE IMPACTO!</div>
    </div>
    <div class="line"></div>
    <button class="button" onclick="iniciar()">INICIAR</button>
    <button class="button" onclick="sair()">SAIR</button>
  `;
}

function sair() {
  window.close();
}

function carregarConjunto() {
  // Implemente a lógica para carregar um conjunto existente
}

function criarConjunto() {
  renderFlashcards();
    }

function renderFlashcards() {
  const container = document.querySelector('#main-container');
  let flashcardListHTML = flashcards.map((flashcard, index) => `
    <div class="flashcard-item" onclick="mostrarPreview(${index})">
      ${flashcard.pergunta}
      <div>
        <button onclick="event.stopPropagation(); editarFlashcard(${index})">✏️</button>
        <button onclick="event.stopPropagation(); excluirFlashcard(${index})">❌</button>
      </div>
    </div>
  `).join('');

  console.log(flashcards.length)

  container.innerHTML = `
    <div class="container sans-serif">
      <div class="flashcard-container">
        <div class="flashcard-list">
          <h2>LISTA DE FLASHCARDS</h2>
          ${flashcardListHTML}
          <button class="button" onclick="criarFlashcard()">CRIAR FLASHCARD</button>
        </div>
        <div class="flashcard-preview">
          ${flashcards.length > 0 ? gerarPreviewHTML(0) : '<h2>Selecione um flashcard</h2>'}
        </div>
      </div>
    </div>
  `;
}

function mostrarPreview(index) {
  const previewContainer = document.querySelector('.flashcard-preview');
  previewContainer.innerHTML = gerarPreviewHTML(index);
}

function gerarPreviewHTML(index) {
  const flashcard = flashcards[index];
  return `
    <div class="flashcard-card" onclick="virarFlashcard(this)">
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <h2>${flashcard.pergunta}</h2>
        </div>
        <div class="flashcard-back">
          <h3>${flashcard.resposta}</h3>
        </div>
      </div>
    </div>
  `;
}

function virarFlashcard(card) {
  card.querySelector('.flashcard-inner').classList.toggle('is-flipped');
}

function editarFlashcard(index) {
  const flashcard = flashcards[index];
  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="container sans-serif">
      <div class="flashcard-edit-container">
        <h2>Editar Flashcard</h2>
        <textarea id="edit-pergunta" rows="2" cols="75">${flashcard.pergunta}</textarea>
        <textarea id="edit-resposta" rows="2" cols="75">${flashcard.resposta}</textarea>
        <div class="button-container">
          <button class="button" onclick="salvarEdicao(${index})">SALVAR</button>
          <button class="button" onclick="criarConjunto()">CANCELAR</button>
        </div>
      </div>
    </div>
  `;
}

function salvarEdicao(index) {
  const pergunta = document.querySelector('#edit-pergunta').value;
  const resposta = document.querySelector('#edit-resposta').value;
  flashcards[index] = { pergunta, resposta };
  criarConjunto();
}

function excluirFlashcard(index) {
  flashcards.splice(index, 1);
  criarConjunto();
}

function criarFlashcard() {
  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="container sans-serif">
      <div class="flashcard-edit-container">
        <h2>Criar Flashcard</h2>
        <textarea id="new-pergunta" placeholder="Pergunta" rows="2" cols="75"></textarea>
        <textarea id="new-resposta" placeholder="Resposta" rows="2" cols="75"></textarea>
        <div class="button-container">
          <button class="button" onclick="salvarNovoFlashcard()">SALVAR</button>
          <button class="button" onclick="criarConjunto()">CANCELAR</button>
        </div>
      </div>
    </div>
  `;
}

function salvarNovoFlashcard() {
  const pergunta = document.querySelector('#new-pergunta').value;
  const resposta = document.querySelector('#new-resposta').value;
  flashcards.push({ pergunta, resposta });
  criarConjunto();
}