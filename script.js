"use strict";

$(document).ready(function(){
  
  $('#searchButton').on("click", function(e){
    e.preventDefault();
    $('#results').html("")
    var search = $('#searchTerm').val();
    
    var searchResult = $.ajax({
      url: "http://www.omdbapi.com/",
      async: true,
      dataType: "json",
      data: { s: search }

    })
    searchResult.done(function(results){
      $.each(results["Search"], function(index, movie) {
        $('#results').append('<li data-imdbID='+movie["imdbID"]+'>' + movie["Title"] + '</li>');
      })
    });
  });

  $('#results').delegate('li', 'click', function(e){
      e.preventDefault();
      var id = $(e.target).data("imdbid")
      var moviePoster = $.ajax({
        url: "http://www.omdbapi.com",
        async: true,
        dataType: "json",
        data: { i: id}
      })
      moviePoster.done(function(data){
        $('#poster').html("");
          if(data["Poster"] === "N/A") {
            $('#poster').append("No image Available");
        } else {
            $('#poster').append("<img src='"+ data["Poster"]+"'/>");
        }
      })
  });


});