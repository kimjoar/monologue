var Status = function() {};
Status.prototype.add = function(options) {
    $.ajax({
        url: '/statuses',
        type: 'POST',
        dataType: 'json',
        data: { text: options.text },
        success: options.success
    });
};

var StatusView = function(status) {
    this.status = status;

    var add = $.proxy(this.addStatus, this);
    $("#new-status").submit(add);
};
StatusView.prototype.addStatus = function(e) {
    e.preventDefault();

    var that = this;
    this.status.add({
        text: $("#new-status").find('textarea').val(),
        success: function(data) {
            that.appendStatus(data.text);
            that.reset();
        }
    });
};
StatusView.prototype.reset = function() {
    $("#new-status textarea").val("");
};
StatusView.prototype.appendStatus = function(text) {
    $("#statuses").append('<li>' + text + '</li>');
};

jQuery(function() {
    var status = new Status();
    new StatusView(status);
});
