$(document).ready(function() {
	$("#addTournament").on("click", function() {
	  $.ajax({
	    type: "POST",
	    url: "/submit/tournament",
	    dataType: "json",
	    data: {
	    	TournamentType: $("#tournamentType").val(),
	    	NumberOfPlayers: $("#numberOfPlayers").val(),
	    	NumberOfSets: $("#numberOfSets").val(),
	    }
	  }).done(function(data) {
	    getTournaments();
	    console.log("Inside done func");
	    $("#tournamentType").val("");
	    $("#numberOfPlayers").val("");
	    $("#numberOfSets").val("");
	  }
	  );
	  return false;
	});

	$(document).on("click", ".delete", function() {
	  var thisId = $(this).attr("data-id");
	  $.ajax({
	    type: "GET",
	    url: "/tournaments/delete/" + thisId
	  });
	  $(this).parents("tr").remove();
	  getTournaments();
	});

	function getTournaments() {
	  $("#tournaments").empty();
	  $.getJSON("/tournaments", function(data) {
	    for (var i = 0; i < data.length; i++) {
	      $("#tournament").prepend("<tr><td>" + data[i].tournament_type + "</td><td>" +
	      	data[i].number_of_players + "</td><td>" + 
	      	data[i].number_of_rounds + "</td><td>" + 
	      	data[i].number_of_sets + "</td><td>" + 
	        "</td><td><button class='delete' data-id='" + data[i].id + "'>Delete</button></td></tr>");
	    }
	    $("#tournament").prepend("<tr><th>Type -------- </th><th>Number Of Players --------</th><th>Number of Sets --------</th></tr>");
	  });
	}

	getTournaments();
});