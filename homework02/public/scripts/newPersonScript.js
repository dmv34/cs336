$( document ).ready(function() {
  $( 'form' ).submit(function( event ) {
    event.preventDefault();
    var form = $( this );
    console.log( $( this ).serialize() );
    $.ajax({
      type: 'POST',
      url: '/person',
      data: form.serialize(),
      dataType: 'json',
      success: function(resp) {
        console.log(resp);
      }})
      .done(function(result){
        var content = $("<p></p>").text(JSON.stringify(result));
        $("body").append(content);
        console.log('AJAX request succeeded...');
      })
      .fail(function(xhr, status, errorThrown) {
        console.log('AJAX request failed...');
      });
  });
})
