$(document).ready(function() {

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
});