var randomX = function() {
  return Math.random()*450;
}
var randomY = function() {
  return Math.random()*450;
}

var gameboard = d3.select('.container')
  .append('svg').attr('width',"100%").attr('height', 450)
  .style('background','black');

var drag = d3.behavior.drag()
  .on('dragstart', function() { player.style('fill', 'red'); })
  .on('drag', function() { player.attr('cx', d3.event.x)
                                .attr('cy', d3.event.y); })
  .on('dragend', function() { player.style('fill', 'orangered'); });

var player = gameboard.selectAll('.draggableCircle')
  .data([{ x: (300), y: (300), r: 10 }])
  .enter()
  .append('circle')
  .attr('class', 'draggableCircle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', function(d) { return d.r; })
  .call(drag)
  .style('fill', 'orangered');


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

var update = function (data) {

  // data join
  var enemies = gameboard.selectAll('.enemyCircle').data(data);

  // update
  enemies.transition().duration(1000).attr('cx', function(d) { return d.x_axis; })
    .attr('cy', function(d) { return d.y_axis; })
    .attr('r', function(d) { return d.radius; })
    .style('fill', function(d) {
      console.log('update');
      return d.color;
    });
  // enter
  enemies.enter().append('circle')
    .attr('class','enemyCircle')
    .attr('cx', function(d) { return d.x_axis; })
    .attr('cy', function(d) { return d.y_axis; })
    .attr('r', function(d) { return d.radius; })
    .style('fill', function(d) {
      console.log('enter');
      return d.color;
    })

  // exit
  enemies.exit().transition().duration(1000).remove();



};


var counter = 0;
setInterval(function() {
  counter++;
  update(createEnemies(10));
  // playerInit(createPlayer());
}, 1000);
