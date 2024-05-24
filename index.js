let flashcards = [];
let virado = false;
let curPos = 0

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
      <button class="button2" onclick="iniciarEstudos()">INICIAR ESTUDO</button2>
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

function iniciarEstudos() {
  const container = document.querySelector('#main-container');

  const flashcard = flashcards[curPos];
  if (flashcards.length < 2) {
    container.innerHTML = `
      <div class="min10f">Você precisa de pelo menos 10 flashcards para iniciar os estudos</div>
      <div class="line"></div>
      <button class="button2" onclick="criarConjunto()">CRIE SEUS FLASHCARDS</button>
      <button class="button2" onclick="iniciar()">VOLTAR!</button>
    `;
    return;
  }
  container.innerHTML = `
  <div class="container">
    <div class="score">ACERTOS:0/10</div>
    <div class="flashcard-container">
      ${curPos !== 0 ? '<button class="button4" onclick="flashcardAnterior()">&#9664;</button>' : '<div class="placeholder"></div>'}
      
      <div class="flashcard-card" onclick="virarFlashcard(this)">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <h2 class="pour">PERGUNTA</h2>
            <h2>${flashcard.pergunta}</h2>
          </div>
          <div class="flashcard-back">
            <h2 class="pour">RESPOSTA</h2>
            <h3>${flashcard.resposta}</h3>
          </div>
        </div>
      </div>
      ${curPos !== flashcards.length - 1 ? '<button class="button4" onclick="proximoFlashcard()">&#9654;</button>' : '<div class="placeholder"></div>'}
    </div>
    <div class="input-container"> <!-- Adicionando o contêiner -->
      <input type="text" placeholder="Digite sua resposta aqui" />
      <button class="button2" onclick="iniciar()">VOLTAR À TELA INICIAL</button>
    </div>
  </div>
`;

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
  const pergunta = document.querySelector('#edit-pergunta').value;
  const resposta = document.querySelector('#edit-resposta').value;
  const perguntaExistente = flashcards.find(flashcard => flashcard.pergunta === pergunta);

  if (pergunta === '' || resposta === '') {
    document.querySelector('#error-message').textContent = 'Por favor, preencha tanto a pergunta quanto a resposta antes de salvar.';
    return;
  }

 if (perguntaExistente) {
    document.querySelector('#error-message').textContent = 'Já existe um flashcard com esta pergunta!';
    return;
  }

  flashcards[index] = { pergunta, resposta };
  criarConjunto();
  mostrarPreview(index); 
}

function excluirFlashcard(index) {
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
  
  // Verificar se já existe um flashcard com a mesma pergunta
  const perguntaExistente = flashcards.find(flashcard => flashcard.pergunta === pergunta);

  if (pergunta === '' || resposta === '') {
    document.querySelector('#error-message').textContent = 'Por favor, preencha tanto a pergunta quanto a resposta antes de salvar.';
    return;
  }

  if (perguntaExistente) {
    document.querySelector('#error-message').textContent = 'Já existe um flashcard com esta pergunta!';
    return;
  }

  flashcards.push({ pergunta, resposta });
  criarConjunto();
  mostrarPreview(flashcards.length - 1);
}



function proximoFlashcard() {
  if (curPos !== flashcards.length - 1) {curPos++;
  }
  iniciarEstudos()
}

function flashcardAnterior() {
  if (curPos !== 0) {curPos--;
  }
  iniciarEstudos()
}