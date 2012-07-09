var Statuses = function() {};
Statuses.prototype.add = function(options) {
  $.ajax({
    url: '/status',
    type: 'POST',
    dataType: 'json',
    data: { text: options.text },
    success: options.success
  });
}

var NewStatusView = function(options) {
    var statuses = options.statuses;

    $("#new-status").submit(function(e) {
        e.preventDefault();

        statuses.add({
          text: $(this).find('textarea').val(),
          success: function(data) {
            $("#statuses").append('<li>' + data.text + '</li>');
            $("#new-status textarea").val("");
          }
        });
    });
}

jQuery(function() {
    var statuses = new Statuses();
    new NewStatusView({ statuses: statuses });
});
