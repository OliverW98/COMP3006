$(function () {

    let socket = io("http://localhost:9000");

    let game;
    let moveNumber = 0;
    socket.emit("get chess games to view");

    socket.on("load chess games to view", function (data) {
        game = data[0];
        displayPieces();
        $('#playerNameWhite').html(game.whitePlayer);
        $('#playerNameBlack').html(game.blackPlayer);
        displayMoveNumber();
    });

    $('#home').click(function () {
        location.href = './';
    });

    $('#back').click(function () {
        location.href = './listChessGames';
    });

    $('#prevMove').click(function () {
        if (moveNumber > 0) {
            moveNumber--;
            displayPieces();
            displayMoveNumber();
        }
    });

    $('#nextMove').click(function () {
        if (moveNumber < game.moves.length - 1) {
            moveNumber++;
            displayPieces();
            displayMoveNumber();
        }
    });

    function displayMoveNumber() {
        $('#moveNumber').html(moveNumber + " / " + (game.moves.length - 1));
    }

    function displayPieces() {
        clearBoard();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (game.moves[moveNumber][i][j] === "BlackPawn") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackPawn.png");
                } else if (game.moves[moveNumber][i][j] === "WhitePawn") {
                    $("[row=" + i + "][col=" + j + "]").css("background-image", "url(../imgs/WhitePawn.png");
                } else if (game.moves[moveNumber][i][j] === "WhiteRook") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteRook.png");
                } else if (game.moves[moveNumber][i][j] === "WhiteKnight") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteKnight.png");
                } else if (game.moves[moveNumber][i][j] === "WhiteBishop") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteBishop.png");
                } else if (game.moves[moveNumber][i][j] === "WhiteKing") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteKing.png");
                } else if (game.moves[moveNumber][i][j] === "WhiteQueen") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteQueen.png");
                } else if (game.moves[moveNumber][i][j] === "BlackRook") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackRook.png");
                } else if (game.moves[moveNumber][i][j] === "BlackKnight") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackKnight.png");
                } else if (game.moves[moveNumber][i][j] === "BlackBishop") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackBishop.png");
                } else if (game.moves[moveNumber][i][j] === "BlackKing") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackKing.png");
                } else if (game.moves[moveNumber][i][j] === "BlackQueen") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackQueen.png");
                }

            }
        }
    }

    function clearBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                $("[row=" + i + " ][col=" + j + "]").css("background-image", "none");

            }
        }
    }


});