// Creating a clockDisplay
function renderTime() {
  let mydate = new Date();
  let year = mydate.getYear();
      if(year < 1000) {
        year += 1900
      }
  let day = mydate.getDay();
  let month = mydate.getMonth();
  let daym = mydate.getDate();
  let dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday","Thursday" ,"Friday", "Saturday");
  let montharray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

  let currentTime = new Date();
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();

      if(h == 24){
        h = 0;
      } else if(h > 12){
        h = h - 0;
      }

      if(h < 10){
        h = "0" + h
      }

      if(m < 10){
        m = "0" + m;
      }

      let myClock = document.getElementById('clockDisplay');
      myClock.innerHTML = "<div>"+ "Time: " +h+ ':' +m + "<br>" +dayarray[day]+ ' ' +daym+ ' ' +montharray[month]+ " " +year+ "</div>";
      setTimeout("renderTime()", 1000);
}
//Creating a map mark for positioning of ISS
function locationmark() {
  let longlat = document.getElementById('location');
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const locAPI = `${proxy}http://api.open-notify.org/iss-now.json`;

  fetch(locAPI)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      longlat.innerHTML = "<div class='location'>" + "ISS is now located at: <br>longitude: " + data.iss_position.latitude + '° <br>' + " latitude: " + data.iss_position.longitude +'°' + "</div>";
    })

  setTimeout("locationmark()", 5000);
}
//Creating world map with google maps API
function initMap() {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const locAPI = `${proxy}http://api.open-notify.org/iss-now.json`;

  fetch(locAPI)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      var myLatLng = {lat: parseFloat(data.iss_position.latitude), lng:  parseFloat(data.iss_position.longitude)};
//Parse float for correct work of type "number"

  console.log(myLatLng);
  var map = new google.maps.Map(document.getElementById('marker'), {
    zoom: 4,
    center: myLatLng,
    mapTypeId: 'satellite'
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
})
  setTimeout("initMap()", 5000);
}
// Creating OnLive Crew List
function crewinfo() {
  let humans = document.getElementById('sidebar');
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const crewAPI = `${proxy}http://api.open-notify.org/astros.json`;

  fetch(crewAPI)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      humans.innerHTML = "Total amount : " + data.number + " people in space <br>";
      for (let i = 0; i <= data.people.length-1; i++) {
        humans.innerHTML += "<br>" + "<div class='People'> " + data.people[i].name + "</div>";
      }
    })
  setTimeout("crewinfo()", 5000);
}
