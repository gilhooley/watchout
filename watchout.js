var randomX = function() {
  return Math.random() * parseInt(d3.select('.container').style('width'));
}
var randomY = function() {
  return Math.random() * 450;
}

var gameOptions = {
  height: 450,
  width: "100%",
  nEnemies: 10
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
}

var gameboard = d3.select('.container')
  .append('svg').attr({"height": gameOptions.height, "width": gameOptions.width})
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

// collision check
var collisionCheck = function(enemy, callback) {

  var radiusSum = parseFloat(enemy.attr('r')) + parseFloat(player.attr('r'));
  var xDiff = parseFloat(enemy.attr('cx')) - parseFloat(player.attr('cx'));
  var yDiff = parseFloat(enemy.attr('cy')) - parseFloat(player.attr('cy'));

  var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (separation < radiusSum) {
   return callback(player, enemy);
 }
};

// bind this to enemy
var collisionBind = function(endData) {
  var enemy = d3.select(this);
  var startPos = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  };
  var endPos = {
    x: endData.x_axis,
    y: endData.y_axis
  };
  return function (t) {
    collisionCheck(enemy, onCollision);
    var enemyNextPos = {
      x: startPos.x + (endPos.x - startPos.x) * t,
      y: startPos.y + (endPos.y - startPos.y) * t
    };
    enemy.attr('cx', enemyNextPos.x ).attr('cy', enemyNextPos.y);
  };
};

var onCollision = function() {
  updateBestScore();
  gameStats.score = 0;
  gameStats.collisions++;
  return updateScore();
};

var updateScore = function() {
  d3.select('#collisions-count').text(gameStats.collisions.toString());
  return d3.select('#current-score').text(gameStats.score.toString());
};

var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  return d3.select('#best-score').text(gameStats.bestScore.toString());
};


var update = function (data) {

  // data join
  var enemies = gameboard.selectAll('.enemyCircle').data(data);

  // update
  enemies
    .transition()
    .duration(2000)
    .tween("custom",collisionBind);

  // enter
  enemies.enter().append('circle')
    .attr('class','enemyCircle')
    .attr('cx', function(d) { return d.x_axis; })
    .attr('cy', function(d) { return d.y_axis; })
    .attr('r', function(d) { return d.radius; })
    .style('fill', function(d) {
      return d.color;
    });

  // exit
  enemies.exit().remove();

};

setInterval(function(){
  gameStats.score++;
  updateScore();
  updateBestScore();
},50);

setInterval(function() {
  gameOptions.nEnemies++;
  update(createEnemies(gameOptions.nEnemies));
  // playerInit(createPlayer());
}, 2000);
