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
  this.statuses = options.statuses;

  var add = $.proxy(this.addStatus, this);
  $("#new-status").submit(add);
}
NewStatusView.prototype.addStatus = function(e) {
  e.preventDefault();

  this.statuses.add({
    text: $("#new-status").find('textarea').val(),
    success: function(data) {
      $("#statuses").append('<li>' + data.text + '</li>');
      $("#new-status textarea").val("");
    }
  });
}

jQuery(function() {
    var statuses = new Statuses();
    new NewStatusView({ statuses: statuses });
});
