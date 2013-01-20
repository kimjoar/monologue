define([
    'backbone'
  , 'text!modules/status/newStatusView.html'
  , 'hogan'
], function(Backbone, newStatusViewTemplate, hogan) {

    var NewStatusView = Backbone.View.extend({
        template: hogan.compile(newStatusViewTemplate),

        events: {
            "submit form": "addStatus"
        },

        initialize: function(options) {
            this.collection.on("add", this.clearInput, this);
        },

        render: function() {
            this.$el.html(this.template.render());
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
