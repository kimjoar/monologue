var Statuses = function() {
};
Statuses.prototype.add = function(options) {
    $.ajax({
        url: '/status',
        type: 'POST',
        dataType: 'json',
        data: { text: options.text },
        success: options.success
    });
};

$(document).ready(function() {
    var statuses = new Statuses();

    $('#new-status form').submit(function(e) {
        e.preventDefault();

        statuses.add({
            text: $('#new-status textarea').val(),
            success: function(data) {
                $('#statuses ul').append('<li>' + data.text + '</li>');
                $('#new-status textarea').val('');
            }
        });
    });
});
