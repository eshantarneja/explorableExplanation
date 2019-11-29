const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 600;

class CustomD3Component extends D3Component {
  initialize(node, props) {
    const svg = (this.svg = d3.select(node).append('svg'));
    svg
      .attr('viewBox', `0 0 ${size} ${size}`)
      .style('width', '100%')
      .style('height', 'auto');

    svg
      .append('circle')
      .attr('r', 20)
      .attr('cx', Math.random() * size)
      .attr('cy', Math.random() * size);
  }
  // each "step" in the idyll file has a number associated with it. 
  // To update our graphic all we need to do is check the state number and update

  update(props, oldProps) {
    if (props.state==1){
      this.svg
      .selectAll('circle')
      .transition()
      .duration(750)
      .attr('cx', 100)
      .attr('cy', 50);
      
    }
    else if (props.state==2){
      this.svg
      .selectAll('circle')
      .transition()
      .duration(750)
      .attr('cx', 200)
      .attr('cy', 50);
      
    }
    else{
      this.svg
      .selectAll('circle')
      .transition()
      .duration(750)
      .attr('cx', 300)
      .attr('cy', 50);
    
    }

  }
}

module.exports = CustomD3Component;
