// Runs when the page loads
window.onload = function() {
  renderMap()
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp')    moveHero(hero.row - 1, hero.col)
  if (event.key === 'ArrowDown')  moveHero(hero.row + 1, hero.col)
  if (event.key === 'ArrowLeft')  moveHero(hero.row, hero.col - 1)
  if (event.key === 'ArrowRight') moveHero(hero.row, hero.col + 1)
})