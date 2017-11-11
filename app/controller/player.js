var SQL = require("./sql.js");
var gamePoints;
var winPoints;
var totalPoints;

module.exports = {
	checkPlayer: function(section, number, score, winLose) {
		var player = {
            Section: section,
			Number: number,
			Game: score,
			Win: winLose
		}
	    SQL.checkPlayer(player);
	},
	getGameWinPoints: function(player) {
		gamePoints = this.getGamePoints(player);
		winPoints = this.getWinPoints(player);
		totalPoints = parseFloat(gamePoints) + parseFloat(winPoints);
		var playerGWP = {
            Section: player.Section,
			Number: player.Number,
			GamePoints: gamePoints,
			WinPoints: winPoints,
			TotalPoints: totalPoints
		}
		// SQL.updateGameWinPoints(playerGWP);
	},
	getGamePoints: function(player) {
		if (player.Game >= 47) {
			gamePoints = 15;
			return gamePoints;
		}
		else if (40 <= player.Game && player.Game <= 46) {
			gamePoints = 14;
			return gamePoints;
		}
		else if (30 <= player.Game && player.Game <= 39)
        {
            gamePoints = 13;
            return gamePoints;
        }
        else if (25 <= player.Game && player.Game <= 29)
        {
            gamePoints = 12;
            return gamePoints;
        }
        else if (20 <= player.Game && player.Game <= 24)
        {
            gamePoints = 11;
            return gamePoints;
        }
        else if (0 <= player.Game && player.Game <= 19)
        {
            gamePoints = 10;
            return gamePoints;
        }
        else {
        	return gamePoints;
        }
	},
	getWinPoints: function(player) {
		if (player.Win >= 9)
        {
            winPoints = 15;
            return winPoints;
        }
        else if (player.Win == 8)
        {
            winPoints = 14.5;
            return winPoints;
        }
        else if (player.Win == 7)
        {
            winPoints = 14;
            return winPoints;
        }
        else if (player.Win == 6)
        {
            winPoints = 13.5;
            return winPoints;
        }
        else if (player.Win == 5)
        {
            winPoints = 13;
            return winPoints;
        }
        else if (player.Win == 4)
        {
            winPoints = 12.5;
            return winPoints;
        }
        else if (player.Win == 3)
        {
            winPoints = 12;
            return winPoints;
        }
        else if (player.Win == 2)
        {
            winPoints = 11.5;
            return winPoints;
        }
        else if (player.Win == 1)
        {
            winPoints = 11;
            return winPoints;
        }
        else if (player.Win == 0)
        {
            winPoints = 10.5;
            return winPoints;
        }
        else
        {
           return winPoints;
        }
	}
}