$('#submit-btn').on('click', function(evt){
    evt.preventDefault();
    let title = $('#title-input').val();
    let stars = $('#movie-rate').val();
   
    $('#starMovie').append(`<div style="text-align:center" class="reviews">
    <ul class="movie">${title}</ul>
    <ul class="rate">${stars}</ul>
    <button class="btn button">Delete</button></div>`);
    
    // $("ul").sort(function(a, b) { 
    //    return ($(b).text()) < ($(a).text()) ? 1 : -1; 
    // }).appendTo('div.reviews');
});

$('#starMovie').on('click', 'button', function(){
    $(this).parent().remove()
 });


