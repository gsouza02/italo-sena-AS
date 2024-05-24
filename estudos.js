function iniciarEstudos() {
  caixa1 = [...flashcards]
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

  document.body.style.backgroundColor = "#444";
  container.innerHTML = `
  <div class="container">
    <div class="flashcard-container">
      ${curPos !== 0 ? '<button class="button4" onclick="flashcardAnterior()">&#9664;</button>' : '<div class="placeholder"></div>'}
      <div class="flashcard-card" onclick="virarFlashcard(this)">
        <div class="flashcards-preview">
          <div class="flashcard-preview">
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
        </div>
      </div>
      ${curPos !== flashcards.length - 1 ? '<button class="button4" onclick="sorteio()">&#9654;</button>' : '<div class="placeholder"></div>'}
    </div>
    <div class="input-container">
    <input type="text" placeholder="Digite sua resposta aqui" />
    <button class="send-icon" onclick="enviarResposta()">&#9654;</button>
    <button class="button2" onclick="iniciar()">FINALIZAR ESTUDOS</button>
  </div>
  
  </div>
`;
}

function mostrarFlashCard(card) {
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
    <div class="flashcard-container">
      ${curPos !== 0 ? '<button class="button4" onclick="flashcardAnterior()">&#9664;</button>' : '<div class="placeholder"></div>'}
      <div class="flashcard-card" onclick="virarFlashcard(this)">
            <div class="flashcard-inner">
              <div class="flashcard-front">
                <h2 class="pour">PERGUNTA</h2>
                <h2>${card.pergunta}</h2>
              </div>
              <div class="flashcard-back">
                <h2 class="pour">RESPOSTA</h2>
                <h3>${card.resposta}</h3>
              </div>
            </div>
          </div>
      ${curPos !== flashcards.length - 1 ? '<button class="button4" onclick="sorteio()">&#9654;</button>' : '<div class="placeholder"></div>'}
    </div>
    <div class="input-container">
    <input type="text" placeholder="Digite sua resposta aqui" />
    <button class="send-icon" onclick="enviarResposta()">&#9654;</button>
    <button class="button2" onclick="iniciar()">FINALIZAR ESTUDOS</button>
  </div>
  
  </div>
`;
}





function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function sortearCaixa(){
 let sorteio =  getRandomInt(1, 101)

let res = 0;
let result = 0;

 if (sorteio > 50) {
  res = 1
} else if (sorteio > 20) {
  res = 2
} else {
  res = 3
}


if(res === 3){ //res resultado do sorteio anterior, result resultado do sortei apos as verificacoes
  if(caixa3.length === 0){
      if(caixa2.length !== 0) result = 2;
      else result = 1;
  }
  else result = 3;
}
else if(res === 2){
  if(caixa2.length === 0){
    if(caixa1.length !== 0) result = 1;
    else result = 3;
}
else result = 2;
}
else{
  if(caixa1.length === 0){
    if(caixa2.length !== 0) result = 2;
    else  result = 3;
  }
  else result = 1;
}

return result;
}

function sortearCard() {
  return Math.random % flashcards.length
}

function sortearCaixa1() {
  const indiceAleatorio = Math.floor(Math.random() * caixa1.length);
  return indiceAleatorio;
}


function sortearCaixa2() {
  return Math.random % caixa2.length
}

function sortearCaixa3() {
  return Math.random % caixa3.length
}


function verificaResposta() {
  if (resposta === '') return;

  else if (resposta === certa) {

    if (flashcards[curPos].caixa === 1) flashcards[curPos].caixa = 2
    else if (flashcards[curPos].caixa === 2) flashcards[curPos].caixa = 3

  }
  else{
    if (flashcards[curPos].caixa === 2) flashcards[curPos].caixa = 1
    else if (flashcards[curPos].caixa === 3) flashcards[curPos].caixa = 2

  }
}


function sorteio(){
 let caixa = sortearCaixa()
 let index = -1

 if(caixa === 3){
  index = sortearCaixa3();
  mostrarFlashCard(caixa3[index])
 } else if(caixa === 2){
  index = sortearCaixa2()
  mostrarFlashCard(caixa2[index])
 }
 else if(caixa === 1){
  index = sortearCaixa1()
  mostrarFlashCard(caixa1[index])
 }

}


function flashcardAnterior() {
  curPos--;
  iniciarEstudos()
}