$(document).ready(function() {
    var theme = JSON.parse(localStorage.getItem('theme'));
    if(theme == 'dark') {
        $('body').attr('data-theme', 'dark');
    }
})