var Statuses = function() {};
Statuses.prototype.add = function(text) {
  $.ajax({
    url: '/status',
    type: 'POST',
    dataType: 'json',
    data: { text: text },
    success: function(data) {
      Simple.events.trigger("status:added", data.text);
    }
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

  this.statuses.add($("#new-status").find('textarea').val());
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
