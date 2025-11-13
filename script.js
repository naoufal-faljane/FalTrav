// Global variables
let currentGame = null;

// DOM elements
const gameCards = document.querySelectorAll('.game-card');
const closeButtons = document.querySelectorAll('.close-game');
const gameContainers = document.querySelectorAll('.game-container');

// Game initialization
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to game cards
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameType = card.getAttribute('data-game');
            openGame(gameType);
        });
    });

    // Add event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllGames();
        });
    });

    // Add event listeners to difficulty selectors
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Initialize Sudoku if present
    initializeSudoku();

    // Initialize Word Search if present
    initializeWordSearch();

    // Initialize Memory Game if present
    initializeMemoryGame();

    // Initialize Quiz if present
    initializeQuiz();

    // Initialize other interactive elements
    initializeInteractiveElements();
});

// Function to open a specific game
function openGame(gameType) {
    // Close all games first
    closeAllGames();
    
    // Show the selected game container
    const container = document.getElementById(`${gameType}-container`);
    if (container) {
        container.style.display = 'block';
        currentGame = gameType;
        
        // Focus on the game container for accessibility
        container.focus();
    }
}

// Function to close all games
function closeAllGames() {
    gameContainers.forEach(container => {
        container.style.display = 'none';
    });
    currentGame = null;
}

// Make closeAllGames globally accessible
window.closeAllGames = closeAllGames;

// Function to close a specific game (used by close buttons)
function closeGame(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.style.display = 'none';
    }
    currentGame = null;
}

// Sudoku Game Implementation
function initializeSudoku() {
    const sudokuGrid = document.querySelector('.sudoku-grid');
    if (!sudokuGrid) return;

    // Create a sample Sudoku puzzle (easy level)
    const samplePuzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    // Clear existing grid
    sudokuGrid.innerHTML = '';

    // Create the grid
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (samplePuzzle[row][col] !== 0) {
                cell.textContent = samplePuzzle[row][col];
                cell.classList.add('fixed');
                cell.contentEditable = false;
            } else {
                cell.contentEditable = true;
                cell.addEventListener('input', handleSudokuInput);
            }

            sudokuGrid.appendChild(cell);
        }
    }
}

function handleSudokuInput(e) {
    const cell = e.target;
    let value = e.data || cell.textContent;

    // Only allow digits 1-9
    if (value && !/^[1-9]$/.test(value)) {
        cell.textContent = '';
    } else if (value) {
        cell.textContent = value;
    }
}

// Word Search Game Implementation
function initializeWordSearch() {
    const wordSearchGrid = document.querySelector('.word-search-grid');
    if (!wordSearchGrid) return;

    // Create a sample 15x15 grid
    wordSearchGrid.innerHTML = '';

    // Sample grid with hidden words
    const gridSize = 15;
    const sampleGrid = [
        ['T', 'R', 'A', 'V', 'E', 'L', 'X', 'Y', 'Z', 'P', 'A', 'R', 'I', 'S', 'S'],
        ['O', 'K', 'I', 'N', 'G', 'D', 'O', 'M', 'E', 'L', 'O', 'N', 'D', 'O', 'N'],
        ['K', 'Y', 'O', 'T', 'O', 'R', 'M', 'A', 'D', 'R', 'I', 'D', 'B', 'E', 'R'],
        ['Y', 'O', 'T', 'H', 'O', 'W', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
        ['A', 'T', 'L', 'A', 'N', 'T', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
        ['L', 'Y', 'O', 'N', 'S', 'E', 'O', 'U', 'L', 'F', 'R', 'A', 'N', 'K', 'F'],
        ['I', 'N', 'D', 'I', 'A', 'L', 'M', 'A', 'T', 'A', 'T', 'U', 'E', 'L', 'U'],
        ['S', 'T', 'I', 'C', 'K', 'E', 'T', 'S', 'U', 'N', 'I', 'T', 'E', 'D', 'N'],
        ['E', 'O', 'U', 'T', 'H', 'R', 'A', 'I', 'L', 'W', 'A', 'Y', 'L', 'O', 'S'],
        ['R', 'M', 'A', 'L', 'D', 'I', 'V', 'E', 'S', 'I', 'N', 'G', 'A', 'P', 'O'],
        ['R', 'O', 'M', 'E', 'B', 'O', 'A', 'T', 'S', 'T', 'I', 'C', 'K', 'E', 'T'],
        ['M', 'U', 'S', 'E', 'U', 'M', 'L', 'O', 'R', 'D', 'O', 'N', 'D', 'O', 'N'],
        ['E', 'D', 'I', 'N', 'B', 'U', 'R', 'G', 'H', 'P', 'A', 'R', 'I', 'S', 'L'],
        ['N', 'T', 'O', 'K', 'Y', 'O', 'S', 'Y', 'D', 'N', 'E', 'Y', 'M', 'A', 'Y'],
        ['T', 'E', 'M', 'P', 'L', 'E', 'O', 'F', 'B', 'A', 'C', 'H', 'U', 'S', 'A']
    ];

    // Populate the grid
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'word-search-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = sampleGrid[row][col];
            cell.addEventListener('click', toggleWordSearchCell);
            wordSearchGrid.appendChild(cell);
        }
    }
}

