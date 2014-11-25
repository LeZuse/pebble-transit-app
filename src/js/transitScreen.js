var UI = require('ui');
var ajax = require('ajax');


var errorMessage = function(err) {
  var card = new UI.Card({
    title: 'Error'
  });
  card.body('Msg:' + error);
  card.show();
};

var normalize = function(s) {
  return s.replace(/[ěé]/gi,'e').replace(/š/gi,'s').replace(/č/gi,'c').replace(/ř/gi,'r').replace(/ž/gi,'z').replace(/ý/gi,'y').replace(/á/gi,'a').replace(/í/gi,'i');
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

module.exports = function(journey) {
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
        console.log(normalize(data.routes[i].legs[0].steps[0].html_instructions));
        opts.push({
          title: data.routes[i].legs[0].departure_time.text + ' ' + travelModeTag(data.routes[i].legs[0].steps),
          subtitle: data.routes[i].legs[0].duration.text + ' ' + normalize(data.routes[i].legs[0].steps[0].html_instructions)
        });
      }
      var list = new UI.Menu({
        sections: [{
          title: 'Namesti Miru > Marjanka',
          items: opts
        }]
      });
      var index = 0;
      list.on('down', function(e) {
        index++;
        console.log(index);
      });
      list.on('up', function(e) {
        index--;
        console.log(index);
      });
      list.on('select', function(e) {
        console.log(e);
      });
      list.show();
    },
    function(error) {
      errorMessage(error);
    }
  );
};
