

$(document).ready(function() {
    $(".greeting").text(function(){
        var now = new Date();
        hours = now.getHours();
        var timeOfDay = ""
        if(hours >= 16)
            timeOfDay = "Evening";
        else if(hours < 12)
            timeOfDay = "Morning";
        else
            timeOfDay = "Afternoon";
        return " Good " + timeOfDay + "!";
    });
});
