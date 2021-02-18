function moveIsOnTheBoard(row, col, boardPostions) {
    if (row < boardPostions.length && row >= 0 && col < boardPostions.length && col >= 0) {
        return true;
    } else {
        return false;
    }
}

module.exports.moveIsOnTheBoard = moveIsOnTheBoard;