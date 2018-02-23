
function initMap(){

  //pszyciski
  $(document).ready(function(){
    $('#searchBtn').on('click',oblicz);
    $('#reverseBtn').on('click', back);
    $('#option1').on('click',wl);
    $('#option2').on('click',wl);
    $('#showMenuBtn').on('click',showAndHideMenu);
  });

// opcje mapy
var options = {
  zoom:10,
  center:{lat:53.505926,lng:22.587874},
  componentRestrictions: {country: "PL"},
  origin: '',
  destination: '',
  provideRouteAlternatives: false,
  travelMode: 'DRIVING',
}

var map = new google.maps.Map( document.getElementById('map'), options);

//Autocomplete
var input = document.getElementById('od');
var autocomplete = new google.maps.places.Autocomplete(input, options);
var input2 = document.getElementById('do');
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);


var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);
var directionsService = new google.maps.DirectionsService();

//oblicznie Odlegości i ceny
function oblicz(){

  //wyl. wl. bloków
  document.getElementById("secondMenu").style.display = "block";
  document.getElementById("firstMenu").style.display = "none";
  document.getElementById("reverseBtn").style.display = "block";
  document.getElementById("searchBtn").style.display = "none";

  //zmienne dotyczące miejsca gdzie będzie zapisywany wynik
  var txt = document.getElementById('info');
  var txt2 = document.getElementById('info2');

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
    //w jedną stronę
    if ( status == google.maps.DirectionsStatus.OK && document.getElementById("option1").checked == true) {
      directionsDisplay.setDirections(response);
      var odleglosc =  parseInt(response.routes[0].legs[0].distance.value)/1000;
      var cenaOgolna = odleglosc*litryNaKilomert/100*cenaZaLitr;
      var wynik = cenaOgolna.toFixed(2);//zaokrąglanie
      var rOdleglosc= odleglosc.toFixed(2);
      txt.innerHTML ="Koszt: "+wynik+"zł";
      txt2.innerHTML ="Odlegość: "+rOdleglosc+"KM";
    }

    //w dwie strony
    else if ( status == google.maps.DirectionsStatus.OK && document.getElementById("option2").checked == true){
      directionsDisplay.setDirections(response);
      var odleglosc =  parseInt(response.routes[0].legs[0].distance.value)/500;
      var cenaOgolna = odleglosc*litryNaKilomert/100*cenaZaLitr;
      var wynik = cenaOgolna.toFixed(2);//zaokrąglanie
      var rOdleglosc= odleglosc.toFixed(2);
      txt.innerHTML ="Koszt: "+wynik+"zł";
      txt2.innerHTML ="Odlegość: "+rOdleglosc+"KM";
    }
    else {
      txt.innerHTML ="Oj! Spróbój jescze raz";
      txt2.innerHTML ="Oj! Spróbój jescze raz";;
    }
  });
}

//funkcja cofająca do poprzedniego menu
function back(){
  document.getElementById("firstMenu").style.display = "block";
  document.getElementById("secondMenu").style.display = "none";
  document.getElementById("searchBtn").style.display = "block";
  document.getElementById("reverseBtn").style.display = "none";
  directionDisplay.setMap(null);
}
}

//zmina kolorków przy wyborze w ile stron
function wl(){
if (document.getElementById("option1").checked == true){
  document.getElementById("option1Txt").style.color = "#212529";
  document.getElementById("option2Txt").style.color = "#fff";
}
if (document.getElementById("option2").checked == true){
  document.getElementById("option2Txt").style.color = "#212529";
  document.getElementById("option1Txt").style.color = "#fff";
}
}

// chowanie i pokazywanie meny
function showAndHideMenu(){
  var menu =document.getElementById("menu");
  var searchBtn =document.getElementById("searchBtn");
  var reverseBtn =document.getElementById("reverseBtn");
  var btn = document.getElementById("showMenuBtnAnim");

  if(menu.classList.contains('hiddenMenu')){
    menu.classList.remove('hiddenMenu');
    btn.style.transform = "rotateX(0deg)"//animacja pszycisku
    searchBtn.classList.remove('hiddenMenu');
    reverseBtn.classList.remove('hiddenMenu');

  }
  else{
    menu.classList.add('hiddenMenu');
    btn.style.transform = "rotateX(180deg)"//animacja pzycisku
    searchBtn.classList.add('hiddenMenu');
    reverseBtn.classList.add('hiddenMenu');
  }
}
