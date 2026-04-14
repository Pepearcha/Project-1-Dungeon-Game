// Runs when the page loads
window.onload = function() {
  renderMap()
  updateHUD()
  setInterval(moveEnemy, enemy.speed)
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp')    moveHero(hero.row - 1, hero.col)
  if (event.key === 'ArrowDown')  moveHero(hero.row + 1, hero.col)
  if (event.key === 'ArrowLeft')  moveHero(hero.row, hero.col - 1)
  if (event.key === 'ArrowRight') moveHero(hero.row, hero.col + 1)
})

function winGame() {
  setTimeout(function() {
    alert('🎉 You escaped the dungeon! Score: ' + hero.score)
  }, 100)
}

function updateHUD() {
  document.getElementById('score').textContent = '⭐ Score: ' + hero.score
  document.getElementById('health').textContent = '❤️ Health: ' + hero.health
}

function loseLife() {
  if (hero.invincible) return

  hero.health--
  hero.invincible = true
  updateHUD()

  // Respawn hero in starting position
  map[hero.row][hero.col] = TILES.FLOOR
  hero.row = 1
  hero.col = 1
  map[hero.row][hero.col] = TILES.HERO
  renderMap()

  // Remove invincibility after 2 seconds
  setTimeout(function() {
    hero.invincible = false
  }, 2000)

  if (hero.health <= 0) {
    loseGame()
  }
}

function loseGame() {
  setTimeout(function() {
    alert('💀 Game over! The enemy got you!')
  }, 100)
}