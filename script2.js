
function initMap(){


  //pszyciski
  $(document).ready(function(){
    $('#elo').on('click',oblicz);
    $('#el').on('click', back);
  });

// opcje mapy
var options = {
  zoom:10,
  center:{lat:53.505926,lng:22.587874},
  componentRestrictions: {country: "PL"},
  origin: 'Chicago, IL',
  destination: 'Los Angeles, CA',
  provideRouteAlternatives: false,
  travelMode: 'DRIVING',
  drivingOptions: {
    departureTime: new Date(/* now, or future date */),
    trafficModel: 'pessimistic'
  }
}

var map = new google.maps.Map( document.getElementById('map'), options);
//Autocomplete
var input = document.getElementById('od');
var autocomplete = new google.maps.places.Autocomplete(input, options);
var input2 = document.getElementById('do');
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
//oblicznie Odlegości i ceny
function oblicz(){
  //wyl. wl. bloków
  document.getElementById("hidden").style.display = "block";
  document.getElementById("nhidden").style.display = "none";
  //zmienne dotyczące miejsca gdzie będzie zapisywany wynik
  var txt = document.getElementById('info');
  var txt2 = document.getElementById('info2');
  //tworzenie obietu google api do oblicznia odleglosci
  var directionsService = new google.maps.DirectionsService();
  //zmienne wpisywanie w inputach
  var od = document.getElementById('od').value;
  var doo = document.getElementById('do').value;
  var cenaZaLitr = parseInt(document.getElementById('cena').value);
  var litryNaKilomert = parseInt(document.getElementById('litry').value);
  //podstwaowe opcje jak początek cel i rodzaj podruży
  var request = {
    origin      : '',
    destination : '',
    travelMode  : google.maps.DirectionsTravelMode.DRIVING,
  };
  //podstwaianie wpisanych danych ze zmiennych do obiektu
  request.origin = od;
  request.destination = doo;
  //funkcja obliczająca odlegość i cene paliwa
  directionsService.route(request, function(response, status) {
    if ( status == google.maps.DirectionsStatus.OK && document.getElementById("op1").checked == true) {
      var odleglosc =  parseInt(response.routes[0].legs[0].distance.value)/1000;
      var cenaOgolna = odleglosc*litryNaKilomert/100*cenaZaLitr;
      var wynik = cenaOgolna.toFixed(2);//zaokrąglanie
      var rOdleglosc= odleglosc.toFixed(2);
      txt.innerHTML ="Koszt w jedną stronę wyniesie: "+wynik+"zł";
      txt2.innerHTML ="Odlegość w jedną stronę wyniesie: "+rOdleglosc+"KM";
    }
    else if ( status == google.maps.DirectionsStatus.OK && document.getElementById("op2").checked == true){
      var odleglosc =  parseInt(response.routes[0].legs[0].distance.value)/500;
      var cenaOgolna = odleglosc*litryNaKilomert/100*cenaZaLitr;
      var wynik = cenaOgolna.toFixed(2);//zaokrąglanie
      var rOdleglosc= odleglosc.toFixed(2);
      txt.innerHTML ="Koszt w dwie strony wyniesie: "+wynik+"zł";
      txt2.innerHTML ="Odlegość w dwie strony wyniesie: "+rOdleglosc+"KM";
    }
    else {
      alert("spróbój jescze raz");
    }
  });
}
//funkcja cofająca do poprzedniego menu
function back(){
  document.getElementById("nhidden").style.display = "block";
  document.getElementById("hidden").style.display = "none";
}
}

// function hui(){
//   if (document.getElementById("op1").checked == true) {
//         alert("You have selected Option 1");
//     }
//   else  if (document.getElementById("op2").checked == true) {
//           alert("You have selected Option 2");
//       }
// }
