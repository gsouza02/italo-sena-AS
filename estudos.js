let totalRevisados = 0;
let totalCorretos = 0;
let historicoFlashcards = [];

function mostrarFlashCard(card, isPrevious = false) {
  document.body.style.backgroundColor = "#444";
  const container = document.querySelector('#main-container');
  const perguntaCard = card.pergunta;

  let index = 0;
  while (flashcards[index].pergunta !== perguntaCard) index++;

  let i = 0;
  if (card.caixa === 1) {
    while (caixa1[i].pergunta !== perguntaCard) i++;
  } else if (card.caixa === 2) {
    while (caixa2[i].pergunta !== perguntaCard) i++;
  } else {
    while (caixa3[i].pergunta !== perguntaCard) i++;
  }

  if (!isPrevious) {
    historicoFlashcards.push(card);
  }

  let corPergunta;
  let corResposta;
  if (card.caixa === 1) {
    corPergunta = 'red'; 
    corResposta = 'lightcoral'; 
  } else if (card.caixa === 2) {
    corPergunta = 'yellow'; 
    corResposta = 'lightyellow'; 
  } else {
    corPergunta = 'green'; 
    corResposta = 'lightgreen';  
  }

  container.innerHTML = `
    <div class="container">
      <div class="flashcard-container">
      ${historicoFlashcards.length > 1 ? '<button class="button4" onclick="flashcardAnterior()">&#9664;</button>' : '<div class="placeholder"></div>'}
        <div class="flashcard-card" onclick="virarFlashcard(this)">
          <div class="flashcard-inner">
            <div class="flashcard-front">
            <h2 class="pour" style="color: ${corPergunta};">PERGUNTA</h2>
              <h2>${card.pergunta}</h2>
            </div>
            <div class="flashcard-back">
            <h2 class="pour" style="color: ${corResposta};">RESPOSTA</h2>
              <h3>${card.resposta}</h3>
            </div>
          </div>
        </div>
        ${curPos !== flashcards.length - 1 ? '<button class="button4" onclick="sorteio()">&#9654;</button>' : '<div class="placeholder"></div>'}
      </div>
      <div class="input-container">
        <input type="text" id="resposta-usuario" placeholder="Digite sua resposta aqui" />
        <button class="send-icon" onclick="verificaResposta(${i}, ${card.caixa}, ${index})">&#9654;</button>
        <button class="button2" onclick="finalizarEstudos()">FINALIZAR ESTUDOS</button>
      </div>
    </div>
  `;
}

function flashcardAnterior() {
  historicoFlashcards.pop();

  const cardAnterior = historicoFlashcards[historicoFlashcards.length - 1];
  const container = document.querySelector('.container');
  mostrarFlashCard(cardAnterior, true);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function sortearCaixa() {
  let sorteio = getRandomInt(1, 101);

  let res = 0;
  let result = 0;

  if (sorteio > 50) {
    res = 1;
  } else if (sorteio > 20) {
    res = 2;
  } else {
    res = 3;
  }

  if (res === 3) {
    if (caixa3.length === 0) {
      if (caixa2.length !== 0) result = 2;
      else result = 1;
    } else result = 3;
  } else if (res === 2) {
    if (caixa2.length === 0) {
      if (caixa1.length !== 0) result = 1;
      else result = 3;
    } else result = 2;
  } else {
    if (caixa1.length === 0) {
      if (caixa2.length !== 0) result = 2;
      else result = 3;
    } else result = 1;
  }

  return result;
}

function sortearCaixa1() {
  const indiceAleatorio = Math.floor(Math.random() * caixa1.length);
  return indiceAleatorio;
}

function sortearCaixa2() {
  const indiceAleatorio = Math.floor(Math.random() * caixa2.length);
  return indiceAleatorio;
}

function sortearCaixa3() {
  const indiceAleatorio = Math.floor(Math.random() * caixa3.length);
  return indiceAleatorio;
}

function verificaResposta(index, caixa, flashcardIndex) {
  const resposta = document.querySelector('#resposta-usuario').value;

  if (caixa === 1) {
    if (resposta === caixa1[index].resposta) {
      flashcards[flashcardIndex].caixa = 2;
      caixa1[index].caixa = 2;
      caixa2.push(caixa1[index]);
      caixa1.splice(index, 1);
      document.querySelector('.pour').style.color = '#444'
      totalCorretos++;
    }
  } else if (caixa === 2) {
    if (resposta === caixa2[index].resposta) {
      flashcards[flashcardIndex].caixa = 3;
      caixa2[index].caixa = 3;
      caixa3.push(caixa2[index]);
      totalCorretos++;
    } else {
      flashcards[flashcardIndex].caixa = 1;
      caixa2[index].caixa = 1;
      caixa1.push(caixa2[index]);
    }
    caixa2.splice(index, 1);
  } else {
    if (resposta !== caixa3[index].resposta) {
      flashcards[flashcardIndex].caixa = 2;
      caixa3[index].caixa = 2;
      caixa2.push(caixa3[index]);
      caixa3.splice(index, 1);
    }
  }
  totalRevisados++;
  sorteio(); 
}

function sorteio() {
  const container = document.querySelector('#main-container');
  
  let caixa = sortearCaixa();
  let index = -1;

  if (caixa === 3) {
    index = sortearCaixa3();
    mostrarFlashCard(caixa3[index]);
  } else if (caixa === 2) {
    index = sortearCaixa2();
    mostrarFlashCard(caixa2[index]);
  } else if (caixa === 1) {
    index = sortearCaixa1();
    mostrarFlashCard(caixa1[index]);
  }
}

function finalizarEstudos() {

  historicoFlashcards = [];

  const container = document.querySelector('#main-container');
  container.innerHTML = `
    <div class="resultado-estudos">
      <h1 class="resultado-titulo">Resultados</h1>
      <div class="line"></div>  
      <div class="resultado-texto">
        Você acertou ${totalCorretos} de ${totalRevisados} respostas.
      </div>
      <button class="button3" onclick="voltar()">Voltar</button>
    </div>
  `;


  totalRevisados = 0;
  totalCorretos = 0;
}


