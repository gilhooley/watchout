

var gameboard = d3.select('.container')
  .append('svg').attr('width',450).attr('height', 450)
  .style('background','black');

var dataCircle = [
  {"x_axis":100,"y_axis":100,"radius":10,"color":"#fff"},
  {"x_axis":150,"y_axis":150,"radius":10,"color":"#fff"}
];

var enemies = gameboard.selectAll('circle').data(dataCircle)
  .enter().append('circle')
  .attr('cx', function(d) { return d.x_axis; })
  .attr('cy', function(d) { return d.y_axis; })
  .attr('r', function(d) { return d.radius; })
  .style('fill', function(d) {
    return d.color;
  });
