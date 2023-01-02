let canvas = document.querySelector('canvas')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

let ctx = canvas.getContext('2d')

const paddleLength = 150
const paddleWidth = 10
const paddleSpeed = 6
const ballSpeed = 20

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'q':
      player1.self.up()
      break
    case 'a':
      player1.self.down()
      break
    case 'p':
      player2.self.up()
      break
    case 'l':
      player2.self.down()
      break
    default:
      player1.self.stop()
      break
  }
})

const paddleFactory = ({ x, y }) => {
  let self = {
    x,
    y,
    velocity: 0,
    up: () => {
      self.velocity = -paddleSpeed
    },
    down: () => {
      self.velocity = paddleSpeed
    },
    stop: () => {
      self.velocity = 0
    },
    draw: () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(self.x, self.y, paddleWidth, paddleLength)
    },
    update: () => {
      self.draw()
      if (self.y + self.velocity > 0 && self.y + self.velocity + paddleLength < window.innerHeight)
        self.y += self.velocity
    },
  }
  return {
    self,
  }
}

const ballFactory = ({ x, y, velocityX, velocityY }) => {
  let self = {
    x,
    y,
    velocityX,
    velocityY,
    draw: () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(self.x, self.y, 10, 10)
    },
    update: () => {
      self.draw()
      if (self.y + self.velocityY > 0 && self.y + self.velocityY + 10 < window.innerHeight)
        self.y += self.velocityY
      else {
        self.velocityY = -self.velocityY
      }
      if (self.x + self.velocityX > 0 && self.x + self.velocityX + 10 < window.innerWidth)
        self.x += self.velocityX
      else {
        self.velocityX = -self.velocityX
      }
    },
  }
  return {
    self,
  }
}

const randomDirection = () => {
  // let random = Math.random()
  // if (random < 0.05) random *= 10
  // random - 0.5
  // console.log(random)
  // return random
  return Math.random() - 0.5
}

const coinFlip = () => {
  let coin = Math.random()
  if (coin < 0.5) return -0.5 * ballSpeed
  else {
    return 0.5 * ballSpeed
  }
}

const player1 = paddleFactory({ x: 10, y: 100 })
const player2 = paddleFactory({ x: window.innerWidth - 10 * 2, y: 100 })
const ball = ballFactory({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  // velocityX: randomDirection() * ballSpeed,
  // randomly pick a left or right direction, but ensure it's consistent speed
  velocityX: coinFlip(),
  velocityY: randomDirection() * (ballSpeed / 2),
})

const animate = () => {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  player1.self.update()
  player2.self.update()
  ball.self.update()
}
animate()
