var db = require("../models");
var m = require("../controller/match.js");
var SQL = require("../controller/sql.js");
var t = require("../controller/tournament.js");

module.exports = function(App) {
	App.post("/submit/match", function(req, res) {
  		var match = req.body;
		m.createMatch(match);
	});

	App.post("/submit/tournament", function(req, res) {
  		var tournament = req.body;
		t.createTournament(tournament);
	});

	App.get("/players/:playerNumber?", function(req, res) {
		var playerNumber = req.params.playerNumber;
		if (playerNumber) {

		}
		else {

		}
	});

	App.get("/matches", function(req, res) {
		SQL.getMatches();
	});

	App.get("/matches/delete/:id", function(req, res) {
		var matchId = req.params.id;
		m.deleteMatch(matchId);
	});

	App.get("/gamewinpoints/:playerNumber?", function(req, res) {
		var playerNumber = req.params.playerNumber;
		if (playerNumber) {

		}
		else {

		}
	});
}