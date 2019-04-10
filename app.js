////////////////////////////////////////////////////////////////////////////////
// Variables
var margin = 5
var speed = 10
var rotationSpeed = Math.PI / 2

function LSystem(init, rules, generations) {
  var out = init
  for( var i=0; i<generations; i++ ) {
    out = out.replace(/./g, function(c) {
      var replacement = rules[c]
      return replacement ? replacement : c
    })
  }
  return out
}

function* Turtle(commands) {
  var theta = 0;
  var x = 0;
  var y = 0;
  commands = commands.split("")
  for( var i=0; i<commands.length; i++ ) {
    var c = commands[i]
    if( "F" == c ) {
      var oldX = x
      var oldY = y
      x += speed * Math.cos(theta)
      y += speed * Math.sin(theta)
      yield [oldX, oldY, x, y]
    }
    else if ( "-" == c ) theta -= rotationSpeed
    else if ( "+" == c ) theta += rotationSpeed
  }
}

function minMaxReducer([x1, y1, x2, y2], [lx1, ly1, lx2, ly2]) {
  return [Math.min(x1, x2, lx1, lx2),
          Math.min(y1, y2, ly1, ly2),
          Math.max(x1, x2, lx1, lx2),
          Math.max(y1, y2, ly1, ly2)]
}

var generator;
if( location.href.includes("dragon") ) {
  generator = Turtle(LSystem("FX", {"X": "X+YF+", "Y": "-FX-Y"}, 12))
} else {
  generator = Turtle(LSystem("F+F+F+F+F+F", {"F": "F-F++F-F"}, 4))
  rotationSpeed = Math.PI / 3
}

var data = []

function frame() {
  var v = generator.next().value
  if(v) {
    data.push(v)
    var viewBoxData = data.reduce(minMaxReducer)
    var w = viewBoxData[2] - viewBoxData[0]
    var h = viewBoxData[3] - viewBoxData[1]
    viewBox =
      (viewBoxData[0] - margin) + " " +
      (viewBoxData[1] - margin) + " " +
      (w + 2 * margin) + " " +
      (h + 2 * margin) + " "

    d3.select("#drawing")
      .attr("viewBox", viewBox)
      .attr("width", w)
      .attr("height", h)
      .selectAll("line")
      .data(data)
      .join("line")
      .attr("x1", d => d[0])
      .attr("y1", d => d[1])
      .attr("x2", d => d[2])
      .attr("y2", d => d[3])
    requestAnimationFrame(frame)
  }
}

frame()
