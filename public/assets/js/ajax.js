/**
 * Ajax request
 *
 */
$.ajax({
    url: 'https://catkittycat.com/wp-json/wp/v2/cats-api' + urlQuery,
    async: true,
    dataType: 'json',
    type: 'GET'
})
    .done(function (data) {

            // push the returned data into initialLocations array
            for (var i in data) {
                initialLocations.push(data[i]);
            }

            initMap();
            initViewModel();

        }
    )
    .fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });