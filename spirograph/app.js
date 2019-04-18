let size = 384
let canvas = document.getElementById("drawing")
canvas.width = size
canvas.height = size
let ctx = canvas.getContext("2d")
ctx.globalCompositeOperation = "screen"
ctx.strokeStyle = "#777"

let t = 0
let timeStep = 0.2
let a = size/2
let b = a / 1.3
//let b = a / Math.sqrt(2)
let h = 0.6 * b


function* lines() {
  let x = size
  let y = size / 2

  while(true) {
    t += timeStep
    x = size/2 + (a-b)*Math.cos(t) + h*Math.cos(t*(a-b)/b)
    y = size/2 + (a-b)*Math.sin(t) + h*Math.sin(t*(a-b)/b)
    yield [x,y]
  }
}
let generator = lines()
let [oldX,oldY] = generator.next().value

function frame() {
  let [newX,newY] = generator.next().value
  ctx.beginPath()
  ctx.moveTo(oldX,oldY)
  ctx.lineTo(newX,newY)
  ctx.stroke()
  oldX = newX
  oldY = newY
  requestAnimationFrame(frame)
}

frame()