function toggleWordSearchCell(e) {
    const cell = e.currentTarget;
    cell.classList.toggle('selected');
}

// Memory Game Implementation
function initializeMemoryGame() {
    const memoryGrid = document.querySelector('.memory-grid');
    if (!memoryGrid) return;

    // Travel-themed pairs
    const emojis = ['✈️', '🏨', '🗺️', '🏖️', '🏰', '🗼', '🎡', '🏛️'];
    const pairs = [...emojis, ...emojis]; // Duplicate for pairs
    shuffleArray(pairs);

    memoryGrid.innerHTML = '';

    pairs.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = emoji;
        card.dataset.index = index;
        card.dataset.flipped = 'false';
        
        // Initially show the back of the card
        card.textContent = '?';
        
        card.addEventListener('click', flipCard);
        memoryGrid.appendChild(card);
    });
}

function flipCard(e) {
    const card = e.currentTarget;
    
    // Don't flip if already flipped or if two cards are already flipped
    if (card.dataset.flipped === 'true') return;
    
    card.textContent = card.dataset.value;
    card.dataset.flipped = 'true';
    card.classList.add('flipped');
    
    // Check for match if two cards are flipped
    const flippedCards = document.querySelectorAll('.memory-card[data-flipped="true"]');
    if (flippedCards.length === 2) {
        setTimeout(() => {
            checkForMatch(flippedCards);
        }, 1000);
    }
}

function checkForMatch(cards) {
    if (cards.length < 2) return;
    
    const card1 = cards[0];
    const card2 = cards[1];
    
    if (card1.dataset.value === card2.dataset.value) {
        // Match found
        card1.style.backgroundColor = '#d4edda';
        card2.style.backgroundColor = '#d4edda';
    } else {
        // No match, flip back
        card1.dataset.flipped = 'false';
        card2.dataset.flipped = 'false';
        card1.textContent = '?';
        card2.textContent = '?';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Quiz Game Implementation
function initializeQuiz() {
    // Add event listeners to quiz options
    const options = document.querySelectorAll('.quiz-container .option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
}

// Country Guesser Game Implementation
function initializeCountryGuesser() {
    const countryOptions = document.querySelectorAll('.country-game-container .country-option');
    countryOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Here you would implement the logic to check if the answer is correct
            countryOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            // For now, just show an alert
            alert(`You selected: ${option.textContent}`);
        });
    });
}

// Packing Game Implementation
function initializePackingGame() {
    const items = document.querySelectorAll('.items-list .item');
    const suitcase = document.querySelector('.suitcase');
    
    items.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });
    
    suitcase.addEventListener('dragover', dragOver);
    suitcase.addEventListener('dragenter', dragEnter);
    suitcase.addEventListener('dragleave', dragLeave);
    suitcase.addEventListener('drop', drop);
    
    // Make suitcase items draggable back
    suitcase.addEventListener('DOMNodeInserted', function(e) {
        if (e.target.classList.contains('item')) {
            e.target.addEventListener('dragstart', dragStart);
            e.target.addEventListener('dragend', dragEnd);
        }
    });
}

// Drag and drop functions for packing game
let draggedItem = null;

