$(document).ready(function() {
    var suggestion = [
        "Books",
        "Beauty",
        "Electronic",
        "Fashion",
        "Kitchen"
    ];
    $("#search").autocomplete({
		source: suggestion
    });	
    
    $("#search").keypress(function(event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        if(code == '13'){
            var keyword = $('#search').val();
            if(suggestion.indexOf(keyword) >= 0) {
                keyword = keyword.toLowerCase();
                $('body, html').animate({
                    scrollTop: $("." + keyword).offset().top
                }, 600);
            }
        }
    });
});