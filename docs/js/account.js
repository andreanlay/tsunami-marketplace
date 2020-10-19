$(document).ready(function() {
    $('#new-password-input').on("change paste keyup", function() {
        var password = $('#new-password-input').val();
        var score = 0;

        // Check uppercase existence in password
        if(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
            score += 5;
        }

        if(password.match(/([!,%,&,@,#,$,^,*,?,_,~,-,=,+,[,],;,',:,",{,},\,|])/)) {
            score += 5;
        }
    
        if(password.match(/([a-zA-Z])/) && password.match(/([0-9])/) == false) {
            score += 3;
        }

        score += password.length
    
        if(score > 20){
            $('#password-strength').text('Excellent');
        }else if(score > 15){
            $('#password-strength').text('Good');
        }else if(score > 10){
            $('#password-strength').text('Average');
        }else if(score > 1){
            $('#password-strength').text('Bad');
        }else{
            $('#password-strength').text('Unavailable');
        }
    })
})