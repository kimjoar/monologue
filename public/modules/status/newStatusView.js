define(['backbone'], function(Backbone) {

    var NewStatusView = Backbone.View.extend({
        template: '<h2>New monolog</h2>' +
                  '<form>' +
                  '  <textarea></textarea><br>' +
                  '  <input type="submit" value="Post"/>' +
                  '</form>',

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
