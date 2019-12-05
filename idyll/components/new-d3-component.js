const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');


class NewD3Component extends D3Component {
  initialize(node, props) {
    const svg = (this.svg = d3.select(node).append('svg'));


    const button = (this.button = d3.select(node).append('button'));

    button
    .attr("type","radio");

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 850 - margin.left - margin.right,
    height = 850 - margin.top - margin.bottom;

    svg
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('width', '100%')
    .style('height', 'auto');


    svg
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

    svg.selectAll()
    .data(nodes)
    .enter()
    .append("div")
    .attr("cx", function(d) { return d.x + 10; })
    .attr("cy", function(d) { return d.y; });


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
update(props, oldProps) {

}

}

module.exports = NewD3Component;


