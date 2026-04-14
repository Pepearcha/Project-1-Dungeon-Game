// Hero state
const hero = {
  row: 1,
  col: 1,
  health: 3,
  score: 0,
}

function moveHero(newRow, newCol) {
  // Check boundaries
  if (newRow < 0 || newCol < 0 || newRow >= map.length || newCol >= map[0].length) return

  // Check if destination is a wall
  if (map[newRow][newCol] === TILES.wall) return

  // Update map array - clear old position
  map[hero.row][hero.col] = TILES.floor

  // Update hero position
  hero.row = newRow
  hero.col = newCol

  // Update map array - set new position
  map[hero.row][hero.col] = TILES.hero

  // Re-render the map
  renderMap()
}