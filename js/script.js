
// Fonction appelée lors du click du bouton
function start() {
  //On va déclarer city pour la faire passer dans le constructeur surchargé de la classe API_WEATHER
  let city = document.getElementById('city-input').value;
  //Et si la value est '', on la passe en undefined
  if(city === ''){
    city = undefined;
  }
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

  //Appel de la fonction qui affiche les trois jours suivants
  apiWeather
    .getThreeDayForecast()
    .then(function(response){
      //On procède de la même façon que le code donné
      const data = response.data;
      //Pareil : on récup l'info principale
      let jour_suivant = 0;
      data.list.forEach((data, index) => {
        jour_suivant++;
        document.getElementById(`${jour_suivant}-forecast-main`).innerHTML = data.weather[0].main;
        document.getElementById(`${jour_suivant}-forecast-more-info`).innerHTML = data.weather[0].description;
        document.getElementById(`${jour_suivant}-icon-weather-container`).innerHTML = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
        document.getElementById(`${jour_suivant}-forecast-temp`).innerHTML = `${data.temp.day}°C`;

      });
    })
    //Même catch
    .catch(function (error) {
      // Affiche une erreur
      console.error(error);
    });
}

window.onload = start;

