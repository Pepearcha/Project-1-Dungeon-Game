// Tiles of the map
const TILES = {
    FLOOR: 0,
    WALL: 1,
    HERO: 2,
    ENEMY: 3,
    ITEM: 4,
    EXIT: 5,
}

// Map Layout Array 
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 4, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 3, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 5, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// Function render Map
function renderMap() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';

    container.style.gridTemplateColumns = `repeat(${map[0].length}, 48px)`;

    map.forEach(function(row, rowIndex) {
        row.forEach(function(cell, colIndex) {
            const div = document.createElement('div');
            div.classList.add('cell');
            div.dataset.row = rowIndex;
            div.dataset.col = colIndex;

            if (cell === TILES.WALL)  div.classList.add('wall');
            if (cell === TILES.FLOOR) div.classList.add('floor');
            if (cell === TILES.HERO){
                div.classList.add('floor')
                div.textContent = '🧙'
            }
            if (cell === TILES.ENEMY) {
                div.classList.add('floor')
                div.textContent = '👾'
            }
            if (cell === TILES.ITEM) {
                div.classList.add('floor');
                div.textContent = '💎'
            }
            if (cell === TILES.EXIT) {
                div.classList.add('floor')
                div.textContent = '🚪'
            }

            container.appendChild(div);
        })
    })
}