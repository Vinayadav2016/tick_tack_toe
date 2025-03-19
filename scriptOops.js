class game{
    constructor(){
        this.board = document.getElementById('board');
        this.loading = document.querySelector('.loading');
        this.winningMessageElement = document.querySelector('.winning-message');
        this.winningMessageTextElement = document.querySelector('[data-winning-message-text]');
        this.restartButton = document.getElementById('restartButton');
        this.x_class = 'x';
        this.o_class = 'o';
        this.circleClass = true;
        this.boardSize = 3;

        // event handlers
        this.board.addEventListener('click',(e) => { this.handleClick(e); });
        restartButton.addEventListener('click',() => this.start());

        this.getSize(); // get the size of the board
        this.winning_combinations = this.getWinningCombinations(); // get the winning combinations
        this.createBoard() // create the board
    }
    getSize(){
        const boardSizeElement = document.getElementById('board-size');
        if(boardSizeElement.value)
            this.boardSize = Number(boardSizeElement.value);
        this.boardSize = Math.min(8, Math.max(3, this.boardSize));
    }
    start(){
        this.cellElements = document.querySelectorAll('[data-cell]');
        this.cellElements.forEach(cell => {
            cell.classList.remove(this.x_class);
            cell.classList.remove(this.o_class);
        });
        this.winningMessageElement.classList.remove('show');
        this.board.classList.add('show');
        this.circleClass = true;
        this.setBoardHoverClass();
    }
    handleClick(e){
        const cell = e.target;
        if(cell.classList.contains('cell') &&!cell.classList.contains('x') &&!cell.classList.contains('o')){
            this.handleCellClick(cell);
        }
    }
    handleCellClick(cell){
        const currentClass = this.circleClass ? this.o_class : this.x_class;
        this.placeMark(cell, currentClass);
        if(this.checkWin(currentClass)){
            this.endGame(false);
        }else if(this.isDraw()){
            this.endGame(true);
        }else{
            this.swapTurns();
            this.setBoardHoverClass();
        }
    }
    checkWin() {
        return this.winning_combinations.some(combination => {
            return combination.every(index => {
                return this.cellElements[index].classList.contains(this.circleClass? this.o_class : this.x_class);
            });
        });
    }
    isDraw() {
        return [...this.cellElements].every(cell => cell.classList.contains(this.x_class) || cell.classList.contains(this.o_class));
    }
    endGame(draw){
        const message = draw? 'Draw!' : `${this.circleClass? 'O' : 'X'} wins!`;
        this.winningMessageTextElement.innerText = message;
        this.winningMessageElement.classList.add('show');
        this.board.classList.remove('show');
        this.board.removeEventListener('click', this.handleClick);
    }
    setBoardHoverClass(){
        this.board.classList.remove(this.x_class, this.o_class);
        this.board.classList.add(this.circleClass? this.o_class : this.x_class);
    }
    swapTurns() {
        this.circleClass = !this.circleClass;
    }
    placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }
    createBoard(){
        this.loading.classList.add('show');
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < this.boardSize; j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-cell', j);
            row.appendChild(cell);
        }
        for(let i = 0; i < this.boardSize; i++){
            const temp = row.cloneNode(true);
            this.board.appendChild(temp);
        }
        this.loading.classList.remove('show');
    }  
    getWinningCombinations(){ 
        const size = this.boardSize;
        const winning_array = [];
        let diagonal1 =[], diagonal2 = [];
        for(let i = 0; i < size; i++){
            // getting row & column combinations
            let row = [], column=[];
            for(let j = 0; j < size; j++){
                row.push(j*size+i);
                column.push(i*size+j);
            }
            winning_array.push(row, column);
            // getting diagonal combinations
            diagonal1.push(i*size+i);
            diagonal2.push(i*size+(size-i-1));
        }
        winning_array.push(diagonal1);
        winning_array.push(diagonal2);
        console.log(winning_array);
        return winning_array;
    }
}

const startGameButton = document.getElementById('startGameButton');
const welcomePage = document.querySelector('.welcome-page');
const homePageButton = document.getElementById('homePageButton');
homePageButton.addEventListener('click', () => {
    location.reload();
});

startGameButton.addEventListener('click', () => {
    const boardSize = document.getElementById('board-size').value;
    const errorElement = document.getElementById('error');
    if((boardSize && boardSize>=3) && boardSize<=8){
        errorElement.innerText='';
        welcomePage.classList.remove('show');
        new game().start();

    }else{
        errorElement.innerText = 'Board size must be between 3 and 8';
    }
    
});
