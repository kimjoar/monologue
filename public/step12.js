var events = _.clone(Backbone.Events);

var Statuses = function() {
};
Statuses.prototype.add = function(text) {
    $.ajax({
        url: '/status',
        type: 'POST',
        dataType: 'json',
        data: { text: text },
        success: function(data) {
            events.trigger("status:added", data.text);
        }
    });
};

var NewStatusView = function(options) {
    this.statuses = options.statuses;
    this.el = $('#new-status');

    events.on("status:added", this.clearInput, this);

    var add = $.proxy(this.addStatus, this);
    this.el.find('form').submit(add);
};
NewStatusView.prototype.addStatus = function(e) {
    e.preventDefault();

    this.statuses.add(this.el.find('textarea').val());
};
NewStatusView.prototype.clearInput = function() {
    this.el.find('textarea').val('');
};

var StatusesView = function() {
    this.el = $('#statuses');

    events.on("status:added", this.appendStatus, this);
};
StatusesView.prototype.appendStatus = function(text) {
    this.el.find('ul').append('<li>' + text + '</li>');
};

$(document).ready(function() {
    var statuses = new Statuses();
    new NewStatusView({ statuses: statuses });
    new StatusesView();
});
