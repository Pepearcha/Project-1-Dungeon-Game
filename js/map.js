// Tiles of the map
const TILES = {
    floor: 0,
    wall: 1,
    hero: 2,
    enemy: 3,
    item: 4,
    exit: 5,
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

            if (cell === TILES.wall)  div.classList.add('wall');
            if (cell === TILES.floor) div.classList.add('floor');
            if (cell === TILES.hero)  div.classList.add('floor');
            if (cell === TILES.enemy) div.classList.add('floor');
            if (cell === TILES.item)  div.classList.add('floor');
            if (cell === TILES.exit)  div.classList.add('floor');

            container.appendChild(div);
        })
    })
}