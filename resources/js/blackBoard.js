$(function () {

    let socket = io("http://localhost:9000");

    socket.emit("loading board");

    socket.on("player names", function (white, black) {
        if (white !== "" && black !== "") {
            $('#playerWhiteTurn').addClass("playersTurn");
        }
        $('#playerNameWhite').html(white);
        $('#playerNameBlack').html(black);
    });

    socket.on("update board", function (newBoard, newPlayerToMove, newOpponent) {

        playerToMove = newPlayerToMove;
        opponent = newOpponent

        boardPostions = newBoard;

        if (newPlayerToMove === "White") {
            $('#playerWhiteTurn').addClass("playersTurn");
            $('#playerBlackTurn').removeClass("playersTurn");
        } else {
            $('#playerWhiteTurn').removeClass("playersTurn");
            $('#playerBlackTurn').addClass("playersTurn");
        }

        clearBoard();
        displayBoard();
        kingInCheck();
    });

    let boardPostions = [
        ["WhiteRook", "WhiteKnight", "WhiteBishop", "WhiteQueen", "WhiteKing", "WhiteBishop", "WhiteKnight", "WhiteRook"],
        ["WhitePawn", "WhitePawn", "WhitePawn", "WhitePawn", "WhitePawn", "WhitePawn", "WhitePawn", "WhitePawn"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["BlackPawn", "BlackPawn", "BlackPawn", "BlackPawn", "BlackPawn", "BlackPawn", "BlackPawn", "BlackPawn"],
        ["BlackRook", "BlackKnight", "BlackBishop", "BlackQueen", "BlackKing", "BlackBishop", "BlackKnight", "BlackRook"]
    ];

    let selectedPiece = {row: '', col: '', piece: '', pieceImg: ''};
    let playerToMove;
    let opponent;
    let blackCanCastleShort = true;
    let blackCanCastleLong = true;

    function displayBoard() {
        for (let i = 0; i < boardPostions.length; i++) {
            for (let j = 0; j < boardPostions.length; j++) {
                if (boardPostions[i][j] === "BlackPawn") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackPawn.png");
                } else if (boardPostions[i][j] === "WhitePawn") {
                    $("[row=" + i + "][col=" + j + "]").css("background-image", "url(../imgs/WhitePawn.png");
                } else if (boardPostions[i][j] === "WhiteRook") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteRook.png");
                } else if (boardPostions[i][j] === "WhiteKnight") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteKnight.png");
                } else if (boardPostions[i][j] === "WhiteBishop") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteBishop.png");
                } else if (boardPostions[i][j] === "WhiteKing") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteKing.png");
                } else if (boardPostions[i][j] === "WhiteQueen") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/WhiteQueen.png");
                } else if (boardPostions[i][j] === "BlackRook") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackRook.png");
                } else if (boardPostions[i][j] === "BlackKnight") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackKnight.png");
                } else if (boardPostions[i][j] === "BlackBishop") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackBishop.png");
                } else if (boardPostions[i][j] === "BlackKing") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackKing.png");
                } else if (boardPostions[i][j] === "BlackQueen") {
                    $("[row=" + i + " ][col=" + j + "]").css("background-image", "url(../imgs/BlackQueen.png");
                }

            }
        }
    }


    $(".square").click(function () {

        if (playerToMove === "Black") {
            if (squareHasPiece($(this))) {

                clearSelectedSquare();
                $(this).addClass("selected");

                if (selectedPiece.piece === "BlackPawn") {
                    if (moveIsOnTheBoard(selectedPiece.row - 1, selectedPiece.col + 1) &&
                        boardPostions[selectedPiece.row - 1][selectedPiece.col + 1].substring(0, 5) === "White"
                        && !revealsACheck(selectedPiece.row - 1, selectedPiece.col + 1)) {
                        $("[row=" + (selectedPiece.row - 1) + " ][col=" + (selectedPiece.col + 1) + "]").addClass("take");
                    }
                    if (moveIsOnTheBoard(selectedPiece.row - 1, selectedPiece.col - 1) &&
                        boardPostions[selectedPiece.row - 1][selectedPiece.col - 1].substring(0, 5) === "White"
                        && !revealsACheck(selectedPiece.row - 1, selectedPiece.col + 1)) {
                        $("[row=" + (selectedPiece.row - 1) + " ][col=" + (selectedPiece.col - 1) + "]").addClass("take");
                    }
                    if (selectedPiece.row === 6 && boardPostions[selectedPiece.row - 1][selectedPiece.col].substring(0, 5) === ""
                        && boardPostions[selectedPiece.row - 2][selectedPiece.col].substring(0, 5) === ""
                        && !revealsACheck(selectedPiece.row + 2, selectedPiece.col)) {
                        $("[row=" + (selectedPiece.row - 1) + " ][col=" + selectedPiece.col + "]").addClass("path");
                        $("[row=" + (selectedPiece.row - 2) + " ][col=" + selectedPiece.col + "]").addClass("path");
                    } else if (selectedPiece.row >= 0 && boardPostions[selectedPiece.row - 1][selectedPiece.col].substring(0, 5) === ""
                        && !revealsACheck(selectedPiece.row - 1, selectedPiece.col)) {
                        $("[row=" + (selectedPiece.row - 1) + " ][col=" + selectedPiece.col + "]").addClass("path");
                    }
                }


                if (selectedPiece.piece === "BlackKnight") {
                    let postions = [
                        [2, 1],
                        [2, -1],
                        [1, 2],
                        [-1, 2],
                        [-2, 1],
                        [-2, -1],
                        [-1, -2],
                        [1, -2]
                    ];
                    for (let i = 0; i < postions.length; i++) {
                        if (moveIsOnTheBoard(selectedPiece.row + postions[i][0], selectedPiece.col + postions[i][1])) {
                            if (boardPostions[selectedPiece.row + postions[i][0]][selectedPiece.col + postions[i][1]].substring(0, 5) === ""
                                && !revealsACheck(selectedPiece.row + postions[i][0], selectedPiece.col + postions[i][1])) {
                                $("[row=" + (selectedPiece.row + postions[i][0]) + " ][col=" + (selectedPiece.col + postions[i][1]) + "]").addClass("path");
                            } else if (boardPostions[selectedPiece.row + postions[i][0]][selectedPiece.col + postions[i][1]].substring(0, 5) === "White"
                                && !revealsACheck(selectedPiece.row + postions[i][0], selectedPiece.col + postions[i][1])) {
                                $("[row=" + (selectedPiece.row + postions[i][0]) + " ][col=" + (selectedPiece.col + postions[i][1]) + "]").addClass("take");
                            }
                        }
                    }
                }
                if (selectedPiece.piece === "BlackRook") {
                    if (moveIsOnTheBoard(selectedPiece.row + 1, selectedPiece.col)) {
                        for (let i = selectedPiece.row + 1; i < boardPostions.length; i++) {
                            if (boardPostions[i][selectedPiece.col] === ""
                                && !revealsACheck(i, selectedPiece.col)) {
                                $("[row=" + i + " ][col=" + selectedPiece.col + "]").addClass("path");
                            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "White"
                                && !revealsACheck(i, selectedPiece.col)) {
                                $("[row=" + i + " ][col=" + selectedPiece.col + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "Black") {
                                break;
                            }
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row - 1, selectedPiece.col)) {
                        for (let i = selectedPiece.row - 1; i >= 0; i--) {
                            if (boardPostions[i][selectedPiece.col] === ""
                                && !revealsACheck(i, selectedPiece.col)) {
                                $("[row=" + i + " ][col=" + selectedPiece.col + "]").addClass("path");
                            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "White"
                                && !revealsACheck(i, selectedPiece.col)) {
                                $("[row=" + i + " ][col=" + selectedPiece.col + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "Black") {
                                break;
                            }
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row, selectedPiece.col + 1)) {
                        for (let i = selectedPiece.col + 1; i < boardPostions.length; i++) {
                            if (boardPostions[selectedPiece.row][i] === ""
                                && !revealsACheck(selectedPiece.row, i)) {
                                $("[row=" + selectedPiece.row + " ][col=" + i + "]").addClass("path");
                            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "White"
                                && !revealsACheck(selectedPiece.row, i)) {
                                $("[row=" + selectedPiece.row + " ][col=" + i + "]").addClass("take");
                                break;
                            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "Black") {
                                break;
                            }
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row, selectedPiece.col - 1)) {
                        for (let i = selectedPiece.col - 1; i >= 0; i--) {
                            if (boardPostions[selectedPiece.row][i] === ""
                                && !revealsACheck(selectedPiece.row, i)) {
                                $("[row=" + selectedPiece.row + " ][col=" + i + "]").addClass("path");
                            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "White"
                                && !revealsACheck(selectedPiece.row, i)) {
                                $("[row=" + selectedPiece.row + " ][col=" + i + "]").addClass("take");
                                break;
                            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "Black") {
                                break;
                            }
                        }
                    }
                }

                if (selectedPiece.piece === "BlackBishop") {
                    if (moveIsOnTheBoard(selectedPiece.row + 1, selectedPiece.col + 1)) {
                        let i = selectedPiece.row + 1;
                        let j = selectedPiece.col + 1;
                        while (i < boardPostions.length && j < boardPostions.length) {
                            if (boardPostions[i][j] === "" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("path");
                            } else if (boardPostions[i][j].substring(0, 5) === "White" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][j].substring(0, 5) === "Black") {
                                break;
                            }
                            i++;
                            j++;
                        }
                    }

                    if (moveIsOnTheBoard(selectedPiece.row - 1, selectedPiece.col + 1)) {
                        let i = selectedPiece.row - 1;
                        let j = selectedPiece.col + 1;
                        while (i >= 0 && j < boardPostions.length) {
                            if (boardPostions[i][j] === "" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("path");
                            } else if (boardPostions[i][j].substring(0, 5) === "White" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][j].substring(0, 5) === "Black") {
                                break;
                            }
                            i--;
                            j++;
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row - 1, selectedPiece.col - 1)) {
                        let i = selectedPiece.row - 1;
                        let j = selectedPiece.col - 1;
                        while (i >= 0 && j >= 0) {
                            if (boardPostions[i][j] === "" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("path");
                            } else if (boardPostions[i][j].substring(0, 5) === "White" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][j].substring(0, 5) === "Black") {
                                break;
                            }
                            i--;
                            j--;
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row + 1, selectedPiece.col - 1)) {
                        let i = selectedPiece.row + 1;
                        let j = selectedPiece.col - 1;
                        while (i < boardPostions.length && j >= 0) {
                            if (boardPostions[i][j] === "" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("path");
                            } else if (boardPostions[i][j].substring(0, 5) === "White" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][j].substring(0, 5) === "Black") {
                                break;
                            }
                            i++;
                            j--;
                        }
                    }
                }
                if (selectedPiece.piece === "BlackQueen") {
                    if (moveIsOnTheBoard(selectedPiece.row + 1, selectedPiece.col)) {
                        for (let i = selectedPiece.row + 1; i < boardPostions.length; i++) {
                            if (boardPostions[i][selectedPiece.col] === "" && !revealsACheck(i, selectedPiece.col)) {
                                $("[row=" + i + " ][col=" + selectedPiece.col + "]").addClass("path");
                            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "White" && !revealsACheck(i, selectedPiece.col)) {
                                $("[row=" + i + " ][col=" + selectedPiece.col + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "Black") {
                                break;
                            }
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row - 1, selectedPiece.col)) {
                        for (let i = selectedPiece.row - 1; i >= 0; i--) {
                            if (boardPostions[i][selectedPiece.col] === "" && !revealsACheck(i, selectedPiece.col)) {
                                $("[row=" + i + " ][col=" + selectedPiece.col + "]").addClass("path");
                            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "White" && !revealsACheck(i, selectedPiece.col)) {
                                $("[row=" + i + " ][col=" + selectedPiece.col + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "Black") {
                                break;
                            }
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row, selectedPiece.col + 1)) {
                        for (let i = selectedPiece.col + 1; i < boardPostions.length; i++) {
                            if (boardPostions[selectedPiece.row][i] === "" && !revealsACheck(selectedPiece.row, i)) {
                                $("[row=" + selectedPiece.row + " ][col=" + i + "]").addClass("path");
                            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "White" && !revealsACheck(selectedPiece.row, i)) {
                                $("[row=" + selectedPiece.row + " ][col=" + i + "]").addClass("take");
                                break;
                            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "Black") {
                                break;
                            }
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row, selectedPiece.col - 1)) {
                        for (let i = selectedPiece.col - 1; i >= 0; i--) {
                            if (boardPostions[selectedPiece.row][i] === "" && !revealsACheck(selectedPiece.row, i)) {
                                $("[row=" + selectedPiece.row + " ][col=" + i + "]").addClass("path");
                            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "White" && !revealsACheck(selectedPiece.row, i)) {
                                $("[row=" + selectedPiece.row + " ][col=" + i + "]").addClass("take");
                                break;
                            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "Black") {
                                break;
                            }
                        }
                    }

                    if (moveIsOnTheBoard(selectedPiece.row + 1, selectedPiece.col + 1)) {
                        let i = selectedPiece.row + 1;
                        let j = selectedPiece.col + 1;
                        while (i < boardPostions.length && j < boardPostions.length) {
                            if (boardPostions[i][j] === "" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("path");
                            } else if (boardPostions[i][j].substring(0, 5) === "White" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][j].substring(0, 5) === "Black") {
                                break;
                            }
                            i++;
                            j++;
                        }
                    }

                    if (moveIsOnTheBoard(selectedPiece.row - 1, selectedPiece.col + 1)) {
                        let i = selectedPiece.row - 1;
                        let j = selectedPiece.col + 1;
                        while (i >= 0 && j < boardPostions.length) {
                            if (boardPostions[i][j] === "" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("path");
                            } else if (boardPostions[i][j].substring(0, 5) === "White" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][j].substring(0, 5) === "Black") {
                                break;
                            }
                            i--;
                            j++;
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row - 1, selectedPiece.col - 1)) {
                        let i = selectedPiece.row - 1;
                        let j = selectedPiece.col - 1;
                        while (i >= 0 && j >= 0) {
                            if (boardPostions[i][j] === "" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("path");
                            } else if (boardPostions[i][j].substring(0, 5) === "White" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][j].substring(0, 5) === "Black") {
                                break;
                            }
                            i--;
                            j--;
                        }
                    }
                    if (moveIsOnTheBoard(selectedPiece.row + 1, selectedPiece.col - 1)) {
                        let i = selectedPiece.row + 1;
                        let j = selectedPiece.col - 1;
                        while (i < boardPostions.length && j >= 0) {
                            if (boardPostions[i][j] === "" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("path");
                            } else if (boardPostions[i][j].substring(0, 5) === "White" && !revealsACheck(i, j)) {
                                $("[row=" + i + " ][col=" + j + "]").addClass("take");
                                break;
                            } else if (boardPostions[i][j].substring(0, 5) === "Black") {
                                break;
                            }
                            i++;
                            j--;
                        }
                    }
                }
                if (selectedPiece.piece === "BlackKing") {

                    let postions = [
                        [1, 0],
                        [1, 1],
                        [0, 1],
                        [-1, 1],
                        [-1, 0],
                        [-1, -1],
                        [0, -1],
                        [1, -1],
                    ]
                    for (let i = 0; i < postions.length; i++) {
                        if (moveIsOnTheBoard(selectedPiece.row + postions[i][0], selectedPiece.col + postions[i][1])) {
                            if (!squareIsInCheck(selectedPiece.row + postions[i][0], selectedPiece.col + postions[i][1])) {
                                if (boardPostions[selectedPiece.row + postions[i][0]][selectedPiece.col + postions[i][1]].substring(0, 5) === "") {
                                    $("[row=" + (selectedPiece.row + postions[i][0]) + " ][col=" + (selectedPiece.col + postions[i][1]) + "]").addClass("path");
                                } else if (boardPostions[selectedPiece.row + postions[i][0]][selectedPiece.col + postions[i][1]].substring(0, 5) === "White") {
                                    $("[row=" + (selectedPiece.row + postions[i][0]) + " ][col=" + (selectedPiece.col + postions[i][1]) + "]").addClass("take");
                                }
                                if (selectedPiece.piece === "BlackKing" && selectedPiece.row === 7
                                    && boardPostions[selectedPiece.row][selectedPiece.col + 1] === ""
                                    && boardPostions[selectedPiece.row][selectedPiece.col + 2] === ""
                                    && blackCanCastleShort) {
                                    $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col + 1) + "]").addClass("path");
                                    $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col + 2) + "]").addClass("castle");
                                }
                                if (selectedPiece.piece === "BlackKing" && selectedPiece.row === 7
                                    && boardPostions[selectedPiece.row][selectedPiece.col - 1] === ""
                                    && boardPostions[selectedPiece.row][selectedPiece.col - 2] === ""
                                    && boardPostions[selectedPiece.row][selectedPiece.col - 3] === ""
                                    && blackCanCastleLong) {
                                    $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col - 1) + "]").addClass("path");
                                    $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col - 2) + "]").addClass("path");
                                    $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col - 3) + "]").addClass("castle");
                                }
                            }
                        }
                    }

                }
            }


            if ($(this).hasClass("path") || $(this).hasClass("take")) {
                checkCastleRights();
                //delete old piece position
                $("[row=" + selectedPiece.row + " ][col=" + selectedPiece.col + "]").css('background-image', 'none');
                boardPostions[selectedPiece.row][selectedPiece.col] = ""
                //load piece in new position
                $(this).css("background-image", selectedPiece.pieceImg);
                boardPostions[$(this).attr("row")][$(this).attr("col")] = selectedPiece.piece;
                //select piece new square
                selectedPiece.row = parseInt($(this).attr("row"));
                selectedPiece.col = parseInt($(this).attr("col"));
                if (!canPromotePawn()) {
                    removeDisableBoard();
                    clearSelectedSquare();
                    resetSelectedPiece();
                    kingInCheck();
                    socket.emit("player moved", boardPostions);
                }
            }
            if ($(this).hasClass("castle")) {
                if ($(this).attr("row") === "7" && $(this).attr("col") === "6") {
                    $("[row=" + selectedPiece.row + " ][col=" + selectedPiece.col + "]").css('background-image', 'none');
                    boardPostions[selectedPiece.row][selectedPiece.col] = ""
                    $("[row=7][col=7]").css('background-image', 'none');
                    boardPostions[7][7] = "";

                    $(this).css("background-image", selectedPiece.pieceImg);
                    boardPostions[$(this).attr("row")][$(this).attr("col")] = selectedPiece.piece;
                    $("[row=7][col=5]").css('background-image', 'url(../imgs/BlackRook.png');
                    boardPostions[7][5] = "BlackRook";
                } else if ($(this).attr("row") === "7" && $(this).attr("col") === "1") {
                    $("[row=" + selectedPiece.row + " ][col=" + selectedPiece.col + "]").css('background-image', 'none');
                    boardPostions[selectedPiece.row][selectedPiece.col] = ""
                    $("[row=7][col=0]").css('background-image', 'none');
                    boardPostions[7][0] = "";

                    $(this).css("background-image", selectedPiece.pieceImg);
                    boardPostions[$(this).attr("row")][$(this).attr("col")] = selectedPiece.piece;
                    $("[row=7][col=2]").css('background-image', 'url(../imgs/BlackRook.png');
                    boardPostions[7][2] = "BlackRook";
                }
                if (selectedPiece.piece.substring(0, 5) === "Black") {
                    blackCanCastleShort = false;
                    blackCanCastleLong = false;
                }
                socket.emit("player moved", boardPostions);
                removeDisableBoard();
                clearSelectedSquare();
                resetSelectedPiece();
            }
        }
    });

    function kingInCheck() {
        let kingsRow;
        let kingsCol;

        for (let i = 0; i < boardPostions.length; i++) {
            for (let j = 0; j < boardPostions.length; j++) {
                if (boardPostions[i][j] === "BlackKing") {
                    kingsRow = i;
                    kingsCol = j;
                }
            }
        }
        selectedPiece.row = kingsRow;
        selectedPiece.col = kingsCol;
        selectedPiece.piece = boardPostions[kingsRow][kingsCol];
        selectedPiece.pieceImg = 'url("http://localhost:9000/imgs/BlackKing.png")';
        if (squareIsInCheck(kingsRow, kingsCol)) {

            $("[row=" + kingsRow + " ][col=" + kingsCol + "]").addClass("check");
            toggleDisableBoard();
            $("[row=" + kingsRow + " ][col=" + kingsCol + "]").removeClass("disabled");

            let postions = [
                [1, 0],
                [1, 1],
                [0, 1],
                [-1, 1],
                [-1, 0],
                [-1, -1],
                [0, -1],
                [1, -1],
            ]
            let count = 0;
            for (let i = 0; i < postions.length; i++) {
                if (moveIsOnTheBoard(selectedPiece.row + postions[i][0], selectedPiece.col + postions[i][1])) {
                    if (!squareIsInCheck(selectedPiece.row + postions[i][0], selectedPiece.col + postions[i][1])) {
                        if (boardPostions[selectedPiece.row + postions[i][0]][selectedPiece.col + postions[i][1]].substring(0, 5) === "") {
                            $("[row=" + (selectedPiece.row + postions[i][0]) + " ][col=" + (selectedPiece.col + postions[i][1]) + "]").removeClass("disabled");
                            $("[row=" + (selectedPiece.row + postions[i][0]) + " ][col=" + (selectedPiece.col + postions[i][1]) + "]").addClass("path");
                            count++;
                        } else if (boardPostions[selectedPiece.row + postions[i][0]][selectedPiece.col + postions[i][1]].substring(0, 5) === "White") {
                            $("[row=" + (selectedPiece.row + postions[i][0]) + " ][col=" + (selectedPiece.col + postions[i][1]) + "]").removeClass("disabled");
                            $("[row=" + (selectedPiece.row + postions[i][0]) + " ][col=" + (selectedPiece.col + postions[i][1]) + "]").addClass("take");
                            count++;
                        }
                    }
                }
            }
            if (count === 0) {
                $('#checkMateMessage').modal('show');
                $('#gameStoppedTitle').html('Check Mate');
                socket.emit("checkmate");
            }
        }
    }

    function squareIsInCheck(row, col) {
        // check for pawns

        if (moveIsOnTheBoard(row - 1, col + 1) || moveIsOnTheBoard(row - 1, col - 1)) {
            if (selectedPiece.piece === "BlackKing" && (boardPostions[row - 1][col + 1] === "WhitePawn"
                || boardPostions[row - 1][col - 1] === "WhitePawn")) {
                return true;
            }
        }


        // check for king
        let kingPostions = [
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
            [0, -1],
            [1, -1],
        ]

        for (let i = 0; i < kingPostions.length; i++) {
            if (moveIsOnTheBoard(row + kingPostions[i][0], col + kingPostions[i][1])) {
                if (boardPostions[row + kingPostions[i][0]][col + kingPostions[i][1]] === "WhiteKing") {
                    return true;
                }
            }
        }

        //check for Knights
        let knightPostions = [
            [2, 1],
            [2, -1],
            [1, 2],
            [-1, 2],
            [-2, 1],
            [-2, -1],
            [-1, -2],
            [1, -2]
        ];
        for (let i = 0; i < knightPostions.length; i++) {
            if (moveIsOnTheBoard(row + knightPostions[i][0], col + knightPostions[i][1])) {
                if (boardPostions[row + knightPostions[i][0]][col + knightPostions[i][1]] === "WhiteKnight") {
                    return true;
                }
            }
        }

        //check for rook and queen
        if (moveIsOnTheBoard(row + 1, col)) {
            for (let i = row + 1; i < boardPostions.length; i++) {
                if (boardPostions[i][col] === "WhiteRook" || boardPostions[i][col] === "WhiteQueen") {
                    return true;
                } else if (boardPostions[i][col].substring(0, 5) === "White" && (boardPostions[i][col] !== "WhiteRook" && boardPostions[i][col] !== "WhiteQueen")) {
                    break;
                } else if (boardPostions[i][col].substring(0, 5) === "Black" && boardPostions[i][col] !== "BlackKing") {
                    break;
                }
            }
        }
        if (moveIsOnTheBoard(row - 1, col)) {
            for (let i = row - 1; i >= 0; i--) {
                if (boardPostions[i][col] === "WhiteRook" || boardPostions[i][col] === "WhiteQueen") {
                    return true;
                } else if (boardPostions[i][col].substring(0, 5) === "White" && (boardPostions[i][col] !== "WhiteRook" && boardPostions[i][col] !== "WhiteQueen")) {
                    break;
                } else if (boardPostions[i][col].substring(0, 5) === "Black" && boardPostions[i][col] !== "BlackKing") {
                    break;
                }
            }
        }
        if (moveIsOnTheBoard(row, col + 1)) {
            for (let i = col + 1; i < boardPostions.length; i++) {
                if (boardPostions[row][i] === "WhiteRook" || boardPostions[row][i] === "WhiteQueen") {
                    return true;
                } else if (boardPostions[row][i].substring(0, 5) === "White" && (boardPostions[row][i] !== "WhiteRook" && boardPostions[row][i] !== "WhiteQueen")) {
                    break;
                } else if (boardPostions[row][i].substring(0, 5) === "Black" && boardPostions[row][i] !== "BlackKing") {
                    break;
                }
            }
        }
        if (moveIsOnTheBoard(row, col - 1)) {
            for (let i = col - 1; i >= 0; i--) {
                if (boardPostions[row][i] === "WhiteRook" || boardPostions[row][i] === "WhiteQueen") {
                    return true;
                } else if (boardPostions[row][i].substring(0, 5) === "White" && (boardPostions[row][i] !== "WhiteRook" && boardPostions[row][i] !== "WhiteQueen")) {
                    break;
                } else if (boardPostions[row][i].substring(0, 5) === "Black" && boardPostions[row][i] !== "BlackKing") {
                    break;
                }
            }
        }

        // check for bishop and queen
        if (moveIsOnTheBoard(row + 1, col + 1)) {
            let i = row + 1;
            let j = col + 1;
            while (i < boardPostions.length && j < boardPostions.length) {
                if (boardPostions[i][j].substring(0, 5) === "Black" && boardPostions[i][j] !== "BlackKing") {
                    break;
                } else if (boardPostions[i][j].substring(0, 5) === "White" && (boardPostions[i][j] !== "WhiteBishop" && boardPostions[i][j] !== "WhiteQueen")) {
                    break;
                } else if (boardPostions[i][j] === "WhiteBishop" || boardPostions[i][j] === "WhiteQueen") {
                    return true;
                }
                i++;
                j++;
            }
        }
        if (moveIsOnTheBoard(row - 1, col + 1)) {
            let i = row - 1;
            let j = col + 1;
            while (i >= 0 && j < boardPostions.length) {
                if (boardPostions[i][j].substring(0, 5) === "Black" && boardPostions[i][j] !== "BlackKing") {
                    break;
                } else if (boardPostions[i][j].substring(0, 5) === "White" && (boardPostions[i][j] !== "WhiteBishop" && boardPostions[i][j] !== "WhiteQueen")) {
                    break;
                } else if (boardPostions[i][j] === "WhiteBishop" || boardPostions[i][j] === "WhiteQueen") {
                    return true;
                }
                i--;
                j++;
            }
        }
        if (moveIsOnTheBoard(row - 1, col - 1)) {
            let i = row - 1;
            let j = col - 1;
            while (i >= 0 && j >= 0) {
                if (boardPostions[i][j].substring(0, 5) === "Black" && boardPostions[i][j] !== "BlackKing") {
                    break;
                } else if (boardPostions[i][j].substring(0, 5) === "White" && (boardPostions[i][j] !== "WhiteBishop" && boardPostions[i][j] !== "WhiteQueen")) {
                    break;
                } else if (boardPostions[i][j] === "WhiteBishop" || boardPostions[i][j] === "WhiteQueen") {
                    return true;
                }
                i--;
                j--;
            }
        }
        if (moveIsOnTheBoard(row + 1, col - 1)) {
            let i = row + 1;
            let j = col - 1;
            while (i < boardPostions.length && j >= 0) {
                if (boardPostions[i][j].substring(0, 5) === "Black" && boardPostions[i][j] !== "BlackKing") {
                    break;
                } else if (boardPostions[i][j].substring(0, 5) === "White" && (boardPostions[i][j] !== "WhiteBishop" && boardPostions[i][j] !== "WhiteQueen")) {
                    break;
                } else if (boardPostions[i][j] === "WhiteBishop" || boardPostions[i][j] === "WhiteQueen") {
                    return true;
                }
                i++;
                j--;
            }
        }
        return false;
    }

    function revealsACheck(newRow, newCol) {

        for (let i = selectedPiece.row - 1; i >= 0; i--) {
            if (boardPostions[i][selectedPiece.col] === "BlackKing") {
                for (let j = selectedPiece.row + 1; j < boardPostions.length; j++) {
                    if (boardPostions[j][selectedPiece.col] === "WhiteRook" || boardPostions[j][selectedPiece.col] === "WhiteQueen") {
                        if (newCol !== selectedPiece.col) {
                            return true;
                        }
                    } else if (boardPostions[j][selectedPiece.col].substring(0, 5) === "Black" || boardPostions[j][selectedPiece.col].substring(0, 5) === "White"
                        && (boardPostions[j][selectedPiece.col] !== "WhiteRook" && boardPostions[j][selectedPiece.col] !== "WhiteQueen")) {
                        break;
                    }
                }
            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "Black" && boardPostions[i][selectedPiece.col] !== "BlackKing") {
                break;
            }
        }

        for (let i = selectedPiece.row + 1; i < boardPostions.length; i++) {
            if (boardPostions[i][selectedPiece.col] === "BlackKing") {
                for (let j = selectedPiece.row - 1; j >= 0; j--) {
                    if (boardPostions[j][selectedPiece.col] === "WhiteRook" || boardPostions[j][selectedPiece.col] === "WhiteQueen") {
                        if (newCol !== selectedPiece.col) {
                            return true;
                        }
                    } else if (boardPostions[j][selectedPiece.col].substring(0, 5) === "Black" || boardPostions[j][selectedPiece.col].substring(0, 5) === "White"
                        && (boardPostions[j][selectedPiece.col] !== "WhiteRook" && boardPostions[j][selectedPiece.col] !== "WhiteQueen")) {
                        break;
                    }
                }
            } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "Black" && boardPostions[i][selectedPiece.col] !== "BlackKing") {
                break;
            }
        }

        for (let i = selectedPiece.col - 1; i >= 0; i--) {
            if (boardPostions[selectedPiece.row][i] === "BlackKing") {
                for (let j = selectedPiece.col + 1; j < boardPostions.length; j++) {
                    if (boardPostions[selectedPiece.row][j] === "WhiteRook" || boardPostions[selectedPiece.row][j] === "WhiteQueen") {
                        if (newRow !== selectedPiece.row) {
                            return true;

                        }
                    } else if (boardPostions[selectedPiece.row][j].substring(0, 5) === "Black" || boardPostions[selectedPiece.row][j].substring(0, 5) === "White"
                        && (boardPostions[selectedPiece.row][j] !== "WhiteRook" && boardPostions[selectedPiece.row][j] !== "WhiteQueen")) {
                        break;
                    }
                }
            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "Black" && boardPostions[selectedPiece.row][i] !== "BlackKing") {
                break;
            }
        }

        for (let i = selectedPiece.col + 1; i < boardPostions.length; i++) {
            if (boardPostions[selectedPiece.row][i] === "BlackKing") {
                for (let j = selectedPiece.col - 1; j >= 0; j--) {
                    if (boardPostions[selectedPiece.row][j] === "WhiteRook" || boardPostions[selectedPiece.row][j] === "WhiteQueen") {
                        if (newRow !== selectedPiece.row) {
                            return true;
                        }
                    } else if (boardPostions[selectedPiece.row][j].substring(0, 5) === "Black" || boardPostions[selectedPiece.row][j].substring(0, 5) === "White"
                        && (boardPostions[selectedPiece.row][j] !== "WhiteRook" && boardPostions[selectedPiece.row][j] !== "WhiteQueen")) {
                        break;
                    }
                }
            } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "Black" && boardPostions[selectedPiece.row][i] !== "BlackKing") {
                break;
            }
        }

        let i = selectedPiece.row - 1;
        let j = selectedPiece.col - 1;
        while (i >= 0 && j >= 0) {
            if (boardPostions[i][j] === "BlackKing") {
                let k = selectedPiece.row + 1;
                let l = selectedPiece.col + 1;
                while (k < boardPostions.length && l < boardPostions.length) {
                    if (boardPostions[k][l] === "WhiteBishop" || boardPostions[k][l] === "WhiteQueen") {
                        if ((newRow - selectedPiece.row) === (newCol - selectedPiece.col)) {
                            break;
                        } else {
                            return true;
                        }
                    } else if (boardPostions[k][l].substring(0, 5) === "Black" || boardPostions[k][l].substring(0, 5) === "White"
                        && (boardPostions[k][l] !== "WhiteBishop" && boardPostions[k][l] !== "WhiteQueen")) {
                        break;
                    }
                    k++;
                    l++;
                }
            } else if (boardPostions[i][j].substring(0, 5) === "Black" && boardPostions[i][j] !== "BlackKing") {
                break;
            }
            i--;
            j--;
        }

        i = selectedPiece.row - 1;
        j = selectedPiece.col + 1;
        while (i >= 0 && j < boardPostions.length) {
            if (boardPostions[i][j] === "BlackKing") {
                let k = selectedPiece.row + 1;
                let l = selectedPiece.col - 1;
                while (k < boardPostions.length && l >= 0) {
                    if (boardPostions[k][l] === "WhiteBishop" || boardPostions[k][l] === "WhiteQueen") {
                        if ((selectedPiece.row - newRow) === (newCol - selectedPiece.col)) {
                            break;
                        } else {
                            return true;
                        }
                    } else if (boardPostions[k][l].substring(0, 5) === "Black" || boardPostions[k][l].substring(0, 5) === "White"
                        && (boardPostions[k][l] !== "WhiteBishop" && boardPostions[k][l] !== "WhiteQueen")) {
                        break;
                    }
                    k++;
                    l--;
                }
            } else if (boardPostions[i][j].substring(0, 5) === "Black" && boardPostions[i][j] !== "BlackKing") {
                break;
            }
            i--;
            j++;
        }

        i = selectedPiece.row + 1;
        j = selectedPiece.col - 1;
        while (i < boardPostions.length && j >= 0) {
            if (boardPostions[i][j] === "BlackKing") {
                let k = selectedPiece.row - 1;
                let l = selectedPiece.col + 1;
                while (k >= 0 && l < boardPostions.length) {
                    if (boardPostions[k][l] === "WhiteBishop" || boardPostions[k][l] === "WhiteQueen") {
                        if ((newRow - selectedPiece.row) === (selectedPiece.col - newCol)) {
                            break;
                        } else {
                            return true;
                        }
                    } else if (boardPostions[k][l].substring(0, 5) === "Black" || boardPostions[k][l].substring(0, 5) === "White"
                        && (boardPostions[k][l] !== "WhiteBishop" && boardPostions[k][l] !== "WhiteQueen")) {
                        break;
                    }
                    k--;
                    l++;
                }
            } else if (boardPostions[i][j].substring(0, 5) === "Black" && boardPostions[i][j] !== "BlackKing") {
                break;
            }
            i++;
            j--;
        }

        i = selectedPiece.row + 1;
        j = selectedPiece.col + 1;
        while (i < boardPostions.length && j < boardPostions.length) {
            if (boardPostions[i][j] === "BlackKing") {
                let k = selectedPiece.row - 1;
                let l = selectedPiece.col - 1;
                while (k >= 0 && l >= 0) {
                    if (boardPostions[k][l] === "WhiteBishop" || boardPostions[k][l] === "WhiteQueen") {
                        if ((selectedPiece.row - newRow) === (selectedPiece.col - newCol)) {
                            break;
                        } else {
                            return true;
                        }
                    } else if (boardPostions[k][l].substring(0, 5) === "Black" || boardPostions[k][l].substring(0, 5) === "White"
                        && (boardPostions[k][l] !== "WhiteBishop" && boardPostions[k][l] !== "WhiteQueen")) {
                        break;
                    }
                    k--;
                    l--;
                }
            } else if (boardPostions[i][j].substring(0, 5) === "Black" && boardPostions[i][j] !== "BlackKing") {
                break;
            }
            i++;
            j++;
        }
        return false;
    }

    function squareHasPiece(square) {
        if ("Black" === boardPostions[square.attr("row")][square.attr("col")].substring(0, 5)) {
            if (boardPostions[square.attr("row")][square.attr("col")] !== "") {
                selectedPiece.row = parseInt(square.attr("row"));
                selectedPiece.col = parseInt(square.attr("col"));
                selectedPiece.piece = boardPostions[square.attr("row")][square.attr("col")];
                selectedPiece.pieceImg = square.css("background-image");
                console.log(selectedPiece);
                return true;
            }
        } else {
            return false
        }
    }

    function canPromotePawn() {
        if (selectedPiece.piece === "BlackPawn" && selectedPiece.row === 0) {
            $('#promotionMessage').modal('show');
            return true;
        } else {
            return false;
        }
    }

    function checkCastleRights() {
        if (selectedPiece.piece === "BlackKing") {
            blackCanCastleShort = false;
            blackCanCastleLong = false;
        } else if (selectedPiece.piece === "BlackRook" && selectedPiece.col === 0) {
            blackCanCastleLong = false;
        } else if (selectedPiece.piece === "BlackRook" && selectedPiece.col === 7) {
            blackCanCastleShort = false;
        }
    }


    $("#home").click(function () {
        location.href = "./";
    });

    $('#btnHome').click(function () {
        socket.emit("playerExited");
        location.href = './';
    });


    $("#promoteQueen").click(function () {
        $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col) + "]").css("background-image", "url(../imgs/BlackQueen.png");
        boardPostions[selectedPiece.row][selectedPiece.col] = "BlackQueen";
        closeMessage();
    });

    $("#promoteRook").click(function () {
        $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col) + "]").css("background-image", "url(../imgs/BlackRook.png");
        boardPostions[selectedPiece.row][selectedPiece.col] = "BlackRook";
        closeMessage();
    });

    $("#promoteBishop").click(function () {
        $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col) + "]").css("background-image", "url(../imgs/BlackBishop.png");
        boardPostions[selectedPiece.row][selectedPiece.col] = "BlackBishop";
        closeMessage();
    });

    $("#promoteKnight").click(function () {
        $("[row=" + (selectedPiece.row) + " ][col=" + (selectedPiece.col) + "]").css("background-image", "url(../imgs/BlackKnight.png");
        boardPostions[selectedPiece.row][selectedPiece.col] = "BlackKnight";
        closeMessage();
    });

    function closeMessage() {
        $("#promotionMessage").modal('hide');
        toggleDisableBoard();
        clearSelectedSquare();
        resetSelectedPiece();
        socket.emit("player moved", boardPostions);
    }

    socket.on("game over", function () {
        $('#gameStoppedMessage').modal('show');
        $('#gameStoppedTitle').html('Check Mate');
    });

    socket.on("game stopped", function () {
        $('#gameStoppedMessage').modal('show');
        $('#gameStoppedTitle').html('Opponent has left / resigned');
    });

    function moveIsOnTheBoard(row, col) {
        if (row < boardPostions.length && row >= 0 && col < boardPostions.length && col >= 0) {
            return true;
        } else {
            return false;
        }
    }

    function resetSelectedPiece() {
        selectedPiece.row = '';
        selectedPiece.col = '';
        selectedPiece.piece = '';
        selectedPiece.pieceImg = '';
    }

    function toggleDisableBoard() {
        for (let i = 0; i < boardPostions.length; i++) {
            for (let j = 0; j < boardPostions.length; j++) {
                $("[row=" + i + " ][col=" + j + "]").toggleClass("disabled");
            }
        }
    }

    function removeDisableBoard() {
        for (let i = 0; i < boardPostions.length; i++) {
            for (let j = 0; j < boardPostions.length; j++) {
                $("[row=" + i + " ][col=" + j + "]").removeClass("disabled");
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

    function clearSelectedSquare() {
        for (let i = 0; i < boardPostions.length; i++) {
            for (let j = 0; j < boardPostions.length; j++) {
                $("[row=" + i + " ][col=" + j + "]").removeClass("selected");
                $("[row=" + i + " ][col=" + j + "]").removeClass("path");
                $("[row=" + i + " ][col=" + j + "]").removeClass("take");
                $("[row=" + i + " ][col=" + j + "]").removeClass("castle");
                $("[row=" + i + " ][col=" + j + "]").removeClass("check");
            }
        }
    }
});