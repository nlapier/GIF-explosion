function insertButton(text){
    var gifButton = "<button type='button' class='btn btn-default gifButton'>" + text + "</button>";
    $("#buttonDiv").prepend(gifButton);
}

var buttonArray = ["zebra", "elephant", "sheep"]
var search = $("#searchBox").val();

for (var i =0; i<buttonArray.length; i++){
    insertButton(buttonArray[i]);
}

$(".btn-primary").on('click', function(){
    var buttonText = $("#searchForm").val();
    insertButton(buttonText);
    console.log("add gif click")
    console.log("buttonText: " + buttonText)
    return false;

})

$('.gifButton').on('click', function() {
    console.log(".gifButton click")
	var selectedGif = $(this).text();
    console.log("selectedGif: " + selectedGif);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selectedGif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response){

        console.log("queryURL: " + queryURL);
        console.log("response: " + response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
        	var animate = results[i].images.fixed_height.url;
        	var still = results[i].images.fixed_height_still.url;
        	var gifBox = $("<div class ='gifBox'>");
        	var gifImg = $("<img class = 'gifImg'>").attr("src", still);
        	var rating = $("<p>").text("Rating: " + results[i].rating);

            gifImg.data("animate", animate);
            gifImg.data("still", still);
            gifImg.data("state", true);
            gifBox.append(gifImg);
            gifBox.append(rating);

      		$("#gifsDiv").prepend(gifBox);
        }         
    })
});

$(".container-fluid").on("click", ".gifImg", function(){
    var state = $(this).data('state');
    console.log(".gifImg click");
    console.log(state);

    if (state){
        $(this).attr("src", $(this).data("animate"));
        $(this).data("state", false);
    }

    else{
        $(this).attr("src", $(this).data("still"));
        $(this).data("state", true);
    }
});


