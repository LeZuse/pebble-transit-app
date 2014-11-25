var UI = require('ui');
var Settings = require('settings');
var transitScreen = require('./transitScreen.js');

var mainScreen = function() {
  var journeyConfig = Settings.option('journeys');
  var items = [];
  for (var i = 0, j = journeyConfig.length; i < j; ++ i) {
    items.push({
      title: journeyConfig[i].name,
      subtitle: journeyConfig[i].from + ' > ' + journeyConfig[i].to
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
    transitScreen(journeyConfig[e.itemIndex]);
  });

  journeys.show();
};

module.exports = mainScreen;
