var Settings = require('settings');

// Set a configurable with the open callback
Settings.config(
  { url: 'http://lezuse.herokuapp.com/pebble/1' },
  function(e) {
    console.log('opening configurable');

    // Reset color to red before opening the webview
    Settings.option('color', 'red');
  },
  function(e) {
    console.log('closed configurable');
  }
);


var config = {
  journeys: [
  {name: 'Work > home', from: 'Namesti Miru', to: 'Marjanka', location: 'Praha'},
  {name: 'Home > work', to: 'Namesti Miru', from: 'Marjanka', location: 'Praha'}
  ]
};

Settings.option('journeys', config.journeys);
