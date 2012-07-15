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

    events.on("status:added", this.appendStatus, this);
    events.on("status:added", this.clearInput, this);

    var add = $.proxy(this.addStatus, this);
    $('#new-status form').submit(add);
};
NewStatusView.prototype.addStatus = function(e) {
    e.preventDefault();

    this.statuses.add($('#new-status textarea').val());
};
NewStatusView.prototype.appendStatus = function(text) {
    $('#statuses ul').append('<li>' + text + '</li>');
};
NewStatusView.prototype.clearInput = function() {
    $('#new-status textarea').val('');
};

$(document).ready(function() {
    var statuses = new Statuses();
    new NewStatusView({ statuses: statuses });
});
