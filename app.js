var showIp = document.querySelector('.ip');
var showLocation = document.querySelector('.location');
var showTimezone = document.querySelector('.timezone');
var showIsp = document.querySelector('.isp');

var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var mapIcon = L.icon({
   iconUrl: './assets/map-icon.svg',
   iconSize: [50, 120],
   popupAnchor: [-3, -76]
});

L.tileLayer(
   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
   {
      attribution:
         'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 14,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
         'pk.eyJ1IjoidmlyZW5zdXRoYXIiLCJhIjoiY2tpMXQweGFzMHhqdjJzcWs3YTJpMnlpNiJ9.qQiXHJ_UDHtzmYNnHPlF1Q'
   }
).addTo(mymap);

var marker = L.marker([51.5, -0.09], { icon: mapIcon }).addTo(mymap);

var ip = document.getElementById('ip_input').value;
var api_key = 'at_vCIdFcqWNrKfQITJPjEvEFa2yltAX';

let endpoint = `https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ip}`;

fetch(endpoint)
   .then((response) => response.json())
   .then((data) => {
      console.log(data);
      showIp.innerHTML = data.ip;
      showLocation.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;

      showTimezone.innerHTML = `UTC ${data.location.timezone}`;
      showIsp.innerHTML = data.isp;

      mymap.setView([data.location.lat, data.location.lng], 13);
      marker.setLatLng([data.location.lat, data.location.lng]);
   })
   .catch((err) => console.log(err));
