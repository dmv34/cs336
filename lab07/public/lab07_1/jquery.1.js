$( document ).ready(function() {
  $( "a" ).click(function( event ) {
    alert( "The link will no longer take you to jquery.com" );
    event.preventDefault();
    $( this ).removeClass( "test" );
    $( "body" ).append( "<p>Sorry this link doesn't work.</p>");
    $( this ).hide( "slow" );

  });
  $( "a" ).addClass( "test" );


});
