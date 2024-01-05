// Django With ajax to fetch the data

$("#submit-form").submit(function (event) {
  $("#loading").show();
  $("#weather").empty();
  var formData = {
    csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
    city: $('input[name="input-city"]').val(),
  };
  $.ajax({
    type: "POST",
    url: "",
    data: formData,
    encode: true,
  }).done(function (data) {
    var data = JSON.parse(data);
    $("#weather").empty();
    $("#loading").hide();

    if (data["status"] == "success") {
      mystr = `
                        <p class="text-center city-name m-0"><b>${data["city"]}, ${data["country"]}</b></p>
                        <p class="text-center date-time"><b><i>${data["date_time"]}</i></b></p>
                        <div class="temp-details d-flex justify-content-evenly align-items-center">
                            <div class="temp-div d-flex flex-column align-items-center">
                                <p class="temp">${data["temp"]}&#8451;</p>
                                <p>${data["temp_F"]}&#8457;</p>
                                <p>${data["description"]}</p>
                            </div>
                            <div class="temp-extra">
                                <p>Humidity: <span>${data["humidity"]}%</span></p>
                                <p>Feels like: ${data["feels_like"]}<span>&#8451;</span></p>
                                <p>Wind: <span>${data["wind"]}km/h</span></p>
                                <p>Visibility: <span>${data["visibility"]}km</span></p>
                            </div>
                        </div>  `;

      $("#weather").append(mystr);
    } else if (data["status"] == "notfound") {
      mystr = `<p class="text-center error-msg">Not Found!</p>`;
      $("#weather").append(mystr);
    } else {
      mystr = `<p class="text-center error-msg">Something went wrong!</p>`;
      $("#weather").append(mystr);
    }
  });

  event.preventDefault();
});
