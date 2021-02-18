let express = require("express");
let http = require("http");
let path = require("path");
let mongoose = require("mongoose");
let socketIo = require("socket.io");

let chessGame = require("./resources/js/chessGame");
let playerToMove = "White";
let opponet = "Black";
let chessGameToView;
let chessGameSchema = require("./resources/js/chessGameSchema")

// Intialise the app and server.
app = express();
server = http.createServer(app);
// Configure to use statics.
app.use(express.static(path.join(__dirname, "resources")));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/resources/views/enterPlayer.html');
});

app.get('/whiteBoard', (req, res) => {
    res.sendFile(__dirname + '/resources/views/whiteBoard.html');
});

app.get('/blackBoard', (req, res) => {
    res.sendFile(__dirname + '/resources/views/blackBoard.html');
});

app.get('/listChessGames', (req, res) => {
    res.sendFile(__dirname + '/resources/views/listChessGames.html');
});

app.get('/viewChessGame', (req, res) => {
    res.sendFile(__dirname + '/resources/views/viewChessGame.html');
});

// Set up the websocket.
let io = socketIo(server);

let dbUrl = "mongodb://localhost:27017/chessGames";
mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true});


io.on("connection", function (socket) {
    socket.on("player name", function (playerName) {

        if (chessGame.game.whitePlayer === "" && chessGame.game.blackPlayer === "") {
            if (Math.random() >= 0.5) {
                chessGame.game.whitePlayer = playerName;
                socket.emit("white player");
            } else {
                chessGame.game.blackPlayer = playerName;
                socket.emit("black player");
            }

        } else if (chessGame.game.whitePlayer !== "") {
            chessGame.game.blackPlayer = playerName;
            socket.emit("black player");
            io.emit("player names", chessGame.game.whitePlayer, chessGame.game.blackPlayer, playerToMove, opponet);
        } else if (chessGame.game.blackPlayer !== "") {
            chessGame.game.whitePlayer = playerName;
            socket.emit("white player");
            io.emit("player names", chessGame.game.whitePlayer, chessGame.game.blackPlayer, playerToMove, opponet);
        }

    });

    socket.on("loading board", function () {

        socket.emit("player names", chessGame.game.whitePlayer, chessGame.game.blackPlayer);

        io.emit("update board", chessGame.game.moves[chessGame.game.moves.length - 1], playerToMove, opponet);

    });

    socket.on("player moved", function (board) {

        if (playerToMove === "White") {
            playerToMove = "Black";
            opponet = "White";
        } else if (playerToMove === "Black") {
            playerToMove = "White";
            opponet = "Black";
        }

        chessGame.game.moves.push(board);
        io.emit("update board", chessGame.game.moves[chessGame.game.moves.length - 1], playerToMove, opponet);

    });

    socket.on("checkmate", function () {

        chessGameSchema(chessGame.game).save();
        chessGame.resetGame();
        playerToMove = "White";
        opponet = "Black";

        io.emit("game over");
    });

    socket.on("playerExited", function () {

        chessGameSchema(chessGame.game).save();
        chessGame.resetGame();
        playerToMove = "White";
        opponet = "Black";

        io.emit("game stopped");
    });


    socket.on("get chess games", function () {

        chessGameSchema.find({}, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                socket.emit("load chess games", data);
            }
        });
    });

    socket.on("gameid to view", function (id) {

        chessGameSchema.find({_id: id}, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                chessGameToView = data;
            }
        });
    });

    socket.on("get chess games to view", function () {
        socket.emit("load chess games to view", chessGameToView);
    });


});
server.listen(9000, function () {
    console.log("Listening on 9000");
});