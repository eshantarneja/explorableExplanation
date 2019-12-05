const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 500;

class CustomD3Component extends D3Component {
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
    { x:   width*.1, y: height*.5, id: 0},
    { x:   width*.5, y: height*.1, id: 1},
    { x:   width*.5, y: height*.9, id: 2},
    { x:   width*.9, y: height*.5, id: 3},
    ];

    var links = [
    { source: 0, target: 1, capacity: "0/5", id:0},
    { source: 0, target: 2, capacity: "0/1", id:1},
    { source: 2, target: 3, capacity: "0/3", id:2},
    { source: 1, target: 3, capacity: "0/5", id:3},
    { source: 1, target: 2, capacity: "0/4", id:4}
    ];

    let lineId = 0;

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
    .attr("id", function(d) { return "line"+d.id})
    .attr("stroke-width", 5)
    .attr("stroke","black")
    .attr("marker-end", "url(#triangle)");

    // append nodes:
    svg.selectAll()
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 15);


    svg.selectAll("text")
    .data(links)
    .enter()
    .append("text")
    .attr("x", function(d){ return (nodes[d.target].x + nodes[d.source].x)/2})
    .attr("y", function(d){ return (nodes[d.target].y + nodes[d.source].y)/2})
    .attr("id", function(d) { return "text"+d.id})
    .text(function(d){return d.capacity})
    .attr("font-size", "40px")
    .attr("fill","red")
    .attr("class","capacity")


    var header = svg.selectAll()
    .data(links)
    .enter()
    .append("text")
    .attr("class","header")
    .text("NETWORK FLOW")
    .attr("x", 50)
    .attr("y",50)
    .attr("font-size", "40px")


  }
  // each "step" in the idyll file has a number associated with it.
  // To update our graphic all we need to do is check the state number and update

  update(props, oldProps) {
    if (props.state==0){
      this.step0(props,oldProps)
    }
    else if (props.state==1){
      this.svg
      .selectAll('text')
      .transition()
      .attr("fill","blue")
      console.log("state=1")

      this.svg
      .selectAll('line')
      .attr("stroke","black")

    }
    else if (props.state==2){
      this.step2AddWater(props,oldProps)

      this.svg
      .selectAll('text')
      .transition()
      .attr("fill","red")
      console.log("state=else")
    }
    else if (props.state==4){
      this.step4SimpleFlow(props,oldProps)
      console.log("state=3")
    }
    else{
      this.svg
      .selectAll('line')
      .attr("stroke","black")
      console.log("state=else")

    }

  }

  step0(props, oldProps) {
    this.svg
    .selectAll("line")
    .attr("stroke", "black");

    var t1 = 2000
    var t2 = 4000
    var t3 = 6000
    var t4 = 8000

    // show vertices only
    this.svg
    .selectAll(".header")
    .transition()
    .delay(t1)
    .text("VERTICES")

    this.svg
    .selectAll("line")
    .transition()
    .delay(t1)
    .attr("opacity",0)

    this.svg
    .selectAll(".capacity")
    .transition()
    .delay(t1)
    .attr("opacity",0)

    // show edges only

    this.svg
    .selectAll("line")
    .transition()
    .delay(t2)
    .attr("opacity",1)

    this.svg
    .selectAll("circle")
    .transition()
    .delay(t2)
    .attr("opacity",0)

    this.svg
    .selectAll(".header")
    .transition()
    .delay(t2)
    .text("EDGES")

    //show capacities

    this.svg
    .selectAll(".header")
    .transition()
    .delay(t3)
    .text("CAPACITIES")

    this.svg
    .selectAll(".capacity")
    .transition()
    .delay(t3)
    .attr("opacity",1)


    // show full graph

    this.svg
    .selectAll("circle")
    .transition()
    .delay(t4)
    .attr("opacity",1)

    this.svg
    .selectAll(".header")
    .transition()
    .delay(t4)
    .text("NETWORK FLOW")
  }

  step2AddWater(props, oldProps) {

    this.svg
    .selectAll("line").filter(function(d) { return this.x1.animVal["value"] != this.x2.animVal["value"]})
    .attr("stroke", "blue");

    // this.svg
    // .selectAll("text").filter(function(d) { console.log(this.x)})
    // .attr("fill", "blue");


    console.log("trying to add simple blue rectangles")

  }

  step4SimpleFlow(props, oldProps) {
    var t1 = 1000
    var t2 = 2000
    var t3 = 3000
    var t4 = 4000
    var t5 = 6500

    this.svg
    .selectAll("line")
    .transition()
    .attr("stroke", "black")
    .attr("stroke-width",5)

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line0"})
    .transition()
    .delay(t1)
    .attr("stroke", "blue")
    .attr("stroke-width",8)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "text0"})
    .transition()
    .delay(t1)
    .text("5/5")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line3"})
    .transition()
    .delay(t2)
    .attr("stroke", "blue")
    .attr("stroke-width",8)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "text3"})
    .transition()
    .delay(t2)
    .text("5/5")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line1"})
    .transition()
    .delay(t3)
    .attr("stroke", "blue")
    .attr("stroke-width",8)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "text1"})
    .transition()
    .delay(t3)
    .text("1/1")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line2"})
    .transition()
    .delay(t4)
    .attr("stroke", "blue")
    .attr("stroke-width",8)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "text2"})
    .transition()
    .delay(t4)
    .text("1/3")

    this.svg
    .selectAll("line")
    .transition()
    .delay(t5)
    .attr("stroke", "black")
    .attr("stroke-width",5)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "text0"})
    .transition()
    .delay(t5)
    .text("0/5")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "text1"})
    .transition()
    .delay(t5)
    .text("0/1")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "text2"})
    .transition()
    .delay(t5)
    .text("0/3")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "text3"})
    .transition()
    .delay(t5)
    .text("0/5")

    // .attr("stroke", "blue");
  }
}

function placeText(source, target, attr) {
  if (attr == 'x'){
    return target.x + source.x/2;
  }
  else if (target.y > source.y){
    return target.y + source.y/1.5;
  }
  else {
    return target.y + source.y/2;
  }
}

module.exports = CustomD3Component;
