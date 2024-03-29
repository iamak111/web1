// Carousel Slide Script
$(document).ready(function () {
    $('#carouselExampleIndicators').carousel({
        interval: 4000
    });

    var clickEvent = false;

    $('#carouselExampleIndicators')
        .on('click', '.nav a', function () {
            clickEvent = true;
            $('.nav li').removeClass('active');
            $(this).parent().addClass('active');
        })
        .on('slid.bs.carousel', function (e) {
            if (!clickEvent) {
                var count = $('.nav').children().length - 1;
                var current = $('.nav li.active');
                current.removeClass('active').next().addClass('active');
                var id = parseInt(current.data('bs-slide-to'));
                if (count == id) {
                    $('.nav li').first().addClass('active');
                }
            }
            clickEvent = false;
        });
});
