var randomX = function() {
  return Math.random()*450;
}
var randomY = function() {
  return Math.random()*450;
}

// var dataCircle = [
//   {"x_axis": randomX(),"y_axis":randomY(),"radius":10,"color":"#fff"},
//   {"x_axis":randomX(),"y_axis":randomY(),"radius":10,"color":"#fff"}
// ];

var createEnemies = function(n) {
  var array = [];
  var enemy = function() {
      return {
    "x_axis": randomX(),
    "y_axis": randomY(),
    "radius":10,
    "color":"#fff"
  }
  };

  for (var i = 0; i < n; i++) {
    array.push(enemy());
  }
  return array;
};

var gameboard = d3.select('.container')
    .append('svg').attr('width',"100%").attr('height', 450)
    .style('background','black');

var update = function (data) {

  // data join
  var enemies = gameboard.selectAll('circle').data(data);

  // update
  enemies.attr('cx', function(d) { return d.x_axis; })
    .attr('cy', function(d) { return d.y_axis; })
    .attr('r', function(d) { return d.radius; })
    .style('fill', function(d) {
      return d.color;
    });

  // enter
  enemies.enter().append('circle')
    .attr('cx', function(d) { return d.x_axis; })
    .attr('cy', function(d) { return d.y_axis; })
    .attr('r', function(d) { return d.radius; })
    .style('fill', function(d) {
      return d.color;
    });

  // exit
  enemies.exit().remove();

};

update(createEnemies(2));
var counter = 0;
setInterval(function() {
  counter++
  update(createEnemies(2+counter));
}, 1000);
