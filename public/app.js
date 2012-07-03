function addStatus(options) {
    $.ajax({
        url: '/statuses',
        type: 'POST',
        dataType: 'json',
        data: { text: options.text },
        success: options.success
    });
}

jQuery(function() {
    $("#new-status").submit(function(e) {
        e.preventDefault();

        addStatus({
            text: $(this).find('textarea').val(),
            success: function(data) {
                $("#statuses").append('<li>' + data.text + '</li>');
                $("#new-status textarea").val("");
            }
        });
    });
});
