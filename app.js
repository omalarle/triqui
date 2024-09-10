const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function handleClick(event) {
    const index = event.target.dataset.index;

    if (board[index] === '') {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        const winningPattern = checkWin();
        if (winningPattern) {
            highlightWinningCells(winningPattern);
        } else if (board.includes('') === false) {
            alert('¡Es un empate!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return pattern; // Devuelve la combinación ganadora
        }
    }
    return null;
}

function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add('winning-cell'); // Aplica la clase para resaltar
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell'); // Elimina la clase al reiniciar
    });
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
