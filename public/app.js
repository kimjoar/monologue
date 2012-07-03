jQuery(function() {
    $("#new-status").submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '/statuses',
            type: 'POST',
            dataType: 'json',
            data: { text: $(this).find('textarea').val() },
            success: function(data) {
                $("#statuses").append('<li>' + data.text + '</li>');
                $("#new-status textarea").val("");
            }
        });
    });
});
