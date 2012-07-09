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

var NewStatusView = Simple.View.extend({
  initialize: function(options) {
    this.statuses = options.statuses;
    this.el = options.el;

    Simple.events.on("status:added", this.clearInput, this);

    var add = $.proxy(this.addStatus, this);
    this.el.submit(add);
  }
});
NewStatusView.prototype.addStatus = function(e) {
  e.preventDefault();

  this.statuses.add(this.el.find('textarea').val());
}
NewStatusView.prototype.clearInput = function() {
    this.el.find("textarea").val("");
}

var StatusesView = function(options) {
  this.statuses = options.statuses;
  this.el = options.el;

  Simple.events.on("status:added", this.appendStatus, this);
}
StatusesView.prototype.appendStatus = function(text) {
    this.el.append('<li>' + data.text + '</li>');
};

jQuery(function() {
    var statuses = new Statuses();
    new NewStatusView({ el: $("#new-status"), statuses: statuses });
    new StatusesView({ el: $("#statuses"), statuses: statuses });
});
