const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 500;

class simpleExample extends D3Component {
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
              { source: 0, target: 1, capacity: 10, id: 0},
              { source: 0, target: 3, capacity: 8, id: 1},
              { source: 1, target: 2, capacity: 5, id: 2},
              { source: 1, target: 3, capacity: 2, id: 3},
              { source: 2, target: 5, capacity: 7, id: 4},
              { source: 3, target: 4, capacity: 10, id: 5},
              { source: 4, target: 2, capacity: 8, id: 6},
              { source: 4, target: 5, capacity: 10, id: 7},
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
    .attr("font-size", "40px")
    .attr("fill","red")
    .attr("class","movingCapacity")
    // .attr("opacity","0")


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
    //init state
    if (props.state==0){
      console.log("state=0")
      this.step0(props,oldProps)
    }
    // simple example
    else if (props.state==2){
      console.log("state=1")
      this.svg
      .selectAll('text')
      .transition()
      .attr("fill","blue")
      // console.log("state=1")

      this.svg
      .selectAll('line')
      .attr("stroke","black")

    }
    else if (props.state==3){
      console.log("state=6")
      this.step2AddWater(props,oldProps)

      this.svg
      .selectAll('text')
      .transition()
      .attr("fill","red")
    }
    // simple example
    else if (props.state==1){
      this.step4SimpleFlow(props,oldProps)
      console.log("state=1")
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

    // show vertices only
    this.svg
    .selectAll(".header")
    .text("VERTICES")

    this.svg
    .selectAll("line")
    .attr("opacity",0)

    this.svg
    .selectAll(".movingCapacity")
    .attr("opacity",0)

    // show edges only

    this.svg
    .selectAll("line")
    .attr("opacity",1)

    this.svg
    .selectAll(".nodeVals")
    .attr("opacity",0)

    this.svg
    .selectAll("circle")
    .attr("opacity",0)

    this.svg
    .selectAll(".header")
    .text("EDGES")

    //show capacities

    this.svg
    .selectAll(".header")
    .text("CAPACITIES")

    this.svg
    .selectAll(".movingCapacity")
    .attr("opacity",1)


    // show full graph

    this.svg
    .selectAll("circle")
    .attr("opacity",1)

    this.svg
    .selectAll(".header")
    .text("NETWORK FLOW")

    this.svg
    .selectAll(".nodeVals")
    .attr("opacity",1)
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
    var t1 = 1000;
    var t2 = 2000;
    var t3 = 3000;
    var t4 = 4000;
    var t5 = 5000;
    var t6 = 6000;
    var t7 = 7000;
    var t8 = 8500;
    var t9 = 9500;
    var t10 = 10000;
    var t11 = 11000;

    this.svg
    .selectAll("line")
    .transition()
    .attr("stroke", "black")
    .attr("stroke-width",2)

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line0"})
    .transition()
    .delay(t1)
    .attr("stroke", "blue")
    .attr("stroke-width",3)
    .attr("opacity", 1)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity0"})
    .transition()
    .delay(t1)
    .text("5/10")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line2"})
    .transition()
    .delay(t2)
    .attr("stroke", "blue")
    .attr("stroke-width",3)
    .attr("opacity", 1)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity2"})
    .transition()
    .delay(t2)
    .text("5/5")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line4"})
    .transition()
    .delay(t3)
    .attr("stroke", "blue")
    .attr("stroke-width",3)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity4"})
    .transition()
    .delay(t3)
    .text("5/7")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line1"})
    .transition()
    .delay(t4)
    .attr("stroke", "blue")
    .attr("stroke-width",3)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity1"})
    .transition()
    .delay(t4)
    .text("8/8")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line5"})
    .transition()
    .delay(t5)
    .attr("stroke", "blue")
    .attr("stroke-width",3)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity5"})
    .transition()
    .delay(t5)
    .text("8/10")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line7"})
    .transition()
    .delay(t6)
    .attr("stroke", "blue")
    .attr("stroke-width",3)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity7"})
    .transition()
    .delay(t6)
    .text("8/10")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line0"})
    .transition()
    .delay(t7)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity0"})
    .transition()
    .delay(t7)
    .text("7/10")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line3"})
    .transition()
    .delay(t8)
    .attr("stroke", "blue")
    .attr("stroke-width",3)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity3"})
    .transition()
    .delay(t8)
    .text("2/2")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line5"})
    .transition()
    .delay(t9)
    .attr("stroke", "blue")
    .attr("stroke-width",3)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity5"})
    .transition()
    .delay(t9)
    .text("10/10")

    this.svg
    .selectAll("line").filter(function(d) {return this.id == "line7"})
    .transition()
    .delay(t10)
    .attr("stroke", "blue")
    .attr("stroke-width",3)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity7"})
    .transition()
    .delay(t10)
    .text("10/10")

    this.svg
    .selectAll("line")
    .transition()
    .delay(t11)
    .attr("stroke", "black")
    .attr("stroke-width",2)

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity0"})
    .transition()
    .delay(t11)
    .text("0/10")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity1"})
    .transition()
    .delay(t11)
    .text("0/8")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity2"})
    .transition()
    .delay(t11)
    .text("0/5")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity3"})
    .transition()
    .delay(t11)
    .text("0/2")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity4"})
    .transition()
    .delay(t11)
    .text("0/7")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity5"})
    .transition()
    .delay(t11)
    .text("0/10")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity6"})
    .transition()
    .delay(t11)
    .text("0/8")

    this.svg
    .selectAll("text").filter(function(d) {return this.id == "movingCapacity7"})
    .transition()
    .delay(t11)
    .text("0/10")

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

module.exports = simpleExample;

