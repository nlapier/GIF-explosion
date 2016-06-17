



       var search = $("#searchBox").val();


    $('.gifButton').on('click', function() {

    	var selectedGif = $(this).data('x');
    	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + selectedGif;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response);

            var results = response.data;

            for (var i = 0; i <results.length; i++) {
            	var gifBox = $("<div>").data("state", false);
            	var gif = $("<img>").attr("src", results[i].images.fixed_height.url);
            	var rating = $("<p>").text("Rating: " + results[i].rating);


            	gifBox.append(gif);
            	gifBox.append(rating);

          		$("#gifsDiv").prepend(gifBox);
            }         
        })


    });