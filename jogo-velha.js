var player = 'X',
    reiniciar = false,
    matrizJogoDaVelha = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
    ];

function reiniciarJogo() {
    if (!reiniciar) {
        return;
    }
    limparJogoDaVelha();
}

function selecionarArea(posicaoLinha, posicaoColuna) {
    let pos = {
        line : posicaoLinha,
        column : posicaoColuna
    };

    let area = getArea(pos);
    if (reiniciar || !isDrawable(area)) {
        return;
    }
    
    drawArea(area);
    saveNewMatriz(pos)

    if (jogadorGanhou()) {
        msgJogadorGanhou();
        reiniciar = true;
        return;
    } else if (isEmpate()) {
        msgEmpate();
        reiniciar = true;
    }

    switchPlayer();

}

function isDrawable(area) {
    return area.innerHTML === "";
}

function switchPlayer() {
    player = player === 'X' ? 'O' : 'X';
    document.querySelector(`[data-player]`).innerHTML = player;
}

function msgJogadorGanhou() {
    alert (`Parabéns ${player} ganhou!`)
}

function msgEmpate() {
    alert (`Empate reinicie o jogo!`)
}

function limparJogoDaVelha() {

    document.querySelectorAll('.quadrado-jogo').forEach((el) => {
        el.innerHTML = '';
    });

    matrizJogoDaVelha = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
    ];

    reiniciar = false;
}

function drawArea(area) {
    area.innerHTML = player;
}

function getArea(pos) {
    return document.querySelector(`div[data-linha="${pos.line}"][data-coluna="${pos.column}"`);
}

function saveNewMatriz(pos) {
    matrizJogoDaVelha[pos.line][pos.column] = player;
}


function jogadorGanhou() {
    if (isHorizontalVictory() || isVerticalVictory() || isDiagonalVictory()) {
        return true;
    }
}

function isHorizontalVictory() {
    let horizontalMatriz = matrizJogoDaVelha;
    return isVictory(horizontalMatriz);
}

function isVerticalVictory() {
    let verticalMatriz = gerarMatrizVertical();
    return isVictory(verticalMatriz);
}

function isDiagonalVictory() {
    let diagonalMatriz = gerarMatrizDiagonal();
    return isVictory(diagonalMatriz);
}

function gerarMatrizVertical() {
    let verticalMatriz = [];
    matrizJogoDaVelha.forEach((p, index) => {
        let atual = matrizJogoDaVelha.map((x) =>{
            return x[index]
        })
        verticalMatriz.push(atual);
    });
    return verticalMatriz;
}

function gerarMatrizDiagonal(arr) {
    let diagonalMatriz = [];
    let loop = matrizJogoDaVelha.length;

    let d1 = matrizJogoDaVelha.map((x, index) =>{
        return x[index][0];
    })

    let d2 = matrizJogoDaVelha.map((x,index) => {
        loop -= 1;
        return x[index, loop];
    })
    
    diagonalMatriz.push(d1, d2);

    return diagonalMatriz;
}

function isEmpate() {
    return new Set(matrizJogoDaVelha.flat()).size === 2;
}

function isVictory(arr) {
    let victory = false;
    for (let index = 0; index < arr.length; index++) {
        if (new Set(arr[index]).size === 1) {
            victory = true;
        }
    }
    return victory;
}
