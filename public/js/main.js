$(document).ready(function(){
    $("#submit-btn").submit(function(e){
        alert("Request has been submitted!");
    });

    $('#update-btn').click(function(e){
        e.preventDefault();
        const id = $('#id').val();

        const sender = $('#sender').val();
        const receiver = $('#receiver').val();
        const driver = $('#driver').val();
        const origin = $('#origin').val();
        const destination = $('#destination').val();
        const contact = $('#contact').val();
        const price = $('#price').val();

        const data = {
            sender,
            receiver,
            driver,
            origin,
            destination,
            contact,
            price
        };

        console.log(data);

        $.ajax({
            type: "PUT",
            url: `/api/request/update/${id}`,
            data: data,
            success: function (response) {
                alert("Updated succesfully.")
            }
        });
    })

    $('.delete-btn-req').click(function(e){
        const id = $(this).attr("data-id");
        if(confirm("Are you sure you want to delete?")){
            $.ajax({
                type: "DELETE",
                url: `/api/request/delete/${id}`,
            });
            location.reload();
            alert("Deleted successfully!");
        }
    });

    $('.delete-btn-esc').click(function(e){
        const id = $(this).attr("data-id");
        if(confirm("Are you sure you want to delete?")){
            $.ajax({
                type: "DELETE",
                url: `/api/escort/delete/${id}`,
            });
            location.reload();
            alert("Deleted successfully!");
        }
    });
});