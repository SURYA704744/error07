const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');

let enemies = [];
let score = 0;

// Score display
const scoreBoard = document.createElement('div');
scoreBoard.id = 'score';
scoreBoard.innerText = 'Score: 0';
document.body.appendChild(scoreBoard);

// Player movement
document.addEventListener('keydown', e => {
  const step = 20;
  const left = player.offsetLeft;

  if (e.key === 'ArrowLeft' && left > 0) {
    player.style.left = `${left - step}px`;
  } else if (e.key === 'ArrowRight' && left + player.offsetWidth < window.innerWidth) {
    player.style.left = `${left + step}px`;
  }
});

// Shoot bullets
document.addEventListener('keydown', e => {
  if (e.key === ' ') {
    const bullet = document.createElement('img');
    bullet.src = 'img/gun_v.png';
    bullet.className = 'bullet';
    bullet.style.left = `${player.offsetLeft + player.offsetWidth / 5 - 10}px`;
    bullet.style.bottom = `80px`;
    bullet.style.position = 'absolute';
    gameArea.appendChild(bullet);

    const bulletInterval = setInterval(() => {
      let bottom = parseInt(bullet.style.bottom);
      bullet.style.bottom = `${bottom + 10}px`;

      if (bottom > window.innerHeight) {
        clearInterval(bulletInterval);
        bullet.remove();
      }

      enemies.forEach((enemy, index) => {
        const bulletRect = bullet.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        if (
          bulletRect.top < enemyRect.bottom &&
          bulletRect.bottom > enemyRect.top &&
          bulletRect.left < enemyRect.right &&
          bulletRect.right > enemyRect.left
        ) {
          enemy.remove();
          bullet.remove();
          clearInterval(bulletInterval);
          enemies.splice(index, 1);
          score++;
          scoreBoard.innerText = `Score: ${score}`;
        }
      });
    }, 20);
  }
});

// Create enemies
function createEnemy() {
  const enemy = document.createElement('img');
  enemy.src = 'img/ali.png';
  enemy.className = 'enemy';
  enemy.style.left = `${Math.random() * (window.innerWidth - 80)}px`;
  enemy.style.top = '0px';
  gameArea.appendChild(enemy);
  enemies.push(enemy);

  const speed = 3 + Math.random() * 4;
  const moveInterval = setInterval(() => {
    let top = parseInt(enemy.style.top);
    enemy.style.top = `${top + speed}px`;

    if (top > window.innerHeight) {
      clearInterval(moveInterval);
      enemy.remove();
      enemies.splice(enemies.indexOf(enemy), 1);
    }
  }, 30);
}

setInterval(createEnemy, 1000);
