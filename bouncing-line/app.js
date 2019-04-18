let w = 64
let h = 64
let canvas = document.getElementById("drawing")
canvas.width = w
canvas.height = h
let ctx = canvas.getContext("2d")
ctx.globalCompositeOperation = "screen"
ctx.strokeStyle = "#111"

function* lines() {
  let x1 = Math.random()*w | 0
  let y1 = Math.random()*h | 0
  let x2 = Math.random()*w | 0
  let y2 = Math.random()*h | 0
  let vx1 = Math.random() * (Math.random() > 0.5 ? 1 : -1)
  let vy1 = Math.random() * (Math.random() > 0.5 ? 1 : -1)
  let vx2 = Math.random() * (Math.random() > 0.5 ? 1 : -1)
  let vy2 = Math.random() * (Math.random() > 0.5 ? 1 : -1)

  while(true) {
    x1 += vx1
    y1 += vy1
    x2 += vx2
    y2 += vy2
    if(x1 < 0 || x1 >= w) vx1 *= -1
    if(y1 < 0 || y1 >= h) vy1 *= -1
    if(x2 < 0 || x2 >= w) vx2 *= -1
    if(y2 < 0 || y2 >= h) vy2 *= -1
    yield [x1,y1,x2,y2]
  }
}
let generator = lines()

function frame() {
  let [x1,y1,x2,y2] = generator.next().value
  ctx.beginPath()
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.stroke()
  requestAnimationFrame(frame)
}

frame()
