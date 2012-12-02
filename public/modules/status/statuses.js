define(['backbone', 'modules/status/status'], function(Backbone, Status) {

    var Statuses = Backbone.Collection.extend({
        model: Status
    });

    return Statuses;

});
