function iniciarEstudos() {
  caixa1 = [...flashcards]
  const container = document.querySelector('#main-container');

  const flashcard = flashcards[curPos];


  if (caixa1.length < 2) {
    container.innerHTML = `
        <div class="min10f">Você precisa de pelo menos 10 flashcards para iniciar os estudos</div>
        <div class="line"></div>
        <button class="button2" onclick ="criarConjunto()">CRIE SEUS FLASHCARDS</button>
        <button class="button2" onclick="iniciar()">VOLTAR!</button>
        `;
    return;
  }
  container.innerHTML = `
    <div class="container">
    <div class="score">ACERTOS:0/10</div>
    ${curPos !== 0 ? '<button class="button" onclick="flashcardAnterior()">ANTERIOR</button>' : ''}  
    <div class="flashcard-card" onclick="virarFlashcard(this)">
    <div class="flashcard-inner">
    <div class="flashcard-front">
    <h2 class="pour">PERGUNTA</h2>
    <h2>${flashcard.pergunta}</h2>
    </div>
    <div class="flashcard-back">
    <h2 class="pour">RESPOSTA</h2>
    <h3> ${flashcard.resposta} </h3>
    </div>
    </div>
    </div>
    ${curPos !== flashcards.length - 1 ? '<button class="button" onclick="sorteio()">PRÓXIMO</button>' : ''} 
    <div>
    <div class="respostas">
    <input> </input>
    <button class="button">✔️</button>
    </div>
    <button class="button" onclick="iniciar()">VOLTAR À TELA INICIAL</button>
    </div>
  </div>
  `;

}


function mostrarFlashCard(card){
  const container = document.querySelector('#main-container');

  //const flashcard = flashcards[curPos]
  if (flashcards.length < 2) {
    container.innerHTML = `
        <div class="min10f">Você precisa de pelo menos 10 flashcards para iniciar os estudos</div>
        <div class="line"></div>
        <button class="button2" onclick ="criarConjunto()">CRIE SEUS FLASHCARDS</button>
        <button class="button2" onclick="iniciar()">VOLTAR!</button>
        `;
    return;
  }
  container.innerHTML = `
    <div class="container">
    <div class="score">ACERTOS:0/10</div>
    ${curPos !== 0 ? '<button class="button" onclick="flashcardAnterior()">ANTERIOR</button>' : ''}  
    <div class="flashcard-card" onclick="virarFlashcard(this)">
    <div class="flashcard-inner">
    <div class="flashcard-front">
    <h2 class="pour">PERGUNTA</h2>
    <h2>${card.pergunta}</h2>
    </div>
    <div class="flashcard-back">
    <h2 class="pour">RESPOSTA</h2>
    <h3> ${card.resposta} </h3>
    </div>
    </div>
    </div>
    ${curPos !== flashcards.length - 1 ? '<button class="button" onclick="sorteio()">PRÓXIMO</button>' : ''} 
    <div>
    <div class="respostas">
    <input> </input>
    <button onclick="verificaResposta()" class="button">✔️</button>
    </div>
    <button class="button" onclick="iniciar()">VOLTAR À TELA INICIAL</button>
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


 if(caixa === 3){
  mostrarFlashCard(caixa3[sortearCaixa3()])
 } else if(caixa === 2){
    mostrarFlashCard(caixa2[sortearCaixa2()])

 }
 else if(caixa === 1){
     mostrarFlashCard(caixa1[sortearCaixa1()])
 }

}


function proximoFlashcard() {
  curPos++;
  iniciarEstudos()
}

function flashcardAnterior() {
  curPos--;
  iniciarEstudos()
}