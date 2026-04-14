// Enemy state
const enemy = {
  row: 6,
  col: 8,
  speed: 400, // milliseconds between moves
}

function moveEnemy() {

    // Save old position
    const oldRow = enemy.row;
    const oldCol = enemy.col;

    // Figure out which direction to move towards hero
    let newRow = enemy.row;
    let newCol = enemy.col;

    // Move one direction at a time - prioritize vertical
    if (hero.row > enemy.row) newRow++
    else if (hero.row < enemy.row) newRow--
    else if (hero.col > enemy.col) newCol++
    else if (hero.col < enemy.col) newCol--

    // If wall is blocking, try the other direction
    if (map[newRow][newCol] === TILES.WALL) {
        newRow = enemy.row
        newCol = enemy.col
        if (hero.col > enemy.col) newCol++
        else if (hero.col < enemy.col) newCol--
    }

    // If still blocked don't move
    if (map[newRow][newCol] === TILES.WALL) return

    // Clear old position only if it wasn't an item
    if (map[oldRow][oldCol] !== TILES.ITEM) {
        map[oldRow][oldCol] = TILES.FLOOR
    }

    // Update enemy position
    enemy.row = newRow
    enemy.col = newCol

    // Check if enemy caught the hero
    if (enemy.row === hero.row && enemy.col === hero.col) {
        loseLife()
        return
    }

    // If enemy is on an item tile, don't overwrite it
    if (map[enemy.row][enemy.col] !== TILES.ITEM) {
        map[enemy.row][enemy.col] = TILES.ENEMY
    }

    renderMap()
}