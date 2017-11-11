$(document).ready(function() {
	$("#addMatch").on("click", function() {
	  $.ajax({
	    type: "POST",
	    url: "/submit/match",
	    dataType: "json",
	    data: {
	    	Section: $("#section").val(),
	    	PlayerNumber: $("#playerNumber").val(),
	    	PlayerPartnerNumber: $("#playerPartnerNumber").val(),
	    	OpponentNumber: $("#opponentNumber").val(),
	    	OpponentPartnerNumber: $("#opponentPartnerNumber").val(),
	    	Score: $("#score").val(),
	    	IsTournamentMatch: false
	    }
	  }).done(function(data) {
	    getMatches();
	    $("#section").val("");
	    $("#playerNumber").val("");
	    $("#playerPartnerNumber").val("");
	    $("#opponentNumber").val("");
	    $("#opponentParterNumber").val("");
	    $("#score").val("");
	  }
	  );
	  return false;
	});

	$(document).on("click", ".delete", function() {
	  var thisId = $(this).attr("data-id");
	  $.ajax({
	    type: "GET",
	    url: "/matches/delete/" + thisId
	  });
	  $(this).parents("tr").remove();
	  getMatches();
	});

	function getMatches() {
	  $("#matches").empty();
	  $.getJSON("/matches", function(data) {
	    for (var i = 0; i < data.length; i++) {
	      $("#match").prepend("<tr><td>" + data[i].matchType + "</td><td>" +
	      	data[i].numberOfSets + "</td><td>" + 
	      	data[i].playerNumber + "</td><td>" + 
	      	data[i].opponentNumber + "</td><td>" + 
	      	data[i].score + 
	        "</td><td><button class='delete' data-id='" + data[i].id + "'>Delete</button></td></tr>");
	    }
	    $("#match").prepend("<tr><th>Number of Sets -------- </th><th>Player --------</th><th>Opponent --------</th><th>Score</th></tr>");
	  });
	}
	getMatches();
});