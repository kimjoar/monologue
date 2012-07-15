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

var NewStatusView = function(options) {
    var statuses = options.statuses;

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
};

$(document).ready(function() {
    var statuses = new Statuses();
    new NewStatusView({ statuses: statuses });
});
