let boardFunction = require("./boardFunctions");

function squareIsInCheck(row, col, selectedPiece, boardPostions) {
    // check for pawns
    if (boardFunction.moveIsOnTheBoard(row + 1, col + 1, boardPostions) || boardFunction.moveIsOnTheBoard(row + 1, col - 1, boardPostions)) {
        if (selectedPiece.piece === "WhiteKing" && (boardPostions[row + 1][col + 1] === "BlackPawn"
            || boardPostions[row + 1][col - 1] === "BlackPawn")) {
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
        if (boardFunction.moveIsOnTheBoard(row + kingPostions[i][0], col + kingPostions[i][1], boardPostions)) {
            if (boardPostions[row + kingPostions[i][0]][col + kingPostions[i][1]] === "BlackKing") {
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
        if (boardFunction.moveIsOnTheBoard(row + knightPostions[i][0], col + knightPostions[i][1], boardPostions)) {
            if (boardPostions[row + knightPostions[i][0]][col + knightPostions[i][1]] === "BlackKnight") {
                return true;
            }
        }
    }

    //check for rook and queen
    if (boardFunction.moveIsOnTheBoard(row + 1, col, boardPostions)) {
        for (let i = row + 1; i < boardPostions.length; i++) {
            if (boardPostions[i][col] === "BlackRook" || boardPostions[i][col] === "BlackQueen") {
                return true;
            } else if (boardPostions[i][col].substring(0, 5) === "Black" && (boardPostions[i][col] !== "BlackRook" && boardPostions[i][col] !== "BlackQueen")) {
                break;
            } else if (boardPostions[i][col].substring(0, 5) === "White" && boardPostions[i][col] !== "WhiteKing") {
                break;
            }
        }
    }
    if (boardFunction.moveIsOnTheBoard(row - 1, col, boardPostions)) {
        for (let i = row - 1; i >= 0; i--) {
            if (boardPostions[i][col] === "BlackRook" || boardPostions[i][col] === "BlackQueen") {
                return true;
            } else if (boardPostions[i][col].substring(0, 5) === "Black" && (boardPostions[i][col] !== "BlackRook" && boardPostions[i][col] !== "BlackQueen")) {
                break;
            } else if (boardPostions[i][col].substring(0, 5) === "White" && boardPostions[i][col] !== "WhiteKing") {
                break;
            }
        }
    }
    if (boardFunction.moveIsOnTheBoard(row, col + 1, boardPostions)) {
        for (let i = col + 1; i < boardPostions.length; i++) {
            if (boardPostions[row][i] === "BlackRook" || boardPostions[row][i] === "BlackQueen") {
                return true;
            } else if (boardPostions[row][i].substring(0, 5) === "Black" && (boardPostions[row][i] !== "BlackRook" && boardPostions[row][i] !== "BlackQueen")) {
                break;
            } else if (boardPostions[row][i].substring(0, 5) === "White" && boardPostions[row][i] !== "WhiteKing") {
                break;
            }
        }
    }
    if (boardFunction.moveIsOnTheBoard(row, col - 1, boardPostions)) {
        for (let i = col - 1; i >= 0; i--) {
            if (boardPostions[row][i] === "BlackRook" || boardPostions[row][i] === "BlackQueen") {
                return true;
            } else if (boardPostions[row][i].substring(0, 5) === "Black" && (boardPostions[row][i] !== "BlackRook" && boardPostions[row][i] !== "BlackQueen")) {
                break;
            } else if (boardPostions[row][i].substring(0, 5) === "White" && boardPostions[row][i] !== "WhiteKing") {
                break;
            }
        }
    }

    // check for bishop and queen
    if (boardFunction.moveIsOnTheBoard(row + 1, col + 1, boardPostions)) {
        let i = row + 1;
        let j = col + 1;
        while (i < boardPostions.length && j < boardPostions.length) {
            if (boardPostions[i][j].substring(0, 5) === "White" && boardPostions[i][j] !== "WhiteKing") {
                break;
            } else if (boardPostions[i][j].substring(0, 5) === "Black" && (boardPostions[i][j] !== "BlackBishop" && boardPostions[i][j] !== "BlackQueen")) {
                break;
            } else if (boardPostions[i][j] === "BlackBishop" || boardPostions[i][j] === "BlackQueen") {
                return true;
            }
            i++;
            j++;
        }
    }
    if (boardFunction.moveIsOnTheBoard(row - 1, col + 1, boardPostions)) {
        let i = row - 1;
        let j = col + 1;
        while (i >= 0 && j < boardPostions.length) {
            if (boardPostions[i][j].substring(0, 5) === "White" && boardPostions[i][j] !== "WhiteKing") {
                break;
            } else if (boardPostions[i][j].substring(0, 5) === "Black" && (boardPostions[i][j] !== "BlackBishop" && boardPostions[i][j] !== "BlackQueen")) {
                break;
            } else if (boardPostions[i][j] === "BlackBishop" || boardPostions[i][j] === "BlackQueen") {
                return true;
            }
            i--;
            j++;
        }
    }
    if (boardFunction.moveIsOnTheBoard(row - 1, col - 1, boardPostions)) {
        let i = row - 1;
        let j = col - 1;
        while (i >= 0 && j >= 0) {
            if (boardPostions[i][j].substring(0, 5) === "White" && boardPostions[i][j] !== "WhiteKing") {
                break;
            } else if (boardPostions[i][j].substring(0, 5) === "Black" && (boardPostions[i][j] !== "BlackBishop" && boardPostions[i][j] !== "BlackQueen")) {
                break;
            } else if (boardPostions[i][j] === "BlackBishop" || boardPostions[i][j] === "BlackQueen") {
                return true;
            }
            i--;
            j--;
        }
    }
    if (boardFunction.moveIsOnTheBoard(row + 1, col - 1, boardPostions)) {
        let i = row + 1;
        let j = col - 1;
        while (i < boardPostions.length && j >= 0) {
            if (boardPostions[i][j].substring(0, 5) === "White" && boardPostions[i][j] !== "WhiteKing") {
                break;
            } else if (boardPostions[i][j].substring(0, 5) === "Black" && (boardPostions[i][j] !== "BlackBishop" && boardPostions[i][j] !== "BlackQueen")) {
                break;
            } else if (boardPostions[i][j] === "BlackBishop" || boardPostions[i][j] === "BlackQueen") {
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
        if (boardPostions[i][selectedPiece.col] === "WhiteKing") {
            for (let j = selectedPiece.row + 1; j < boardPostions.length; j++) {
                if (boardPostions[j][selectedPiece.col] === "BlackRook" || boardPostions[j][selectedPiece.col] === "BlackQueen") {
                    if (newCol !== selectedPiece.col) {
                        return true;
                    }
                } else if (boardPostions[j][selectedPiece.col].substring(0, 5) === "White" || boardPostions[j][selectedPiece.col].substring(0, 5) === "Black"
                    && (boardPostions[j][selectedPiece.col] !== "BlackRook" && boardPostions[j][selectedPiece.col] !== "BlackQueen")) {
                    break;
                }
            }
        } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "White" && boardPostions[i][selectedPiece.col] !== "WhiteKing") {
            break;
        }
    }

    for (let i = selectedPiece.row + 1; i < boardPostions.length; i++) {
        if (boardPostions[i][selectedPiece.col] === "WhiteKing") {
            for (let j = selectedPiece.row - 1; j >= 0; j--) {
                if (boardPostions[j][selectedPiece.col] === "BlackRook" || boardPostions[j][selectedPiece.col] === "BlackQueen") {
                    if (newCol !== selectedPiece.col) {
                        return true;
                    }
                } else if (boardPostions[j][selectedPiece.col].substring(0, 5) === "White" || boardPostions[j][selectedPiece.col].substring(0, 5) === "Black"
                    && (boardPostions[j][selectedPiece.col] !== "BlackRook" && boardPostions[j][selectedPiece.col] !== "BlackQueen")) {
                    break;
                }
            }
        } else if (boardPostions[i][selectedPiece.col].substring(0, 5) === "White" && boardPostions[i][selectedPiece.col] !== "WhiteKing") {
            break;
        }
    }

    for (let i = selectedPiece.col - 1; i >= 0; i--) {
        if (boardPostions[selectedPiece.row][i] === "WhiteKing") {
            for (let j = selectedPiece.col + 1; j < boardPostions.length; j++) {
                if (boardPostions[selectedPiece.row][j] === "BlackRook" || boardPostions[selectedPiece.row][j] === "BlackQueen") {
                    if (newRow !== selectedPiece.row) {
                        return true;
                    }
                } else if (boardPostions[selectedPiece.row][j].substring(0, 5) === "White" || boardPostions[selectedPiece.row][j].substring(0, 5) === "Black"
                    && (boardPostions[selectedPiece.row][j] !== "BlackRook" && boardPostions[selectedPiece.row][j] !== "BlackQueen")) {
                    break;
                }
            }
        } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "White" && boardPostions[selectedPiece.row][i] !== "WhiteKing") {
            break;
        }
    }

    for (let i = selectedPiece.col + 1; i < boardPostions.length; i++) {
        if (boardPostions[selectedPiece.row][i] === "WhiteKing") {
            for (let j = selectedPiece.col - 1; j >= 0; j--) {
                if (boardPostions[selectedPiece.row][j] === "BlackRook" || boardPostions[selectedPiece.row][j] === "BlackQueen") {
                    if (newRow !== selectedPiece.row) {
                        return true;
                    }
                } else if (boardPostions[selectedPiece.row][j].substring(0, 5) === "White" || boardPostions[selectedPiece.row][j].substring(0, 5) === "Black"
                    && (boardPostions[selectedPiece.row][j] !== "BlackRook" && boardPostions[selectedPiece.row][j] !== "BlackQueen")) {
                    break;
                }
            }
        } else if (boardPostions[selectedPiece.row][i].substring(0, 5) === "White" && boardPostions[selectedPiece.row][i] !== "WhiteKing") {
            break;
        }
    }

    let i = selectedPiece.row - 1;
    let j = selectedPiece.col - 1;
    while (i >= 0 && j >= 0) {
        if (boardPostions[i][j] === "WhiteKing") {
            let k = selectedPiece.row + 1;
            let l = selectedPiece.col + 1;
            while (k < boardPostions.length && l < boardPostions.length) {
                if (boardPostions[k][l] === "BlackBishop" || boardPostions[k][l] === "BlackQueen") {
                    if ((newRow - selectedPiece.row) === (newCol - selectedPiece.col)) {
                        break;
                    } else {
                        return true;
                    }
                } else if (boardPostions[k][l].substring(0, 5) === "White" || boardPostions[k][l].substring(0, 5) === "Black"
                    && (boardPostions[k][l] !== "BlackBishop" && boardPostions[k][l] !== "BlackQueen")) {
                    break;
                }
                k++;
                l++;
            }
        } else if (boardPostions[i][j].substring(0, 5) === "White" && boardPostions[i][j] !== "WhiteKing") {
            break;
        }
        i--;
        j--;
    }

    i = selectedPiece.row - 1;
    j = selectedPiece.col + 1;
    while (i >= 0 && j < boardPostions.length) {
        if (boardPostions[i][j] === "WhiteKing") {
            let k = selectedPiece.row + 1;
            let l = selectedPiece.col - 1;
            while (k < boardPostions.length && l >= 0) {
                if (boardPostions[k][l] === "BlackBishop" || boardPostions[k][l] === "BlackQueen") {
                    if ((selectedPiece.row - newRow) === (newCol - selectedPiece.col)) {
                        break;
                    } else {
                        return true;
                    }
                } else if (boardPostions[k][l].substring(0, 5) === "White" || boardPostions[k][l].substring(0, 5) === "Black"
                    && (boardPostions[k][l] !== "BlackBishop" && boardPostions[k][l] !== "BlackQueen")) {
                    break;
                }
                k++;
                l--;
            }
        } else if (boardPostions[i][j].substring(0, 5) === "White" && boardPostions[i][j] !== "WhiteKing") {
            break;
        }
        i--;
        j++;
    }

    i = selectedPiece.row + 1;
    j = selectedPiece.col - 1;
    while (i < boardPostions.length && j >= 0) {
        if (boardPostions[i][j] === "WhiteKing") {
            let k = selectedPiece.row - 1;
            let l = selectedPiece.col + 1;
            while (k >= 0 && l < boardPostions.length) {
                if (boardPostions[k][l] === "BlackBishop" || boardPostions[k][l] === "BlackQueen") {
                    if ((newRow - selectedPiece.row) === (selectedPiece.col - newCol)) {
                        break;
                    } else {
                        return true;
                    }
                } else if (boardPostions[k][l].substring(0, 5) === "White" || boardPostions[k][l].substring(0, 5) === "Black"
                    && (boardPostions[k][l] !== "BlackBishop" && boardPostions[k][l] !== "BlackQueen")) {
                    break;
                }
                k--;
                l++;
            }
        } else if (boardPostions[i][j].substring(0, 5) === "White" && boardPostions[i][j] !== "WhiteKing") {
            break;
        }
        i++;
        j--;
    }

    i = selectedPiece.row + 1;
    j = selectedPiece.col + 1;
    while (i < boardPostions.length && j < boardPostions.length) {
        if (boardPostions[i][j] === "WhiteKing") {
            let k = selectedPiece.row - 1;
            let l = selectedPiece.col - 1;
            while (k >= 0 && l >= 0) {
                if (boardPostions[k][l] === "BlackBishop" || boardPostions[k][l] === "BlackQueen") {
                    if ((selectedPiece.row - newRow) === (selectedPiece.col - newCol)) {
                        break;
                    } else {
                        return true;
                    }
                } else if (boardPostions[k][l].substring(0, 5) === "White" || boardPostions[k][l].substring(0, 5) === "Black"
                    && (boardPostions[k][l] !== "BlackBishop" && boardPostions[k][l] !== "BlackQueen")) {
                    break;
                }
                k--;
                l--;
            }
        } else if (boardPostions[i][j].substring(0, 5) === "White" && boardPostions[i][j] !== "WhiteKing") {
            break;
        }
        i++;
        j++;
    }

    return false;
}


module.exports.squareIsInCheck = squareIsInCheck;
module.exports.revealsACheck = revealsACheck;
