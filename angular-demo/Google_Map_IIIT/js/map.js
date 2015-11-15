//
// Gachibowli
// Hyderabad, Telangana
// 17.446118, 78.348741
// 
var map;
var infoWindow;

// var Nilgiri_list = function call here ()
var Nilgiri_list = ['Quiz','Debate']

var markersData = [
   {
      lat: 17.447347, 
      lng: 78.348785,
      name: "Nilgiri",
      data: Nilgiri_list
   } 
];

// for (var i = 0; i < data.length; i++) {

//     markers.push(marker);

// }

function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(17.446118, 78.348741),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   infoWindow = new google.maps.InfoWindow();

   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);


function displayMarkers(){

   var bounds = new google.maps.LatLngBounds();
   
   for (var i = 0; i < markersData.length; i++)
   {

         var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);   
         var name = markersData[i].name;
         var data_map =  markersData[i].data;
         createMarker(latlng, name, data_map);

         bounds.extend(latlng);  
   }

   map.fitBounds(bounds);
}

function createMarker(latlng, name, data_map){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name,
      tile2:  data_map,
      // icon: markerIcon,
      animation: google.maps.Animation.DROP
   });

   google.maps.event.addListener(marker, 'click', function() {
      var flag = 1;
      var iwContent = '<div class="mylabel">' + name + "</br>"+ data_map + 
         '</div>';
      
      infoWindow.setContent(iwContent);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      infoWindow.open(map, marker);
   });

   google.maps.event.addListener(infoWindow,'closeclick',function() {
        marker.setAnimation(google.maps.Animation.DROP);
    });
}