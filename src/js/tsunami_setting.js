$(document).ready(function() {
    var theme = JSON.parse(localStorage.getItem('theme'));
    if(theme == 'dark') {
        $('body').attr('data-theme', 'dark');
        $('#darkmode-switch').click();
    }
    var catalog = JSON.parse(localStorage.getItem('preferred-catalog'));
    if(catalog == 'metro') {
        $('#metrocatalog-switch').click();
    }
    var dynamicProfile = JSON.parse(localStorage.getItem('dynamic-gradient'));
    if(dynamicProfile == 'true') {
        $('#dynamicgradient-switch').click();
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
    $('#metrocatalog-switch').on('change', function() {
        if($(this).is(':checked')) {
            localStorage.setItem('preferred-catalog', JSON.stringify('metro'));
        } else {
            localStorage.removeItem('preferred-catalog');
        }
    });
    $('#dynamicgradient-switch').on('change', function() {
        if($(this).is(':checked')) {
            localStorage.setItem('dynamic-gradient', JSON.stringify('true'));
            $('body').attr('dynamic-gradient', 'true');
        } else {
            localStorage.removeItem('dynamic-gradient');
            $('body').removeAttr('dynamic-gradient', 'true');
        }
    });
})