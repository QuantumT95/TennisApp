$(document).ready(function () {
	$("#addTourney").on("click", function () {
		$.ajax({
			type: "POST",
			url: "/submit/tournament",
			dataType: "json",
			data: {
				TournamentType: $("#touneyType").val(),
				NumberOfPlayers: $("#numberPlayers").val(),
				NumberOfSets: $("#numberSets").val(),
			}
		}).done(function (data) {
			getTournaments();
			$("#touneyType").val("");
			$("#numberPlayers").val("");
			$("#numberPlayers").val("");
		}
			);
		window.location.reload(true);
		return false;
	});

	$(document).on("click", ".delete", function () {
		var thisId = $(this).attr("data-id");
		$.ajax({
			type: "GET",
			url: "/tournaments/delete/" + thisId
		});
		$(this).parents("tr").remove();
		window.location.reload(true);
		getTournaments();
	});

	$(document).on("click", ".select", function () {
		var thisId = $(this).attr("data-id");
		$.ajax({
			url: "/tournaments/select/" + thisId
		}).done(function (data) {
			console.log(data);
		});
		window.location.reload(true);
		getTournaments();
	});

	function getTournaments() {
		$("#tournies").empty();
		$.getJSON("/tournaments", function (data) {
			for (var i = 0; i < data.length; i++) {
				$("#tournies").prepend("<tr><td>" + data[i].tournament_type + "</td><td>" +
					data[i].number_of_players + "</td><td>" +
					data[i].number_of_rounds + "</td><td>" +
					data[i].number_of_sets + "</td><td>" +
					"</td><td><button class='select' data-id='" + data[i].id + "'>Select</button></td><td><button class='delete' data-id='" + data[i].id + "'>Delete</button></td></tr>");
			}
			$("#tournies").prepend("<tr><th>Type </th><th>Number Of Players </th><th>Number of Rounds </th><th>Number of Sets </th></tr>");
		});
	}
	getTournaments();
});