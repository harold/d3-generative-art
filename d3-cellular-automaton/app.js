let ruleIndex = 0;
let n = 60
let boxSize = 10
let ruleMap = {}
let ruleVis = d3.select("body").append("div")
let mainVis = d3.select("body").append("div").append("svg").attr("width", n*boxSize + n+1).attr("height", n*boxSize + n+1)

function go(rule) {
  for( i=0; i<8; i++ ) {
    ruleMap[i] = ((rule >> i) & 1) ? 1 : 0
  }
  let ruleVisData = []
  for( i=0; i<8; i++ ) {
    ruleVisData[i] = ruleMap[i] == 1
  }
  ruleVis.selectAll("svg")
    .data(ruleVisData)
    .join(
      function(e) {
	let g = e.append("svg")
	    .attr("width", boxSize * 3 + 4)
            .attr("height", boxSize * 2 + 3)
	    .append("g")
            .attr("transform", "translate(0.5, 0.5)")
	g.append("rect")
	  .attr("width", boxSize)
	  .attr("height", boxSize)
	  .attr("x", boxSize+1)
	  .attr("y", 1)
	  .attr("fill", (d,i) => d ? "#222" : "#f8f8f8")
          .classed("indicator", true)
	g.append("rect")
	  .attr("width", boxSize)
	  .attr("height", boxSize)
	  .attr("x", 1)
	  .attr("y", boxSize+1)
	  .attr("fill", (d,i) => (i&1) ? "#222" : "#f8f8f8")
          .classed("l", true)
	g.append("rect")
	  .attr("width", boxSize)
	  .attr("height", boxSize)
	  .attr("x", boxSize+1)
	  .attr("y", boxSize+1)
	  .attr("fill", (d,i) => (i&2) ? "#222" : "#f8f8f8")
          .classed("c", true)
	g.append("rect")
	  .attr("width", boxSize)
	  .attr("height", boxSize)
	  .attr("x", 2*boxSize+1)
	  .attr("y", boxSize+1)
	  .attr("fill", (d,i) => (i&4) ? "#222" : "#f8f8f8")
          .classed("r", true)
      },
      function(e) {
	e.select(".indicator").attr("fill", (d,i) => d ? "#222" : "#f8f8f8")
	e.select(".l").attr("fill", (d,i) => (i&1) ? "#222" : "#f8f8f8")
	e.select(".c").attr("fill", (d,i) => (i&2) ? "#222" : "#f8f8f8")
	e.select(".r").attr("fill", (d,i) => (i&4) ? "#222" : "#f8f8f8")
      }
    )

  let firstRow = []
  for( j=0; j<n; j++) {
    // firstRow.push( (j == Math.floor(n/2)) ? 1 : 0)
    firstRow.push(Math.random() < 0.5 ? 1 : 0)
  }
  let data = [firstRow]

  for( j=0; j<n-1; j++) {
    let newRow = []
    let d = data[0]
    for( i=0; i<n; i++ ) {
      let idx = d[(i-1+n)%n] + d[(i+n)%n]*2 + d[(i+1+n)%n]*4
      newRow.push(ruleMap[idx])
    }
    data.unshift(newRow)
  }

  mainVis.selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d,i) => "translate(0.5,"+(i*boxSize+i+0.5)+")")
    .selectAll("rect")
    .data((d,i) => d)
    .join("rect")
    .attr("x", (d,i) => i*boxSize+1)
    .attr("y", 0)
    .attr("width", boxSize)
    .attr("height", boxSize)
    .attr("fill", (d,i) => d==1 ? "#222" : "#f8f8f8")
}

go(ruleIndex)

setInterval(function(){go(++ruleIndex)}, 500)
