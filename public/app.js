var Statuses = function() {};
Statuses.prototype.add = function(options) {
    $.ajax({
        url: '/statuses',
        type: 'POST',
        dataType: 'json',
        data: { text: options.text },
        success: options.success
    });
};

var NewStatusView = function(statuses) {
    this.statuses = statuses;

    Simple.events.on("success", this.appendStatus, this);
    Simple.events.on("success", this.reset, this);

    var add = $.proxy(this.addStatus, this);
    $("#new-status").submit(add);
};
NewStatusView.prototype.addStatus = function(e) {
    e.preventDefault();

    this.statuses.add({
        text: this.text(),
        success: function(data) {
            Simple.events.trigger("success", data.text);
        }
    });
};
NewStatusView.prototype.text = function() {
    return $("#new-status").find('textarea').val();
};
NewStatusView.prototype.reset = function() {
    $("#new-status textarea").val("");
};
NewStatusView.prototype.appendStatus = function(text) {
    $("#statuses").append('<li>' + text + '</li>');
};

jQuery(function() {
    var statuses = new Statuses();
    new NewStatusView(statuses);
});
