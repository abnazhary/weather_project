let dayDateName = document.getElementById("dayDateName");
let dateNumber = document.getElementById("dateNumber");
let dateMonth = document.getElementById("dateMonth");
let dayLocation = document.getElementById("dayLocation");
let dayTemp = document.getElementById("dayTemp");
let dayText = document.getElementById("dayText");
let dayIcon = document.getElementById("dayIcon");
let dayHumditiy = document.getElementById("dayHumditiy");
let dayWind = document.getElementById("dayWind");
let dayWindDir = document.getElementById("dayWindDir");

let searchInput = document.getElementById("search");

let nextDayName = document.getElementsByClassName("nextDayName");
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
let nextMinTemp = document.getElementsByClassName("nextMinTemp");
let nextConditionText = document.getElementsByClassName("nextConditionText");
let nextConditionImg = document.getElementsByClassName("nextConditionImg");

async function getWeatherData(cityName) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`
  );
  let weatherData = await weatherResponse.json();
  return weatherData;
}

function displayDayData(data) {
  let todayDate = new Date();
  dayDateName.innerHTML = todayDate.toLocaleDateString("en-Us", {
    weekday: "long",
  });
  dateNumber.innerHTML = todayDate.getDate();
  dateMonth.innerHTML = todayDate.toLocaleDateString("en-Us", {
    month: "long",
  });
  dayLocation.innerHTML = data.location.name;
  dayTemp.innerHTML = data.current.temp_c + "<span><sup> o </sup>C</span>";
  dayText.innerHTML = data.current.condition.text;
  dayIcon.setAttribute("src", data.current.condition.icon);
  dayHumditiy.innerHTML = data.current.humidity + "%";
  dayWind.innerHTML = data.current.wind_kph + " Km/h";
  dayWindDir.innerHTML = data.current.wind_dir;
}

function displayNextDayData(data) {
  let forecastData = data.forecast.forecastday;

  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c
    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c; + "<span><sup> o </sup>C</span>"
    nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
    nextConditionImg[i].setAttribute(
      "src",
      forecastData[i + 1].day.condition.icon
    );
    nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-Us", {
      weekday: "long",
    });
  }
  // console.log(forecastData);
}

async function startApp(city = "cairo") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.erorr) {
    displayDayData(weatherData);
    displayNextDayData(weatherData);
  }
}

startApp();

searchInput.addEventListener("input", function () {
  startApp(searchInput.value);
});
