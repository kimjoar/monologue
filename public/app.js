var Status = Simple.Model.extend({
    url: '/status'
});

var Statuses = Simple.Model.extend({
    add: function(text) {
        var status = new Status({ text: text });
        var that = this;
        status.save({
            success: function(data) {
                that.trigger("added", data.text);
            }
        });
    }
});

var NewStatusView = Simple.View.extend({
    events: {
        "submit": "addStatus"
    },

    initialize: function(options) {
        this.statuses = options.statuses;
        this.statuses.on("added", this.reset, this);
    },

    addStatus: function(e) {
        e.preventDefault();
        this.statuses.add(this.text());
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
        this.statuses = options.statuses;
        this.statuses.on("added", this.appendStatus, this);
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
