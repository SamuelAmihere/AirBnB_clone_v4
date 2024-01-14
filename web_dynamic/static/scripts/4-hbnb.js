$(document).ready(function() {
    // Request API status
    $.get('http://' + window.location.hostname + ':5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    $.ajax({
        url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
        type: 'POST',
        data: '{}',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            $('SECTION.places').empty(); // Clear existing places

            data.forEach(function (place) {
                const article = `
                    <ARTICLE>
                        <DIV class="title">
                            <H2>${place.name}</H2>
                            <DIV class="price_by_night">
                                ${place.price_by_night}
                            </DIV>
                        </DIV>
                        <DIV class="information">
                            <DIV class="max_guest">
                                <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                                </BR>
                                ${place.max_guest} Guests
                            </DIV>
                            <DIV class="number_rooms">
                                <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                                </BR>
                                ${place.number_rooms} Bedrooms
                            </DIV>
                            <DIV class="number_bathrooms">
                                <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                                </BR>
                                ${place.number_bathrooms} Bathrooms
                            </DIV>
                        </DIV>
                        <DIV class="description">
                            ${place.description.replace(/<owner>.*<\/owner>/, '')}
                        </DIV>
                    </ARTICLE>`;
                $('SECTION.places').append(article);
            });
        }
    });

    const amenityIds = {};

    $('input[type=checkbox]').change(function () {

        const checked = $(this).prop('checked');
        const dataId = $(this).attr('data-id');
        const dataName = $(this).attr('data-name');

        if (checked) {
            amenityIds[dataId] = dataName;
        } else if (!checked) {
            delete amenityIds[dataId];
        }

        obj = Object.values(amenityIds);
        key_len = obj.length;
        h4 = $('div.amenities h4');

        key_len === 0 ? h4.html('&nbsp;') : h4.text(obj.join(', '));

    });
    
$('button').click(function() {
    const amenities = Object.keys(amenityIds);
    const data = JSON.stringify({ amenities });

    $.ajax({
        url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
        type: 'POST',
        data: data,
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            // Clear existing places
            $('SECTION.places').empty(); 

            data.forEach(function (place) {
                const article = `
                    <ARTICLE>
                        <DIV class="title">
                            <H2>${place.name}</H2>
                            <DIV class="price_by_night">
                                ${place.price_by_night}
                            </DIV>
                        </DIV>
                        <DIV class="information">
                            <DIV class="max_guest">
                                <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                                </BR>
                                ${place.max_guest} Guests
                            </DIV>
                            <DIV class="number_rooms">
                                <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                                </BR>
                                ${place.number_rooms} Bedrooms
                            </DIV>
                            <DIV class="number_bathrooms">
                                <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                                </BR>
                                ${place.number_bathrooms} Bathrooms
                            </DIV>
                        </DIV>
                        <DIV class="description">
                            ${place.description.replace(/<owner>.*<\/owner>/, '')}
                        </DIV>
                    </ARTICLE>`;
                $('SECTION.places').append(article);
            });
        }
    });

});
});