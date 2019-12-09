const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 450;

class fordFulkTest extends D3Component {
  initialize(node, props) {
  	const svg = (this.svg = d3.select(node).append('svg'));

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = size - margin.left - margin.right,
    height = size - margin.top - margin.bottom;

    svg
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('width', '100%')
    .style('height', 'auto');

    svg
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");


    var nodes = [
              { x:   width*.1, y: height*.50, id: 0, text: "S"},
              { x:   width*.35, y: height*.35, id: 1, text: "A"},
              { x:   width*.65, y: height*.35, id: 2, text: "B"},
              { x:   width*.35, y: height*.65, id: 3, text:"C"},
              { x:   width*.65, y: height*.65, id: 4, text: "D"},
              { x:   width*.9, y: height*.50, id: 5, text: "T"},
    ];

    var links = [
              { source: 0, target: 1, capacity: props.saMax, id: 0},
              { source: 0, target: 3, capacity: props.scMax, id: 1},
              { source: 1, target: 2, capacity: props.abMax, id: 2},
              { source: 1, target: 3, capacity: props.acMax, id: 3},
              { source: 2, target: 5, capacity: props.btMax, id: 4},
              { source: 3, target: 4, capacity: props.cdMax, id: 5},
              { source: 4, target: 2, capacity: props.dbMax, id: 6},
              { source: 4, target: 5, capacity: props.dtMax, id: 7},
              { source: 3, target: 2, capacity: props.cbMax, id: 8}
    ];

    var cuts = [
    {x1: .25,  y1: .2, x2: .25, y2: .8, id: 0, text: 18, max: 18},
    {x1: .15,  y1: .3, x2: .55, y2: .75, id: 1, text: 22, max: 22},
    {x1: .5,  y1: .2, x2: .5, y2: .8, id: 2, text: 15, max: 22},
    {x1: .45,  y1: .3, x2: .85, y2: .65, id: 3, text: 23, max: 23},
    {x1: .8,  y1: .2, x2: .8, y2: .8, id: 4, text: 17, max: 23}
    ];

    svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 17)
    .attr("refY", 6)
    .attr("markerWidth", 15)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 14 6 0 10")
    .style("fill", "black");

    // append links:
    svg.selectAll()
      .data(links)
      .enter()
      .append("line")
      .attr("x1", function(d) { return nodes[d.source].x; })
      .attr("y1", function(d) { return nodes[d.source].y; })
      .attr("x2", function(d) { return nodes[d.target].x; })
      .attr("y2", function(d) { return nodes[d.target].y; })
      .attr("stroke-width", 2)
      .attr("stroke","lightgrey")
      .attr("id",function(d) {return "line"+d.id;})
      .style("opacity", 0.3)
      .attr("marker-end", "url(#triangle)");

    // append nodes:
    svg.selectAll()
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 17)
      .attr("stroke","green")
      .attr("fill", "lightgreen")

    svg.selectAll()
      .data(nodes)
      .enter()
      .append("g")
      .append("text")
      .attr("class","nodeVals")
      .attr("x", function(d) { return d.x-7; })
      .attr("y", function(d) { return d.y+7; })
      .attr("z-index", 5)
      .attr("font-size",25)
      .text(function(d){return d.text});


    svg.selectAll()
    .data(links)
    .enter()
    .append("text")
    .attr("x", function(d){ return (nodes[d.target].x + nodes[d.source].x)/2})
    .attr("y", function(d){ return (nodes[d.target].y + nodes[d.source].y)/2})
    .attr("id", function(d) {return "movingCapacity"+nodes[d.source].text+nodes[d.target].text;})
    .text(function(d){return "0/"+d.capacity})
    .attr("font-size", "10px")
    .attr("fill","red")
    .attr("class","movingCapacity")
    .attr("opacity",1)




  }
  update(props, oldProps) {

  	console.log("hello")

  	if(props.show==1){
  		this.svg.selectAll('[class^="movingCapacity"]')
    	.attr("fill","green")
  	}
  	else{
  		this.svg.selectAll('[class^="movingCapacity"]')
    	.attr("fill","red")

  	}

    this.svg
    .selectAll('#movingCapacitySA')
    .text(props.sa + "/" + props.saMax)

    this.svg
    .selectAll('#movingCapacitySC')
    .text(props.sc + "/" + props.scMax)

    this.svg
    .selectAll('#movingCapacityAB')
    .text(props.ab + "/" + props.abMax)

    this.svg
    .selectAll('#movingCapacityAC')
    .text(props.ac + "/" + props.acMax)


    this.svg
    .selectAll('#movingCapacityBT')
    .text(props.bt + "/" + props.btMax)


    this.svg
    .selectAll('#movingCapacityCD')
    .text(props.cd + "/" + props.cdMax)


    this.svg
    .selectAll('#movingCapacityDB')
    .text(props.db + "/" + props.dbMax)


    this.svg
    .selectAll('#movingCapacityDT')
    .text(props.dt + "/" + props.dtMax)

    this.svg
    .selectAll('#movingCapacityCB')
    .text(props.cb + "/" + props.cbMax)



  }
}

module.exports = fordFulkTest;
