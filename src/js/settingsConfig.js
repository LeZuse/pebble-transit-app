var Settings = require('settings');

// Set a configurable with the open callback
Settings.config(
  { url: 'https://pebble-transit.herokuapp.com/' },
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
  {name: 'Work > home', from: 'Italska 10', to: 'Liborova 14', location: 'Praha'},
  {name: 'Home > work', to: 'Italska 10', from: 'Liborova 14', location: 'Praha'}
  ]
};

Settings.option('journeys', config.journeys);
