// Write your JavaScript code.

$(document).ready(function () {
    $('#add-item-button').on('click', addItem());
    $('.done-checkbox').on('click', markDone);

    var postError = (function () {
        var $itemError = $('#add-item-error');
        function erroOnPost(data) {
            var error = data.statusText;
            if (data.responseJSON) {
                var key = Object.keys(data.responseJSON)[0];
                error = data.responseJSON[key];
            }
            $itemError.text(error).show();
        }
        return {
            hide: () => $itemError.hide(),
            onError: erroOnPost
        };
    })();

    function addItem() {
        return function() {
            postError.hide();
            $.post(
                '/ToDo/AddItem',
                {
                    title: $newTitle.val(),
                    dueAt: newDueAt.val()
                },
                () => window.location = '/ToDo'
            ).fail(postError.onError);
        };
    }
    function markDone(ev) {
        //ev.target === checkbox
        ev.target.disable = true;
        postError.hide();
        $.post('/ToDo/MarkDone',
            { id: ev.target.name },
            function () {
                var row = ev.target
                    .parentElement  // td
                    .parentElement; //tr
                row.classList.add('done');
            }
        ).fail(postError.onError);
    }
});