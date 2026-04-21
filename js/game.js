//Variable trackers
let currentLevel = 1;
let gameActive = true;
let cooldownTimer = null

// Runs when the page loads
window.onload = function() {
  //Place the hero, item and exit on the generated map
  placeEntities();
  //Place the enemies
  placeEnemies();
  //Render map on screen
  renderMap();
  //Update the HUD with the health and score
  updateHUD();

  //Start the game button MENU
  document.getElementById('start-button').addEventListener('click', function() {
    //We hide the main menu
    document.getElementById('start-screen').style.display = 'none';

    //We show the game screen
    document.getElementById('game').style.display = 'block';

    //Start the enemies
    startEnemies();
    gameActive = true;
  })
}

//function start enemies movement interval
function startEnemies() {
  enemies.forEach(enemy => {
    enemy.interval = setInterval(moveEnemy, enemy.speed);
  })
}

//function stop all enemy movements
function stopEnemies() {
  enemies.forEach(enemy => {
    clearInterval(enemy.interval);
    enemy.interval = null;
  })  
}

//function updates the HUD displaying the health, score and ability
function updateHUD() {
  document.getElementById('level').textContent = '📜 Level: ' + currentLevel;
  document.getElementById('health').textContent = '❤️ Health: ' + hero.health;
}
//function updates the key hud text
function updateKey() {
  document.getElementById('key').textContent = hero.hasKey ? '🗝️ Key: Yes' : '🗝️ Key: No';
}

//function appears when hero reaches exit with the item
function winGame() {
  setTimeout(function() {
    nextLevel();
  }, 100)
}

//function that moves the game level
function nextLevel(){
  //stop the game
  gameActive = false;
  //stop enemy movement
  stopEnemies();

  //increase the level
  currentLevel++;

  //make enemies faster reduce speed but set a minimum of 200
  enemies.forEach(enemy => {
    enemy.speed = Math.max(200, enemy.speed - 50);
  })

  //reduce the ability cooldown by 1 second per level with a minimum of 5
  hero.stunCooldown = Math.max(5, hero.stunCooldown - 1);

  //show the new level transition screen
  document.getElementById('level-title').textContent = '⚔️ Level ' + currentLevel;
  document.getElementById('level-stats').textContent = '⚡ Stun cooldown: ' + hero.stunCooldown + 's';
  document.getElementById('level-screen').style.display = 'flex';

  //after some time hide the level transition screen and start the new level
  setTimeout(function() {
    document.getElementById('level-screen').style.display = 'none';
    resetLevel();
  }, 3000)
}

//function resets the game after you lose
function resetGame() {
  //reset level
  currentLevel = 1;

  //reset the hero stats
  hero.health = 3;
  hero.hasKey = false;
  hero.invincible = false;
  hero.stunReady = true;
  hero.stunCooldown = 30;
  hero.row = 1;
  hero.col = 1;

  //for each enemy reset its speed back to original
  enemies.forEach(enemy => {
    enemy.speed = 800;
  })

  //clear the cooldown timer
  if (cooldownTimer) {
    clearInterval(cooldownTimer)
    cooldownTimer = null
  }

  //regenerate the map and place all entities
  map = generateMap();
  placeEntities();
  placeEnemies();
  renderMap();

  //update hud
  updateHUD();
  updateKey()
  document.getElementById('stun').textContent = '⚡ Stun: Ready'
}

//function resets the map, item, hero, exit and enemies each level
function resetLevel() {
  //clear any running ability cooldown
  if (cooldownTimer) {
    clearInterval(cooldownTimer)
    cooldownTimer = null
  }

  //reset the key
  hero.hasKey = false
  updateKey();

  // Reset stun state
  hero.stunReady = true
  document.getElementById('stun').textContent = '⚡ Stun: Ready'

  //regenerates the map
  map = generateMap();

  //resets the hero position
  map[hero.row][hero.col] = TILES.FLOOR;
  hero.row = 1;
  hero.col = 1;

  //resets the stun ability
  hero.stunReady = true;

  //place everything on the map
  placeEntities();
  placeEnemies();
  renderMap();
  updateHUD();

  //restart the enemies with the new speed and start the game
  startEnemies();
  gameActive = true;
}

//Removes a life from the hero, updates the HUD and respwns them
function loseLife() {
  //Makes sure the hero cant lose all its lives in one hit, if the hero is invincible just ignore the damage
  if (hero.invincible) {
    return
  }
  hero.health--
  hero.invincible = true
  updateHUD()

  //respawn hero in starting position
  map[hero.row][hero.col] = TILES.FLOOR
  hero.row = 1
  hero.col = 1
  map[hero.row][hero.col] = TILES.HERO
  renderMap()

  //remove invincibility after 2 seconds
  setTimeout(function() {
    hero.invincible = false
  }, 2000)

  //if there are no lives left invoke the loseGame function
  if (hero.health <= 0) {
    loseGame()
  }
}

//function is triggered when all the heros lives are lost
function loseGame() {
  setTimeout(function() {
    //stop enemies and game
    stopEnemies();
    gameActive = false;

    //save level before resetting it
    const levelReached = currentLevel;

    //fully reset the game before going back to the main menu
    resetGame();

    //Go back to main menu and display a p with the level you reached
    document.getElementById('game').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('start-screen').querySelector('p').textContent = 'You reached Level ' + levelReached + '! Can you do better?';
  }, 100)
}

//function stun the enemies for a short period of time
function useStun() {
  //if already used just ignore
  if (hero.stunReady === false) {
    return
  }


  hero.stunReady = false
  document.getElementById('stun').textContent = '⚡ Stun: Recharging...'

  // Freeze all enemies for 3 seconds
  enemies.forEach(function(enemy) {
    enemy.stunned = true
  })

  setTimeout(function() {
    // Unfreeze enemies
    enemies.forEach(function(enemy) {
      enemy.stunned = false
    })

    // Start countdown
    let timeLeft = hero.stunCooldown
    document.getElementById('stun').textContent = '⚡ Stun: ' + timeLeft + 's'

    cooldownTimer = setInterval(function() {
      timeLeft--
      if (timeLeft <= 0) {
        clearInterval(cooldownTimer)
        cooldownTimer = null
        hero.stunReady = true
        document.getElementById('stun').textContent = '⚡ Stun: Ready'
      } else {
        document.getElementById('stun').textContent = '⚡ Stun: ' + timeLeft + 's'
      }
    }, 1000)

  }, 3000)
}

//invokes the moveHero function each time the user presses any of the arrow keys and also the stun ability
document.addEventListener('keydown', function(event) {
  if (gameActive === false) {
    return
  }
  if (event.key === 'ArrowUp') {
    moveHero(hero.row - 1, hero.col)
  }
  if (event.key === 'ArrowDown') {
    moveHero(hero.row + 1, hero.col)
  }
  if (event.key === 'ArrowLeft') {
    moveHero(hero.row, hero.col - 1)
  }
  if (event.key === 'ArrowRight') {
    moveHero(hero.row, hero.col + 1)
  }
  if (event.key === ' ') {
    useStun()
  }
})