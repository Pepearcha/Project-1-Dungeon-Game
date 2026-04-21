//Array holding both enemy objects with their position and speed
const enemies = [
  {row: 0, col: 0, speed: 800},
  {row: 0, col: 0, speed: 800},
]

//Places each enemy on a random floor tile at the start of the game
function placeEnemies() {
    enemies.forEach(enemy => {
        //getRandomFloorTile that is not being occupied
        const pos = getRandomFloorTile();

        //set the enemies position to their new starting tile position row and col
        enemy.row = pos.row;
        enemy.col = pos.col;

        //Make this tile appear on the map as an enemy
        map[enemy.row][enemy.col] = TILES.ENEMY;
    })
}

function moveEnemy() {
    //checks if the game is playing and not on a level transition so that enemies dont move
    if (gameActive === false) {
        return
    }
    enemies.forEach(enemy => {
        //Check if the enemy is stunned, if so just skip the turn
        if (enemy.stunned) return;

        //Save the current enemy position before moving
        const oldRow = enemy.row
        const oldCol = enemy.col

        //Set the current position of the enemy as the new position
        let newRow = enemy.row;
        let newCol = enemy.col;

        //Make enemy move towards hero (chase him based on his position compared to the enemies position)
        if (hero.row > enemy.row) {
            newRow++;
        }else if(hero.row < enemy.row){
            newRow--;
        }else if (hero.col > enemy.col) {
            newCol++;
        }else if (hero.col < enemy.col) {
            newCol--;
        }

        //Block the movement if the enemy is moving towards a wall and make him prioritize movement to the other angle
        if (map[newRow][newCol] === TILES.WALL) {
            newRow = enemy.row;
            newCol = enemy.col;
            if (hero.col > enemy.col) {
                newCol++;
            }else if (hero.col < enemy.col) {
                newCol--;
            }
        }

        //This makes sure that the enemy doesnt go through walls and if they reach a position where wall is blocking just dont move.
        if (map[newRow][newCol] === TILES.WALL) return;

        //After movement change the old position of the enemy back to a floor tile unless its an item or exit tile
        if (map[oldRow][oldCol] !== TILES.ITEM && map[oldRow][oldCol] !== TILES.EXIT) {
            map[oldRow][oldCol] = TILES.FLOOR;
        }

        //We update the new position of the enemy in the object
        enemy.row = newRow;
        enemy.col = newCol;

        //Check if the enemy reached the hero and therefore the hero needs to lose a life
        if (enemy.row === hero.row && enemy.col === hero.col) {
            loseLife();
            return
        }

        //Place enemy on the map unless there is an item or exit tile there
        if (map[enemy.row][enemy.col] !== TILES.ITEM && map[enemy.row][enemy.col] !== TILES.EXIT) {
            map[enemy.row][enemy.col] = TILES.ENEMY;
        }
    })

    //Once the enemies are placed re render the map
    renderMap();
}