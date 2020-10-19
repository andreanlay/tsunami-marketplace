$(document).ready(function() {
    $('#advance-search-card').hide();
    $('#product-search').hide();
    $('#shop-search').hide();
    $('#asearch-button').hide();

    $('#advance-search').on('click', function(event) {
        event.preventDefault();
        if($('#advance-search-card').is(':visible')) {
            $('#advance-search-card').slideUp('slow');
        } else {
            $('#advance-search-card').slideDown('slow');
        }
    });

    $('#search-type').on('change', function() {
        let selected = $(this).val();
        if(selected == "product") {
            $('#shop-search').hide();
            $('#product-search').fadeIn('slow');
            $('#asearch-button').show();
        } else if(selected == "shop"){
            $('#product-search').hide();
            $('#shop-search').fadeIn('slow');
            $('#asearch-button').show();
        } else {
            $('#shop-search').hide();
            $('#product-search').hide();
            $('#asearch-button').hide();
        }
    });
});