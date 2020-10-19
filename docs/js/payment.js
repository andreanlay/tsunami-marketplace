$(document).ready(function() {
    $('.payments div').filter('#form-creditcard-payment').fadeIn(400).siblings('div').hide();
    $('#checkout-p2').hide();

    $('#payment-selector').on('change', function() {
        let id = $(this).find(':selected').attr('id');
        $('.payments div').filter('#form-' + id).fadeIn(400).siblings('div').hide();
    });

    $('#btn-next').on('click', function() {
        $('body div').filter('#checkout-p2').fadeIn(500).siblings('div').hide();
    });

    $('#btn-previous').on('click', function() {
        $('body div').filter('#checkout-p1').fadeIn(500).siblings('div').hide();
    })
});