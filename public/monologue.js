requirejs.config({
    paths: {
        'jquery': 'vendor/jquery-1.8.3',
        'underscore': 'vendor/underscore-1.4.2',
        'backbone': 'vendor/backbone-0.9.2'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', 'modules/status/status'], function($, Backbone, Status) {

    var Statuses = Backbone.Collection.extend({
        model: Status
    });

    var NewStatusView = Backbone.View.extend({
        events: {
            "submit form": "addStatus"
        },

        initialize: function(options) {
            this.collection.on("add", this.clearInput, this);
        },

        addStatus: function(e) {
            e.preventDefault();

            this.collection.create({ text: this.$('textarea').val() });
        },

        clearInput: function() {
            this.$('textarea').val('');
        }
    });

    var StatusesView = Backbone.View.extend({
        initialize: function(options) {
            this.collection.on("add", this.appendStatus, this);
        },

        appendStatus: function(status) {
            this.$('ul').append('<li>' + status.escape("text") + '</li>');
        }
    });

    $(document).ready(function() {
        var statuses = new Statuses();
        new NewStatusView({ el: $('#new-status'), collection: statuses });
        new StatusesView({ el: $('#statuses'), collection: statuses });
    });

});
