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

  Simple.events.on("status:added", this.appendStatus, this);
  Simple.events.on("status:added", this.clearInput, this);

  var add = $.proxy(this.addStatus, this);
  $("#new-status").submit(add);
}
NewStatusView.prototype.addStatus = function(e) {
  e.preventDefault();

  this.statuses.add({
    text: $("#new-status").find('textarea').val(),
    success: function(data) {
      Simple.events.trigger("status:added", data.text);
    }
  });
}
NewStatusView.prototype.appendStatus = function(text) {
    $("#statuses").append('<li>' + data.text + '</li>');
};
NewStatusView.prototype.clearInput = function() {
    $("#new-status textarea").val("");
}

jQuery(function() {
    var statuses = new Statuses();
    new NewStatusView({ statuses: statuses });
});
