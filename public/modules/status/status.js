define(['backbone'], function(Backbone) {

    var Status = Backbone.Model.extend({
        url: '/status'
    });

    return Status;

});
