let canvas = document.querySelector('canvas')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

let ctx = canvas.getContext('2d')

const paddleLength = 150
const paddleWidth = 10
const paddleSpeed = 6

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
    // draw: () => {
    //   ctx.fillStyle = 'white'
    //   ctx.fillRect(self.x, self.y, paddleWidth, paddleLength)
    // },
    // update: (velocity) => {
    //   self.y += velocity
    //   ctx.fillStyle = 'white'
    //   ctx.fillRect(self.x, self.y, paddleWidth, paddleLength)
    // },
  }
}

const player1 = paddleFactory({ x: 10, y: 100 })
const player2 = paddleFactory({ x: window.innerWidth - 10 * 2, y: 100 })

const animate = () => {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  player1.self.update()
  player2.self.update()
}
animate()
