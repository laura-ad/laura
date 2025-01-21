var watchId;
var mapa = null;
var mapaMarcador = null;  

if (navigator.geolocation) {
  watchId = navigator.geolocation.watchPosition(mostrarPosicion, mostrarErrores, opciones); 
} else {
  alert("Tu navegador no soporta la geolocalización, actualiza tu navegador.");
}

function mostrarPosicion(posicion) {
  var latitud = posicion.coords.latitude;
  var longitud = posicion.coords.longitude;
  var precision = posicion.coords.accuracy;

  var miPosicion = new google.maps.LatLng(latitud, longitud);

  if (mapa == null) {
    var configuracion = {center: miPosicion, zoom: 16, mapTypeId: google.maps.MapTypeId.HYBRID};
    mapa = new google.maps.Map(document.getElementById("mapa"), configuracion);

    mapaMarcador = new google.maps.Marker({position: miPosicion, title:"Esta es tu posición"});
    mapaMarcador.setMap(mapa);
  } else {
    mapa.panTo(miPosicion);
    mapaMarcador.setPosition(miPosicion);
  }
}

function mostrarErrores(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
        alert('Permiso denegado por el usuario'); 
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Posición no disponible');
        break; 
      case error.TIMEOUT:
          alert('Tiempo de espera agotado');
          break;
        default:
          alert('Error de Geolocalización desconocido :' + error.code);
  }
}

var opciones = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 1000
};

function detener() {
  navigator.geolocation.clearWatch(watchId);
}