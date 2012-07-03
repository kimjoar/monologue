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

    this.status.add({
        text: $("#new-status").find('textarea').val(),
        success: function(data) {
            $("#statuses").append('<li>' + data.text + '</li>');
            $("#new-status textarea").val("");
        }
    });
};

jQuery(function() {
    var status = new Status();
    new StatusView(status);
});
