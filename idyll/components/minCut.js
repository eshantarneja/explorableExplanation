const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 500;

class minCut extends D3Component {
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
              { x:   width*.00, y: height*.50, id: 0, text: "S"},
              { x:   width*.35, y: height*.35, id: 1, text: "A"},
              { x:   width*.65, y: height*.35, id: 2, text: "B"},
              { x:   width*.35, y: height*.65, id: 3, text: "C"},
              { x:   width*.65, y: height*.65, id: 4, text: "D"},
              { x:   width*1.0, y: height*.50, id: 5, text: "T"},
    ];

    var links = [
              { source: 0, target: 1, capacity: 10, id: 0, flow: 0},
              { source: 0, target: 3, capacity: 8, id: 1, flow: 0},
              { source: 1, target: 2, capacity: 5, id: 2, flow: 0},
              { source: 1, target: 3, capacity: 2, id: 3, flow: 0},
              { source: 2, target: 5, capacity: 7, id: 4, flow: 0},
              { source: 3, target: 4, capacity: 10, id: 5, flow: 0},
              { source: 4, target: 2, capacity: 8, id: 6, flow: 0},
              { source: 4, target: 5, capacity: 10, id: 7, flow: 0},
    ];

    var cuts = [
    {x1: .25,  y1: .2, x2: .25, y2: .8, id: 0, text: 18, max: 18},
    {x1: .15,  y1: .3, x2: .55, y2: .75, id: 1, text: 22, max: 18},
    {x1: .5,  y1: .2, x2: .5, y2: .8, id: 2, text: 15, max: 15},
    {x1: .45,  y1: .3, x2: .85, y2: .65, id: 3, text: 23, max: 15},
    {x1: .8,  y1: .2, x2: .8, y2: .8, id: 4, text: 17, max: 15}
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
      .attr("stroke","grey")
      .attr("id",function(d) {return "line"+d.id;})
      .style("opacity", 1)
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
    .attr("id", function(d) {return "movingCapacity"+d.id;})
    .text(function(d){return d.capacity})
    .attr("font-size", "20px")
    .attr("fill","blue")
    .attr("class","movingCapacity")
    // .attr("opacity","0")


    // var header = svg.selectAll()
    // .data(links)
    // .enter()
    // .append("text")
    // .attr("class","header")
    // .text("NETWORK FLOW")
    // .attr("x", 50)
    // .attr("y",50)
    // .attr("font-size", "40px")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity0"})
    .attr("transform", "translate(-100,62) rotate(-25)")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity1"})
    .attr("transform", "translate(115,-25) rotate(25)")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity2"})
    .attr("transform", "translate(-10,-5) rotate(0)")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity3"})
    .attr("transform", "translate(10,0) rotate(0)")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity4"})
    .attr("transform", "translate(115,-165) rotate(25)")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity5"})
    .attr("transform", "translate(-19,-5) rotate(0)")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity6"})
    .attr("transform", "translate(10,0) rotate(0)")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity7"})
    .attr("transform", "translate(-100,205) rotate(-25)")


    svg.selectAll()
    .data(cuts)
    .enter()
    .append("line")
    .attr("class", function(d) {return "cut"+d.id;})
    .attr("x1", function(d) {return width*d.x1;})
    .attr("y1", function(d) {return height*d.y1;})
    .attr("x2", function(d) {return width*d.x2;})
    .attr("y2", function(d) {return height*d.y2;})
    .attr("stroke-width", 5)
    .attr("stroke","red")
    .attr("opacity",0);

    svg.selectAll()
    .data(cuts)
    .enter()
    .append("text")
    .attr("class", function(d) {return "cut"+d.id;})
    .attr("x",140)
    .attr("y",50)
    .attr("opacity",0)
    .attr("fill","red")
    .text(function(d){return "Current Cut: " + d.text})
    .attr("font-size", "30px");

    svg.selectAll()
    .data(cuts)
    .enter()
    .append("text")
    .attr("class", function(d) {return "cut"+d.id;})
    .attr("x",165)
    .attr("y",80)
    .attr("opacity",0)
    .attr("fill","green")
    .text(function(d){return "Min Cut: " + d.max})
    .attr("font-size", "30px");

    svg.selectAll()
    .data(cuts)
    .enter()
    .append("text")
    .attr("class", "cutFinalFlow")
    .attr("x",80)
    .attr("y",50)
    .attr("opacity",0)
    .attr("fill","green")
    .text("Min Cut = Max Flow = 15")
    .attr("font-size", "30px");
  }
  // each "step" in the idyll file has a number associated with it.
  // To update our graphic all we need to do is check the state number and update

 update(props, oldProps) {

    // console.log("props.myVar")
    this.cutAnimation(props, oldProps)
    
  }

  cutAnimation(props,oldProps){

    console.log("here")
    var lag = 100
    var wait = 2000
    var op = 1

    this.svg.selectAll('[class^="cut"]')
    .attr("opacity",0)

    this.svg.selectAll(".cut0")
    .transition()
    .delay(lag)
    .attr("opacity",op)


    this.svg.selectAll(".cut0")
    .transition()
    .delay(wait)
    .attr("opacity",0)

    this.svg.selectAll(".cut1")
    .transition()
    .delay(wait + lag)
    .attr("opacity",op)

    this.svg.selectAll(".cut1")
    .transition()
    .delay(wait*2)
    .attr("opacity",0)

    this.svg.selectAll(".cut2")
    .transition()
    .delay(wait*2 +lag)
    .attr("opacity",op)

    this.svg.selectAll(".cut2")
    .transition()
    .delay(wait*3)
    .attr("opacity",0)

    this.svg.selectAll(".cut3")
    .transition()
    .delay(wait*3 + lag)
    .attr("opacity",op)

    this.svg.selectAll(".cut3")
    .transition()
    .delay(wait*4)
    .attr("opacity",0)

    this.svg.selectAll(".cut4")
    .transition()
    .delay(wait*4+lag)
    .attr("opacity",op)

    this.svg.selectAll(".cut4")
    .transition()
    .delay(wait*5)
    .attr("opacity",0)

    this.svg.selectAll(".cutFinalFlow")
    .transition()
    .delay(wait*5 + lag)
    .attr("opacity",1)

  }
}

module.exports = minCut;
