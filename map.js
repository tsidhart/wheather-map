const container = document.getElementById("container");
let locations = [
  { lat: 51.5074, lon: 0.1278},
  { lat: 47.6762, lon: -122.3182 }
]

// this is triggered when user clicks the button, starting place for all the fun stuff!
function seattle() {
  container.className = 'img-seattle';
  document.getElementById('listContainer').innerHTML = '';
  getLocation(locations[1]);
}

function london() {
  container.className = 'img-london';
  document.getElementById('listContainer').innerHTML = '';
  getLocation(locations[0]);
}

function myweather(){
  container.className = 'img-location';
  document.getElementById('listContainer').innerHTML = '';
  // get user's location from the browser
  navigator.geolocation.getCurrentPosition(function(position) {
    getLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
  });
}

// API call onload callback function
function onloadFunc(){
  const resp = JSON.parse(this.response);
  printListItem(resp.weather[0].description);
}

// API call onerror callback function
function onerrorFunc(){
  // print an error message to page
   printListItem("Sorry, an error occurred");
}

// helper method to call API and convert longitude & latitude to a human friendly address
function getLocation(locObj){
  let mapUri = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${locObj.lat}&lon=${locObj.lon}&appid=6d7ff89080bcc9640e4d9e7ff6588847`;
  // new request object- open, define callbacks, send
  let request = new XMLHttpRequest();
  request.open("GET", mapUri, true);
  request.onload = onloadFunc;
  request.onerror = onerrorFunc;
  request.send();
}

// helper function to print message to page
function printListItem(message){
  let li = document.createElement("li");
  li.innerHTML = message;
  document.getElementById("listContainer").appendChild(li);
}
