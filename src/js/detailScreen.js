var UI = require('ui');
var Vector2 = require('vector2');
var normalize = require('./utils.js').normalize;

module.exports = function(journey) {

  var detail = new UI.Card({
    title: journey.legs[0].departure_time.text + '-' + journey.legs[0].arrival_time.text,
    body: 'text\nasdfasdf',
    scrollable: true
  });
  // var textfield = new UI.Text({
  //   position: new Vector2(0, 50),
  //   size: new Vector2(144, 30),
  //   font: 'gothic-24-bold',
  //   text: 'Go!' + journey.legs.length,
  //   textAlign: 'center'
  // });
  // detail.add(textfield);

  var steps = '';
  console.log(journey.legs[0].steps.length);
  for (var i = 0, j = journey.legs[0].steps.length; i < j; ++ i) {
    var step = journey.legs[0].steps[i];
    console.log(normalize(journey.legs[0].steps[i].html_instructions));
    // var t = new UI.Text({
    //   position: new Vector2(0, 50),
    //   size: new Vector2(144, 30),
    //   color: 'black',
    //   text: normalize(journey.legs[0].steps[i].html_instructions)
    // });
    // detail.add(t);
    switch (step.travel_mode) {
      case 'TRANSIT':
        steps += '<'+normalize(step.transit_details.departure_stop.name) + '\n';
        steps += step.transit_details.line.short_name + ' '; 
        steps += step.transit_details.departure_time.text + '-';
        steps += step.transit_details.arrival_time.text + '\n';
        steps += '>'+normalize(step.transit_details.arrival_stop.name) + '\n';
        break;
      case 'WALKING':
      default:
        steps += normalize(step.html_instructions) + '\n';
    }
  }
  detail.body(steps);
  detail.show();

};
