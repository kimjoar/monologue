define(['backbone', 'text!modules/status/newStatusView.html'], function(Backbone, newStatusViewTemplate) {

    var NewStatusView = Backbone.View.extend({
        template: newStatusViewTemplate,

        events: {
            "submit form": "addStatus"
        },

        initialize: function(options) {
            this.collection.on("add", this.clearInput, this);
        },

        render: function() {
            this.$el.html(this.template);
        },

        addStatus: function(e) {
            e.preventDefault();

            this.collection.create({ text: this.$('textarea').val() });
        },

        clearInput: function() {
            this.$('textarea').val('');
        }
    });

    return NewStatusView;

});
