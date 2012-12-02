define(['backbone'], function(Backbone) {

    var StatusesView = Backbone.View.extend({
        template: '<h2>Monologs</h2>' +
                  '<ul></ul>',

        initialize: function(options) {
            this.collection.on("add", this.appendStatus, this);
        },

        render: function() {
            this.$el.html(this.template);
        },

        appendStatus: function(status) {
            this.$('ul').append('<li>' + status.escape("text") + '</li>');
        }
    });

    return StatusesView;

});
