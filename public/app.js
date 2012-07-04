var Statuses = function() {};
Statuses.prototype.add = function(options) {
    $.ajax({
        url: '/statuses',
        type: 'POST',
        dataType: 'json',
        data: { text: options.text },
        success: options.success
    });
};

var NewStatusView = Simple.View.extend({
    events: {
        "submit": "addStatus"
    },

    initialize: function(options) {
        this.el = options.el;
        this.statuses = options.statuses;

        Simple.events.on("success", this.reset, this);
    },

    addStatus: function(e) {
        e.preventDefault();

        this.statuses.add({
            text: this.text(),
            success: function(data) {
                Simple.events.trigger("success", data.text);
            }
        });
    },

    text: function() {
        return this.DOM('textarea').val();
    },

    reset: function() {
        this.DOM('textarea').val("");
    }
});

var StatusesView = Simple.View.extend({
    initialize: function(options) {
        this.el = options.el;
        this.statuses = options.statuses;

        Simple.events.on("success", this.appendStatus, this);
    },

    appendStatus: function(text) {
        this.el.append('<li>' + text + '</li>');
    }
});

jQuery(function() {
    var statuses = new Statuses();
    new NewStatusView({ el: $("#new-status"), statuses: statuses });
    new StatusesView({ el: $("#statuses"), statuses: statuses });
});
