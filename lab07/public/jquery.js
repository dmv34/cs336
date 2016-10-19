/* jquery.js modifies the html
 * Created by Drew VandeLune
 * Created on 10/19/2016
 */

//make sure the document is ready for editing before anything is run
$( document ).ready(function() {
  //Adds in the button and an empty paragraph
  $("body").append("<button class='ui-button ui-widget ui-corner-all'>Get Data</button>");
  $("body").append("<p></p>");
  // $("h1").addClass("test"); //for testing

  //when button is clicked, function runs
  $("button").click(function() {
    //delete current paragraph, helps keep te html tidy
    $( "p" ).remove();
    //console.log('AJAX request issued...'); //for testing

      $.ajax({
        url: "/fetch",
        type: "GET",
        data: { name: "lab7" }
    })
      .done(function(result){
        //console.log('AJAX request succeeded...'); //for testing
        $("body").append("<p>" + result.content + "</p>");
     })
      .fail(function(xhr, status, errorThrown) { //if AJAX fails
        //console.log('AJAX request failed...'); //for testing
        $("body").append("<p> No data yet...</p>");
     })

  });
});
