let mongoose = require("mongoose");

let chessGameSchema = new mongoose.Schema({
    whitePlayer: String,
    blackPlayer: String,
    moves: Array
});

module.exports = mongoose.model('games', chessGameSchema);