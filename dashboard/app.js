function loadDate() {
  var currentDate = new Date();
  var dateString = currentDate.toString()
                     .split(" ")
                     .splice(0, 4)
                     .join(" ");

  $("#date").text(dateString);
}

function loadWeather() {
  var weather = $("#weather");
  var url = "https://api.forecast.io/forecast/";
  var apiKey = "9aa3549b0118020c9eaef42e79d09af6";

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
      weather.text("Based on your current location, it is " + data.currently.temperature + "° F right now");
    });
  }

  function error() {
    alert("Unable to retrieve your location for weather");
  }

  navigator.geolocation.getCurrentPosition(success, error);

  weather.text("fetching weather...");
}

function loadNews() {
  var news = $("#news");
  var url = "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=";
  var apiKey = "d9903836bbca401a856602f403802521";

  $.getJSON(url + apiKey, function(data) {
    var titles = data.articles.map(function(articles) {
      return "<a href='" + articles.url + "'>" + articles.title + "</a>";
    });

    news.html(titles.join("<br><br>"));
  });

  news.text("fetching news...");
}

function loadshoes() {
  var shoes = $("#shoes");
  var url = "https://shoe-catalogue-api-codex.herokuapp.com/api/shoes";

  $.getJSON(url, function(data) {
    drawTable(data);
  });

function drawTable(data) {
  
    $("#shoes").append("<table>")
    $("#shoes").append($("<tr> <th>Brand</th> <th>Color</th> <th>Size</th> <th>Price</th> <th>in stock </th> </tr>"));
    
    var rows = [];

    for (var i = 0; i < data.length; i++) {
        rows.push(drawRow(data[i]));
    }
 
    $("#shoes").append(rows);
    $("#shoes").append("</table");
}

function drawRow(rowData) {
    var row = $("<tr />")
    row.append($("<td>" + rowData.brand + "</td>")); 
    row.append($("<td>" + rowData.color + "</td>"));
    row.append($("<td>" + rowData.size + "</td>"));
    row.append($("<td>" + rowData.price + "</td>"));
    row.append($("<td>" + rowData.in_stock + "</td>"));
    
    return row;
}
}

// loadDate();
// loadWeather();
// loadNews();
loadshoes();