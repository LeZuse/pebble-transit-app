var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
require('./settingsConfig.js');

// var normalizePrice = function(p) {
//   return p.replace(' ', '').replace('Kč', 'Kc').replace('ě', 'e');
// };

var config = {
  journeys: [
    {name: 'Work > home', from: 'Namesti Miru', to: 'Marjanka', location: 'Praha'},
    {name: 'Home > work', to: 'Namesti Miru', from: 'Marjanka', location: 'Praha'}
  ]
};

var errorMessage = function(err) {
  var card = new UI.Card({
    title: 'Error'
  });
  card.body('Msg:' + error);
  card.show();
};

var normalize = function(s) {
  return s.replace('ě','e').replace('š','s').replace('č','c').replace('ř','r')
  .replace('ž','z').replace('ý','y').replace('á','a').replace('é','e').replace('í','i');
};

var travelModeTag = function(steps) {
  var tag = '';
  for (var i = 0, j = steps.length; i < j; ++ i) {
    var t = steps[i].travel_mode[0]; // get first letter for every step
    tag += t;
    if (t === 'T') tag += steps[i].transit_details.line.short_name;
  }
  return tag;
};

var mainScreen = function() {
  var items = [];
  for (var i = 0, j = config.journeys.length; i < j; ++ i) {
    items.push({
      title: config.journeys[i].name,
      subtitle: config.journeys[i].from + ' > ' + config.journeys[i].to
    });
  }

  var journeys = new UI.Menu({
    sections: [{
      title: 'Journeys',
      items: items
    }]
  });

  journeys.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    transitScreen(config.journeys[e.itemIndex]);
  });

  journeys.show();
};

var transitScreen = function(journey) {
  var from = encodeURIComponent(journey.from + ',' + journey.location);
  var to = encodeURIComponent(journey.to + ',' + journey.location);
  var url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+from+'&destination='+to+
    '&mode=transit&departure_time=now&alternatives=true&language=en-gb'; // alternatives for a list; language for time formatting
  console.log(url);
  ajax({ 'url': url, 'type': 'json' },
    function(data) {
      if (data.status != 'OK') return errorMessage(data.status);
      var opts = [];
      for (var i = 0, j = data.routes.length; i < j; ++ i) {
        console.log('steps: '+data.routes[i].legs.length);
        opts.push({
          title: data.routes[i].legs[0].departure_time.text + ' ' + travelModeTag(data.routes[i].legs[0].steps),
          subtitle: normalize(data.routes[i].legs[0].steps[0].html_instructions)
        });
      }
      var list = new UI.Menu({
        sections: [{
          title: 'Namesti Miru > Marjanka',
          items: opts
        }]
      });
      list.show();
    },
    function(error) {
      errorMessage(error);
    }
  );
};

mainScreen();


// main.on('click', 'select', function(e) {
//   var wind = new UI.Window();
//   var textfield = new UI.Text({
//     position: new Vector2(0, 50),
//     size: new Vector2(144, 30),
//     font: 'gothic-24-bold',
//     text: 'Text Anywhere!',
//     textAlign: 'center'
//   });
//   wind.add(textfield);
//   wind.show();
// });
//
// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });
