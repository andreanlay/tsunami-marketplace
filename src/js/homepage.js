var months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
};

$(document).ready(function() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    $('.flashsale-header').append(`${day} ${months[month]} ${date.getFullYear()}`);

    $("#searchbox").keypress(function(event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        if(code == '13'){
            window.location.href = "../src/product_search.html";
        }
    });
})