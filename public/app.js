var Status = function() {};
Status.prototype.add = function(options) {
    $.ajax({
        url: '/statuses',
        type: 'POST',
        dataType: 'json',
        data: { text: options.text },
        success: options.success
    });
};

jQuery(function() {
    var status = new Status();

    $("#new-status").submit(function(e) {
        e.preventDefault();

        status.add({
            text: $(this).find('textarea').val(),
            success: function(data) {
                $("#statuses").append('<li>' + data.text + '</li>');
                $("#new-status textarea").val("");
            }
        });
    });
});
