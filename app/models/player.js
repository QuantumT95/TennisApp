module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    player_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_games: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_wins: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Player;
};