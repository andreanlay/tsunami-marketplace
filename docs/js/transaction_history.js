$(document).ready(function() {
    function setRating() {
        return $('#star-rating .fa').each(function() {
            if(parseInt($('#star-rating .fa').siblings('.rating-value').val()) >= parseInt($(this).data('rating'))){
                return $(this).removeClass('fa-star-o').addClass('fa-star');
            }else{
                return $(this).removeClass('fa-star').addClass('fa-star-o');
            }
        })
    }

    $('#star-rating .fa').on('click', function() {
        $('#star-rating .fa').siblings('.rating-value')
                .val($(this).data('rating'));
        return setRating();
    });
    setRating();
});