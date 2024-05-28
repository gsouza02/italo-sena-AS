function iniciarTransicao() {
  var container = document.getElementById('main-container');
  container.setAttribute('transition-style', 'in:circle:center');
}


function iniciar() {
  curPos = 0;
  iniciarTransicao();
  document.body.style.backgroundColor = "#003c66";
  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="container">
      <div id="error-message" style="color: red;"></div>
      <button class="button2" onclick="sorteio()">INICIAR ESTUDO</button2>
      <button class="button2" onclick="criarConjunto()">CRIAR FLASHCARDS</button2>
      <button class="button2" onclick="voltar()">VOLTAR</button2>
    </div>
  `;
}

function voltar() {
  document.body.style.backgroundColor = "#4c88bd";
  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="title">FLASHCARDS
      <div class="subtitle">GALVÃO BUENO!</div>
    </div>
    <div class="line"></div>
    <button class="button" onclick="iniciar()">INICIAR</button>
    <button class="button" onclick="sair()">SAIR</button>
  `;
}


function sair() {
  window.close();
}

function criarConjunto() {
  document.body.style.backgroundColor = "#4c88bd";
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

  let counterColor = flashcards.length >= 10 ? 'green' : 'red';
  let counterMessage = flashcards.length >= 10 ? '' : ' (Mínimo: 10)';

  const counterHTML = `<div class="counter" style="color: ${counterColor}">${flashcards.length}/10${counterMessage}</div>`;

  container.innerHTML = `
    <div class="container sans-serif">
      <div class="flashcard-container">
      <div class="flashcard-list">
      <h2>LISTA DE FLASHCARDS</h2>
      <div class="nomes-flashcards">
      ${counterHTML}
      ${flashcardListHTML}
      </div>
      <div class="botoes-flashcards">
      <button class="button" onclick="criarFlashcard()">CRIAR FLASHCARD!</button>
      <button class="button" onclick="iniciar()">VOLTAR!</button>
      </div>
      </div>
      <div class="flashcards-preview">
        <div class="flashcard-preview">
          ${flashcards.length > 0 ? gerarPreviewHTML(0) : '<h2>Selecione um flashcard</h2>'}
        </div>
        </div>
        </div>
        </div>
        <button class="button2" onclick="sorteio()">INICIAR ESTUDO</button>
        <div id="error-message" style="color: red;"></div>
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
          <h2 class="pour">PERGUNTA</h2>
          <h2>${flashcard.pergunta}</h2>
          
        </div>
        <div class="flashcard-back">
         <h2 class="pour">RESPOSTA</h2>
          <h2 class="pour"></h2>
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
  document.body.style.backgroundColor = "#444";
  const flashcard = flashcards[index];
  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="container sans-serif">
      <div class="flashcard-edit-container">
        <h2>Editar Flashcard</h2>
        <div class="line2"></div>
        <div class="input-group">
          <input type="text" name="text" id="edit-pergunta" value="${flashcard.pergunta}" required>
          <label class="label" for="edit-pergunta">Pergunta</label>
        </div>
        <div class="input-group">
          <input type="text" id="edit-resposta" value="${flashcard.resposta}" required>
          <label class="label" for="edit-resposta">Resposta</label>
        </div>
        <div id="error-message" style="color: red;"></div>
        <div class="button-container">
          <button class="button3" onclick="salvarEdicao(${index})">SALVAR</button>
          <button class="button3" onclick="criarConjunto()">CANCELAR</button>
        </div>
      </div>
    </div>
  `;
}

function salvarEdicao(index) {
  const card = flashcards[index];
  const perguntaCard = card.pergunta;
  const caixa = card.caixa

  const pergunta = document.querySelector('#edit-pergunta').value;
  const resposta = document.querySelector('#edit-resposta').value;

  const perguntaExistente = flashcards.find(flashcard => flashcard.pergunta === pergunta);

  if (perguntaExistente) {
    if (pergunta != perguntaCard) {
      document.querySelector('#error-message').textContent = 'Já existe um flashcard com esta pergunta!';
      return;
    }
  }

  if (pergunta === '' || resposta === '') {
    document.querySelector('#error-message').textContent = 'Por favor, preencha tanto a pergunta quanto a resposta antes de salvar.';
    return;
  }


  let i = 0;
  if (caixa === 1) {
    while (caixa1[i].pergunta != perguntaCard) i++;
    caixa1[i] = { pergunta, resposta, caixa };
  } else if (caixa === 2) {
    while (caixa2[i].pergunta != perguntaCard) i++;
    caixa2[i] = { pergunta, resposta, caixa };
  } else {
    while (caixa3[i].pergunta != perguntaCard) i++;
    caixa3[i] = { pergunta, resposta, caixa };
  }


  flashcards[index] = { pergunta, resposta, caixa };


  criarConjunto();
  mostrarPreview(index);
}

function excluirFlashcard(index) {
  const card = flashcards[index];
  const perguntaCard = card.pergunta;

  let i = 0;
  if (card.caixa === 1) {
    while (caixa1[i].pergunta != perguntaCard) i++;
    caixa1.splice(i, 1)
  } else if (card.caixa === 2) {
    while (caixa2[i].pergunta != perguntaCard) i++;
    caixa2.splice(i, 1)
  } else {
    while (caixa3[i].pergunta != perguntaCard) i++;
    caixa3.splice(i, 1)
  }

  flashcards.splice(index, 1);
  criarConjunto();
}


function criarFlashcard() {
  document.body.style.backgroundColor = "#444";
  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="container sans-serif">
      <div class="flashcard-edit-container">
        <h2>Criar Flashcard</h2>
        <div class="line2"></div>
        <div class="input-group">
          <input type= "text" name="text" id="new-pergunta" required>
          <label class= "label"> Pergunta </label>
          </div>
        <div class="input-group">
          <input type= "text" name="text" id="new-resposta" required>
          <label class= "label"> Resposta </label>
          </div>
          <div id="error-message" style="color: red;"></div>
        <div class="button-container">
          <button class="button3" onclick="salvarNovoFlashcard()">SALVAR</button>
          <button class="button3" onclick="criarConjunto()">CANCELAR</button>
        </div>
      </div>
    </div>
  `;
}

function salvarNovoFlashcard() {
  const pergunta = document.querySelector('#new-pergunta').value.trim();
  const resposta = document.querySelector('#new-resposta').value.trim();

  const perguntaExistente = flashcards.find(flashcard => flashcard.pergunta === pergunta);

  if (pergunta === '' || resposta === '') {
    document.querySelector('#error-message').textContent = 'Por favor, preencha tanto a pergunta quanto a resposta antes de salvar.';
    return;
  }

  if (perguntaExistente) {
    document.querySelector('#error-message').textContent = 'Já existe um flashcard com esta pergunta!';
    return;
  }

  const caixa = 1;
  flashcards.push({ pergunta, resposta, caixa });
  caixa1.push({ pergunta, resposta, caixa })
  criarConjunto();
  mostrarPreview(flashcards.length - 1);
}

function msgErroIniciar() {
  if (flashcards.length < 1) {
    document.querySelector('#error-message').textContent = 'Por favor, crie 10 flashcards antes de continuar.';
    return;
  } else {
    sortear();
  }
}