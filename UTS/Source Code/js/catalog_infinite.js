var preferred_catalog = JSON.parse(localStorage.getItem('preferred-catalog'));
if(preferred_catalog == "metro") {
    window.location.href = "../src/catalog_metro.html";
}

$(document).ready(function() {
    var suggestion = [
        "Automotive",
        "Books",
        "Beauty",
        "Electronic",
        "Fashion",
        "Food and Drink",
        "Households",
        "Kitchen",
        "Health",
        "Sport",
    ];
    $("#search").autocomplete({
		source: suggestion
    });	
    
    $("#search").keypress(function(event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        if(code == '13'){
            var keyword = $('#search').val();
            if(suggestion.indexOf(keyword) >= 0) {
                keyword = keyword.toLowerCase().replace(/\s/g , "-");
                $('body, html').animate({
                    scrollTop: $("." + keyword).offset().top
                }, 600);
            }
        }
    });
});