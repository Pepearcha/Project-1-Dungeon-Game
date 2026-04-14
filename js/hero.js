// Hero state
const hero = {
  row: 1,
  col: 1,
  health: 3,
  score: 0,
  invincible: false,
}

function moveHero(newRow, newCol) {
  // Check boundaries
  if (newRow < 0 || newCol < 0 || newRow >= map.length || newCol >= map[0].length) return

  // Check if destination is a wall
  if (map[newRow][newCol] === TILES.WALL) return
  // Check if exit is locked
  if (map[newRow][newCol] === TILES.EXIT && hero.score === 0) return

  // Save what tile we're moving onto before overwriting it
  const destinationTile = map[newRow][newCol]

  // Update map array - clear old position
  map[hero.row][hero.col] = TILES.FLOOR;

  // Update hero position
  hero.row = newRow;
  hero.col = newCol;

  // Update map array - set new position
  map[hero.row][hero.col] = TILES.HERO;
  if ( destinationTile === TILES.ITEM) {
    hero.score++;
  }

  //Finish game if exit is reached and item grabbed
  if (destinationTile === TILES.EXIT && hero.score > 0) {
    winGame()
  }

  // Re-render the map and update HUD to show score
  renderMap()
  updateHUD()
}