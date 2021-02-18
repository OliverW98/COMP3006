let boardFunctions = require("./boardFunctions");

function squareIsInCheck(row, col, selectedPiece, boardPostions) {
    // check for pawns

    if (boardFunctions.moveIsOnTheBoard(row - 1, col + 1, boardPostions) || boardFunctions.moveIsOnTheBoard(row - 1, col - 1, boardPostions)) {
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
        if (boardFunctions.moveIsOnTheBoard(row + kingPostions[i][0], col + kingPostions[i][1], boardPostions)) {
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
        if (boardFunctions.moveIsOnTheBoard(row + knightPostions[i][0], col + knightPostions[i][1], boardPostions)) {
            if (boardPostions[row + knightPostions[i][0]][col + knightPostions[i][1]] === "WhiteKnight") {
                return true;
            }
        }
    }

    //check for rook and queen
    if (boardFunctions.moveIsOnTheBoard(row + 1, col, boardPostions)) {
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
    if (boardFunctions.moveIsOnTheBoard(row - 1, col, boardPostions)) {
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
    if (boardFunctions.moveIsOnTheBoard(row, col + 1, boardPostions)) {
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
    if (boardFunctions.moveIsOnTheBoard(row, col - 1, boardPostions)) {
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
    if (boardFunctions.moveIsOnTheBoard(row + 1, col + 1, boardPostions)) {
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
    if (boardFunctions.moveIsOnTheBoard(row - 1, col + 1, boardPostions)) {
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
    if (boardFunctions.moveIsOnTheBoard(row - 1, col - 1, boardPostions)) {
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
    if (boardFunctions.moveIsOnTheBoard(row + 1, col - 1, boardPostions)) {
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

function revealsACheck(newRow, newCol, selectedPiece, boardPostions) {

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

module.exports.squareIsInCheck = squareIsInCheck;
module.exports.revealsACheck = revealsACheck;