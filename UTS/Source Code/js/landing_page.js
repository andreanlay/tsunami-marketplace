$(document).ready(function() {
    var words = [
        "Hi👋",
        "We are Tsunami🌊",
        "We provide you with unique Marketplace concept🔥",
        "Make sure you are ready for a really damp experience💦",
    ];

    function typeWriter(text, word_index, iteration) {
        if(word_index == words.length){
            $('#circle-button').show();
            return;
        }
        if(iteration == words[word_index].length) {
            setTimeout(function() {
                $('#intro-text').empty();
                typeWriter(words[word_index + 1], word_index + 1, 0)
            }, 1000);
            return;
        }

        setTimeout(function() {
            $('#intro-text').text($('#intro-text').text() + words[word_index][iteration++]);
            typeWriter(text, word_index, iteration)
        }, 100)
    }
    $('#circle-button').hide();
    typeWriter(words[0], 0, 0);
})