$('.js-modal-btn').click(function(event) {
    event.preventDefault();
    var modal = $(this).data('modal');
    $('.'+modal).fadeIn('slow');
});

$('.js-modal').click(function(event) {
    $(this).fadeOut('slow');
});

$('.js-modal .js-modal-inner').click(function(event) {
    event.stopPropagation();
});
