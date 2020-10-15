$(document).ready(function() {
    var theme = JSON.parse(localStorage.getItem('theme'));
    if(theme == 'dark') {
        $('body').attr('data-theme', 'dark');
        if($('#darkmode-switch').length) {
            $('#darkmode-switch').click();
        }
    }
    $('#darkmode-switch').on('change', function() {
        if($(this).is(':checked')) {
            localStorage.setItem('theme', JSON.stringify('dark'));
            $('body').attr('data-theme', 'dark');
        } else {
            localStorage.removeItem('theme');
            $('body').removeAttr('data-theme');
        }
    });
})