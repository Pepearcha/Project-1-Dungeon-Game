// Tiles of the map
const TILES = {
    FLOOR: 0,
    WALL: 1,
    HERO: 2,
    ENEMY: 3,
    ITEM: 4,
    EXIT: 5,
}

//Create the base of the map, makes sure the map is always the same size.
const ROWS = 15;
const COLS = 15;

// Returns a random floor tile position used to place the enemies and the items
function getRandomFloorTile() {
  // Pick a random position
  let row = Math.floor(Math.random() * (ROWS - 2)) + 1
  let col = Math.floor(Math.random() * (COLS - 2)) + 1
  
  // If it's not a floor tile, keep trying
  while (map[row][col] !== TILES.FLOOR) {
    row = Math.floor(Math.random() * (ROWS - 2)) + 1
    col = Math.floor(Math.random() * (COLS - 2)) + 1
  }
  
  return { row, col }
}

//function generates a new random map everytime
function generateMap(){
    const newMap = [];

    //Loop and fill the whole map with floor tiles (c refers to col , r refers to rows)
    for(let r = 0; r < ROWS; r++){
        newMap[r] = [];
        for (let c = 0; c < COLS; c++) {
            newMap[r][c] = TILES.FLOOR;
        }
    }

    //Loop and fill the borders of the map as walls (c refers to col , r refers to rows)
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) {
                newMap[r][c] = TILES.WALL;
            }
        }
    }

    //Use Math random to place random inside walls, makes the map change each time
    for (let i = 0; i < 40; i++) {
        const r = Math.floor(Math.random() * (ROWS - 2)) + 1;
        const c = Math.floor(Math.random() * (COLS - 2)) + 1;

        // Don't place walls in the top-left 3x3 so that the hero doesnt get trapped by random walls
        if (r <= 3 && c <= 3) {
            continue
        }
        newMap[r][c] = TILES.WALL;
    }

    return newMap;
} 

let map = generateMap();

// Clears walls around a position to make sure it's always reachable (used around item and exit)
function clearSurrounding(row , col){
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c < col + 1; c++) {
            // Make sure we don't go outside the map borders
            if (r > 0 && c > 0 && r < ROWS - 1 && c < COLS - 1) {
               if(map[r][c] === TILES.WALL) {
                map[r][c] = TILES.FLOOR 
               }
            }       
        }  
    }
}

//After the map is generated we create a function that places the hero, item and exit getRandomFloorTile
function placeEntities() {
    //Place Hero at the start of the map
    map[1][1] = TILES.HERO;

    //Use getRandomTile to place Item and also clears the surrounding tiles
    const itemPos = getRandomFloorTile();
    map[itemPos.row][itemPos.col] = TILES.ITEM;
    clearSurrounding(itemPos.row, itemPos.col);

    //Use getRandomTile to place Exit and clears the surrounding tiles
    const exitPos = getRandomFloorTile();
    map[exitPos.row][exitPos.col] = TILES.EXIT;
    clearSurrounding(exitPos.row, exitPos.col);
}

//renders the map array into DOM elements
function renderMap() {
  const container = document.getElementById('game-container');
  //clear previous render
  container.innerHTML = '';

  //set grid columns based on map width
  container.style.gridTemplateColumns = `repeat(${map[0].length}, 48px)`;

  //we loop through every row and column
  map.forEach(function(row, rowIndex) {
    row.forEach(function(cell, colIndex) {
      //create a div for each cell
      const div = document.createElement('div');
      div.classList.add('cell');

      //keep the position in attributes to so that i can reference them later
      div.dataset.row = rowIndex;
      div.dataset.col = colIndex;

      //apply the class and its corresponding icon based on the tile type
      if (cell === TILES.WALL) {
        div.classList.add('wall');
      }
      if (cell === TILES.FLOOR) {
        div.classList.add('floor')
      }
      if (cell === TILES.HERO) {
        div.classList.add('floor')
        div.textContent = '🧙'
      }
      if (cell === TILES.ENEMY) {
        div.classList.add('floor')
        div.textContent = '👾'
      }
      if (cell === TILES.ITEM) {
        div.classList.add('floor')
        div.textContent = '🗝️'
      }
      if (cell === TILES.EXIT) {
        div.classList.add('floor')
        div.textContent = '🚪'
      }

      //we add the cell to the game container
      container.appendChild(div)
    })
  })
}