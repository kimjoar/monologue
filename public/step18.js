var events = _.clone(Backbone.Events);

var Status = Backbone.Model.extend({
    url: '/status'
});

var Statuses = function() {
};
Statuses.prototype.add = function(text) {
    var status = new Status();
    status.save({ text: text }, {
        success: function(model, data) {
            events.trigger("status:added", data.text);
        }
    });
};

var NewStatusView = Backbone.View.extend({
    initialize: function(options) {
        this.statuses = options.statuses;

        events.on("status:added", this.clearInput, this);

        var add = $.proxy(this.addStatus, this);
        this.$('form').submit(add);
    },

    addStatus: function(e) {
        e.preventDefault();

        this.statuses.add(this.$('textarea').val());
    },

    clearInput: function() {
        this.$('textarea').val('');
    }
});

var StatusesView = Backbone.View.extend({
    initialize: function(options) {
        events.on("status:added", this.appendStatus, this);
    },

    appendStatus: function(text) {
        this.$('ul').append('<li>' + text + '</li>');
    }
});

$(document).ready(function() {
    var statuses = new Statuses();
    new NewStatusView({ el: $('#new-status'), statuses: statuses });
    new StatusesView({ el: $('#statuses') });
});
