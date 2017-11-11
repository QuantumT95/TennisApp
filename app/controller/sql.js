var db = require("../models");
var matches = [];
var playerCount = 1;

module.exports = {
	createMatch: function(match) {
		db.Match.create({
			section: match.Section,
			match_type: match.MatchType,
			number_of_sets: match.NumberOfSets,
			player_number: match.PlayerNumber,
			player_partner_number: match.PlayerPartnerNumber,
			opponent_number: match.OpponentNumber,
			opponent_partner_number: match.OpponentPartnerNumber,
			score: match.Score,
			is_tournament_match: match.IsTournamentMatch,
			tournament_section: match.TournamentSection,
			createdAt: null,
			updatedAt: null
		});
	},
	getMatches: function() {
		console.log("SQL for getting Matches goes here");
	},
	checkPlayer: function(player) {
		db.Player.findOne({
			where: {
				player_number: player.Number
			}
		}).then(function(dbPlayer) {
			if (dbPlayer == null) {
				db.Player.create({
					section: player.Section,
					player_number: player.Number,
					total_games: player.Game,
					total_wins: player.Win,
					createdAt: null,
					updatedAt: null
				}).then(function (dbPlayer2) {

				});
			}
			else {
				existingPlayer = dbPlayer.dataValues;
				var newTotalGames = existingPlayer.total_games + player.Game;
				var newTotalWins = existingPlayer.total_wins + player.Win;
				db.Player.update({
					total_games: newTotalGames,
					total_wins: newTotalWins
				}, {
					where: { player_number: existingPlayer.player_number }
				}).then(function(dbPlayerUpdate) {
					console.log(dbPlayerUpdate);
				})
			}
		});
	},
	createTournament: function(tournament) {
		self = this;
		db.Tournament.create({
			tournament_type: tournament.TournamentType,
			number_of_players: tournament.NumberOfPlayers,
			number_of_rounds: tournament.NumberOfRounds,
			number_of_sets: tournament.NumberOfSets,
			tournament_section: null
		}).then(function(dbTournament) {
			self.createTournamentMatch(dbTournament.dataValues);
		});
	},
	createTournamentMatch: function(tournament) {
		self = this;
		var count = 0;
		var roundCount = 1;
		var matchCount = 1;
		var playerCount = tournament.number_of_players;
		var score = "0-0";
		db.Tournament.findOne({
			where: {
				id: tournament.id
			}
		}).then(function(dbTournament) {
			while (roundCount <= dbTournament.dataValues.number_of_rounds) {
				switch(roundCount) {
					case 1:
					var firstRoundMatchCount = playerCount / 2;
					self.generateFillerData(dbTournament.dataValues, firstRoundMatchCount, roundCount);
					break;
					case 2:
					var secondRoundMatchCount = firstRoundMatchCount / 2;
					self.generateFillerData(dbTournament.dataValues, secondRoundMatchCount, roundCount);
					break;
					case 3:
					var thirdRoundMatchCount = secondRoundMatchCount / 2;
					self.generateFillerData(dbTournament.dataValues, thirdRoundMatchCount, roundCount);
					break;
					case 4:
					var fourthRoundMatchCount = thirdRoundMatchCount / 2;
					self.generateFillerData(dbTournament.dataValues, fourthRoundMatchCount, roundCount);
					break;
					case 5:
					var fifthRoundMatchCount = fourthRoundMatchCount / 2;
					self.generateFillerData(dbTournament.dataValues, fifthRoundMatchCount, roundCount);
					break;
					case 6:
					var sixthRoundMatchCount = fifthRoundMatchCount / 2;
					self.generateFillerData(dbTournament.dataValues, sixthRoundMatchCount, roundCount);
					break;
					case 7:
					var seventhRoundMatchCount = sixthRoundMatchCount / 2;
					self.generateFillerData(dbTournament.dataValues, seventhRoundMatchCount, roundCount);
					break;
				}
				roundCount++;
			}
			self.pushFillerData(matches);
			matches = [];
		});
	},
	generateFillerData: function(tournament, roundMatchCount, roundCount) {
		var matchCount = 1;
		var count = 0;
		var score = "0-0";
		var fillerPlayerNumber;
		var fillerOpponentNumber;
		var fillerPlayerPartnerNumber;
		var fillerOpponentPartnerNumber;
		while (matchCount <= roundMatchCount) {
			if (tournament.tournament_type === "singles") {
				fillerPlayerNumber =  "P" + playerCount;
				fillerOpponentNumber = "O" + playerCount;
			}
			else {
				fillerPlayerNumber =  "P" + playerCount;
				fillerPlayerPartnerNumber =  "PP" + playerCount;
				fillerOpponentNumber = "O" + playerCount;
				fillerOpponentPartnerNumber = "OP" + playerCount;
			}
			var tournamentSection = tournament.id + "-" + roundCount + "-" + matchCount;
			while (count <= (tournament.number_of_sets)) {
				if (count < (tournament.number_of_sets - 1)) {
					score +=  ",0-0";
				} 
				count++;
			}
			match = {
				Section: "T",
				MatchType: tournament.tournament_type,
				NumberOfSets: tournament.number_of_sets,
				PlayerNumber: fillerPlayerNumber,
				PlayerPartnerNumber: fillerPlayerPartnerNumber,
				OpponentNumber: fillerOpponentNumber,
				OpponentPartnerNumber: fillerOpponentPartnerNumber,
				Score: score,
				IsTournamentMatch: true,
				TournamentSection: tournamentSection
			}
			playerCount++;
			matchCount++;
			console.log(match);
			matches.push(match);
		}
	},
	pushFillerData: function(matches) {
		for (i = 0; i < matches.length; i++) {
			self.createMatch(matches[i]);
		}
		playerCount = 1;
	}
}