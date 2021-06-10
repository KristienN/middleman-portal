$(document).ready(function(){
    $("#submit-btn").submit(function(e){
        alert("Request has been submitted!");
    });

    $('#update-btn').submit(function(e){
        e.preventDefault();

        console.log("hello");
    })
});