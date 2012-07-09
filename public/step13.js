var Status = Simple.Model.extend({
    url: '/status'
});

var Statuses = function() {};
Statuses.prototype.add = function(text) {
  var status = new Status({ text: text });
  status.save({
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
  },

  addStatus: function(e) {
    e.preventDefault();

    this.statuses.add(this.el.find('textarea').val());
  },

  clearInput: function() {
    this.el.find("textarea").val("");
  }
});

var StatusesView = Simple.View.extend({
  initialize: function(options) {
    this.statuses = options.statuses;
    this.el = options.el;

    Simple.events.on("status:added", this.appendStatus, this);
  },

  appendStatus: function(text) {
    this.el.append('<li>' + data.text + '</li>');
  }
});

jQuery(function() {
    var statuses = new Statuses();
    new NewStatusView({ el: $("#new-status"), statuses: statuses });
    new StatusesView({ el: $("#statuses"), statuses: statuses });
});
