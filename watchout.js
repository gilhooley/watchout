var randomX = function() {
  return Math.random()*450;
}
var randomY = function() {
  return Math.random()*450;
}

var gameboard = d3.select('.container')
    .append('svg').attr('width',"100%").attr('height', 450)
    .style('background','black');


var createPlayer = function() {
  return [{
    "x_axis": 200,
    "y_axis": 200,
    "radius": 10,
    "color": "#ffa500"
  }];
};



// var playerInit = function(data) {

//   var drag = d3.behavior.drag()
//   .on('dragstart', function() { player.style('fill', 'red'); })
//   .on('drag', function() { player.attr('cx', d3.event.x).attr('cy', d3.event.y); })
//   .on('dragend', function() { player.style('fill', 'black'); });

//   var player = gameboard.selectAll('circle').data(data);

//   player.attr('cx', function(d) { return d.x_axis; })
//     .attr('cy', function(d) { return d.y_axis; })
//     .attr('r', function(d) { return d.radius; })
//     .style('fill', function(d) {
//       return d.color;
//     }).call(drag);

//   player.enter().append('circle')
//     .attr('cx', function(d) { return d.x_axis; })
//     .attr('cy', function(d) { return d.y_axis; })
//     .attr('r', function(d) { return d.radius; })
//     .style('fill', function(d) {
//       return d.color;
//     });


// };


var drag = d3.behavior.drag()
             .on('dragstart', function() { circle.style('fill', 'red'); })
             .on('drag', function() { circle.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { circle.style('fill', 'orangered'); });

var circle = gameboard.selectAll('.draggableCircle')
                .data([{ x: (300), y: (300), r: 25 }])
                .enter()
                .append('circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'orangered');


// var player = gameboard.append('path')
//   .attr("d", )
//   .attr("fill", "orangered");


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
  enemies.attr('cx', function(d) { return d.x_axis; })
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
    });

  // exit
  enemies.exit().remove();



};


var counter = 0;
setInterval(function() {
  counter++;
  update(createEnemies(2+counter));
  // playerInit(createPlayer());
}, 1000);
