
$('.toggle-btn').click(function (e) {
    e.preventDefault();

    $(this).toggleClass('sidebar-open');
    $('.map-container').toggleClass('sidebar-open');

});