function dragStart(e) {
    draggedItem = e.target;
    setTimeout(() => {
        e.target.classList.add('dragging');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    // Add the dragged item to the suitcase if it's dropped in the suitcase area
    if (e.target.classList.contains('suitcase') || e.target.closest('.suitcase')) {
        const suitcase = e.target.classList.contains('suitcase') ? e.target : e.target.closest('.suitcase');
        
        // Create a copy of the item to add to the suitcase
        const itemCopy = draggedItem.cloneNode(true);
        itemCopy.classList.add('packed');
        itemCopy.textContent = draggedItem.textContent;
        
        // Add event listeners to the copy
        itemCopy.addEventListener('dragstart', dragStart);
        itemCopy.addEventListener('dragend', dragEnd);
        
        suitcase.appendChild(itemCopy);
        
        // Remove the original if it was in the items list
        if (draggedItem.parentElement.classList.contains('items-list')) {
            draggedItem.remove();
        }
    }
}

// Anagram Game Implementation
function initializeAnagramGame() {
    const anagramInput = document.querySelector('.anagram-input');
    const submitBtn = document.querySelector('.anagram-container .play-btn');
    
    if (anagramInput && submitBtn) {
        submitBtn.addEventListener('click', checkAnagram);
    }
}

function checkAnagram() {
    const anagramInput = document.querySelector('.anagram-input');
    const userAnswer = anagramInput.value.trim().toLowerCase();
    const correctAnswer = 'london';
    
    if (userAnswer === correctAnswer) {
        alert('Correct! Well done!');
        // Reset the game or move to next anagram
        anagramInput.value = '';
    } else {
        alert('Incorrect. Try again!');
    }
}

// Currency Game Implementation
function initializeCurrencyGame() {
    const currencyInput = document.querySelector('.currency-input');
    const submitBtn = document.querySelector('.currency-container .play-btn');
    
    if (currencyInput && submitBtn) {
        submitBtn.addEventListener('click', checkCurrency);
    }
}

function checkCurrency() {
    const currencyInput = document.querySelector('.currency-input');
    const userAnswer = currencyInput.value.trim().toLowerCase();
    const correctAnswer = 'yen';
    
    if (userAnswer === correctAnswer) {
        alert('Correct! The currency of Japan is Yen.');
        currencyInput.value = '';
    } else {
        alert('Incorrect. The currency of Japan is Yen.');
    }
}

// Flag Matcher Game Implementation
function initializeFlagMatcher() {
    const flagItems = document.querySelectorAll('.flags-list .flag-item');
    const countrySlots = document.querySelectorAll('.countries-list .country-slot');
    
    flagItems.forEach(flag => {
        flag.addEventListener('dragstart', dragStart);
        flag.addEventListener('dragend', dragEnd);
    });
    
    countrySlots.forEach(slot => {
        slot.addEventListener('dragover', dragOver);
        slot.addEventListener('dragenter', dragEnter);
        slot.addEventListener('dragleave', dragLeave);
        slot.addEventListener('drop', dropFlag);
    });
}

function dropFlag(e) {
    e.preventDefault();
    
    if (draggedItem) {
        // Add the dragged flag to the slot
        e.target.appendChild(draggedItem);
        draggedItem = null;
    }
}

// Capital Finder Game Implementation
function initializeCapitalFinder() {
    const countryOptions = document.querySelectorAll('.country-game-container .country-option');
    
    countryOptions.forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('selected');
        });
    });
}

// Initialize all interactive elements
function initializeInteractiveElements() {
    // Initialize Country Guesser
    initializeCountryGuesser();
    
    // Initialize Packing Game
    initializePackingGame();
    
    // Initialize Anagram Game
    initializeAnagramGame();
    
    // Initialize Currency Game
    initializeCurrencyGame();
    
    // Initialize Flag Matcher
    initializeFlagMatcher();
    
    // Initialize Capital Finder
    initializeCapitalFinder();
    
    // Initialize Crossword Game
    initializeCrossword();
}

// Crossword Game Implementation
function initializeCrossword() {
    const crosswordContainer = document.querySelector('.crossword-puzzle');
    if (!crosswordContainer) return;

    // Create a sample 10x10 crossword grid
    crosswordContainer.innerHTML = '';
    
    // Sample crossword structure (0 = white cell, 1 = black cell)
    const crosswordGrid = [
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0]
    ];

    // Create the grid
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.className = 'crossword-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (crosswordGrid[row][col] === 1) {
                cell.classList.add('black');
            } else {
                cell.contentEditable = true;
                cell.addEventListener('input', handleCrosswordInput);
                cell.addEventListener('keydown', handleCrosswordNavigation);
            }

            crosswordContainer.appendChild(cell);
        }
    }
}

function handleCrosswordInput(e) {
    const cell = e.target;
    let value = e.data || cell.textContent;

    // Only allow single letters
    if (value && !/^[A-Za-z]$/.test(value)) {
        cell.textContent = value.charAt(0);
    } else if (value) {
        cell.textContent = value.charAt(0);
    }

    // Auto-move to next cell if a letter was entered
    if (value) {
        // Move to next cell to the right
        const nextCell = cell.nextElementSibling;
        if (nextCell && !nextCell.classList.contains('black')) {
            nextCell.focus();
        }
    }
}

function handleCrosswordNavigation(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // Handle arrow keys for navigation
    switch(e.key) {
        case 'ArrowRight':
            e.preventDefault();
            moveToAdjacentCell(row, col + 1);
            break;
        case 'ArrowLeft':
            e.preventDefault();
            moveToAdjacentCell(row, col - 1);
            break;
        case 'ArrowDown':
            e.preventDefault();
            moveToAdjacentCell(row + 1, col);
            break;
        case 'ArrowUp':
            e.preventDefault();
            moveToAdjacentCell(row - 1, col);
            break;
        case 'Backspace':
            if (cell.textContent === '') {
                // If cell is empty, move to previous cell
                e.preventDefault();
                // For simplicity, move left when backspace on empty cell
                moveToAdjacentCell(row, col - 1);
            }
            break;
    }
}

function moveToAdjacentCell(row, col) {
    const cells = document.querySelectorAll('.crossword-cell:not(.black)');
    for (let cell of cells) {
        if (parseInt(cell.dataset.row) === row && parseInt(cell.dataset.col) === col) {
            cell.focus();
            return;
        }
    }
}

// Utility functions
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Add keyboard support for accessibility
document.addEventListener('keydown', function(e) {
    // Close game with Escape key
    if (e.key === 'Escape' && currentGame) {
        closeAllGames();
    }
});