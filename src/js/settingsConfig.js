var Settings = require('settings');

Settings.config(
  { url: 'https://pebble-transit.herokuapp.com/' },
  function(e) {
  },
  function(e) {
    if (!e.failed && e.options) {
      Settings.option('journeys', e.options.journeys);
    } else {
      console.log('Save failed');
    }
  }
);
