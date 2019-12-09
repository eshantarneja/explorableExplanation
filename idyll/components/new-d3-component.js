const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 450;

class NewD3Component extends D3Component {
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
              { x:   width*.1, y: height*.50, id: 0},
              { x:   width*.35, y: height*.35, id: 1},
              { x:   width*.65, y: height*.35, id: 2},
              { x:   width*.35, y: height*.65, id: 3},
              { x:   width*.65, y: height*.65, id: 4},
              { x:   width*.9, y: height*.50, id: 5},
    ];

    var links = [
              { source: 0, target: 1, capacity: 10, id: 0},
              { source: 0, target: 3, capacity: 8, id: 1},
              { source: 1, target: 2, capacity: 5, id: 2},
              { source: 1, target: 3, capacity: 2, id: 3},
              { source: 2, target: 5, capacity: 7, id: 4},
              { source: 3, target: 4, capacity: 10, id: 5},
              { source: 4, target: 2, capacity: 8, id: 6},
              { source: 4, target: 5, capacity: 10, id: 7},
    ];

    var cuts = [
    {x1: .25,  y1: .2, x2: .25, y2: .8, id: 0, text: 18, max: 18},
    {x1: .15,  y1: .3, x2: .55, y2: .75, id: 1, text: 22, max: 22},
    {x1: .5,  y1: .2, x2: .5, y2: .8, id: 2, text: 15, max: 15},
    {x1: .45,  y1: .3, x2: .85, y2: .65, id: 3, text: 23, max: 15},
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
      .text(function(d){return d.id});


    svg.selectAll()
    .data(links)
    .enter()
    .append("text")
    .attr("x", function(d){ return (nodes[d.target].x + nodes[d.source].x)/2})
    .attr("y", function(d){ return (nodes[d.target].y + nodes[d.source].y)/2})
    .attr("id", function(d) {return "movingCapacity"+d.id;})
    .text(function(d){return d.capacity})
    .attr("font-size", "20px")
    .attr("fill","red")
    .attr("class","movingCapacity")
    .attr("opacity",1)


    // svg.selectAll()
    // .data(nodes)
    // .enter()
    // .append("line")
    // .attr("class", "cut0")
    // .attr("x1", width*.25)
    // .attr("y1", height*.2)
    // .attr("x2", width*.25)
    // .attr("y2", height*.8)
    // .attr("stroke-width", 5)
    // .attr("stroke","red")
    // .attr("opacity",0);

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
    .attr("x",width*.05)
    .attr("y",width*.05)
    .attr("opacity",0)
    .attr("fill","red")
    .text(function(d){return "Current Cut: " + d.text});

    svg.selectAll()
    .data(cuts)
    .enter()
    .append("text")
    .attr("class", function(d) {return "cut"+d.id;})
    .attr("x",width*.05)
    .attr("y",width*.1)
    .attr("opacity",0)
    .attr("fill","green")
    .text(function(d){return "Min Cut: " + d.max});

    svg.selectAll()
    .data(cuts)
    .enter()
    .append("text")
    .attr("class", "cutFinalFlow")
    .attr("x",width*.25)
    .attr("y",width*.1)
    .attr("opacity",0)
    .attr("fill","green")
    .text("Min Cut = Max Flow = 15");
  }



  update(props, oldProps) {

    console.log(props.myVar)

    if (props.myVar > 0){     
      this.cutAnimation(props, oldProps)
    }
    
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


module.exports = NewD3Component;


