define(['backbone', 'text!modules/status/statusesTemplate.html'], function(Backbone, statusesTemplate) {

    var StatusesView = Backbone.View.extend({
        template: statusesTemplate,

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
