define(['backbone'], function(Backbone) {

    var StatusesView = Backbone.View.extend({
        initialize: function(options) {
            this.collection.on("add", this.appendStatus, this);
        },

        appendStatus: function(status) {
            this.$('ul').append('<li>' + status.escape("text") + '</li>');
        }
    });

    return StatusesView;

});
