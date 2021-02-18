let chai = require("chai");
let boardFunctions = require("./boardFunctions.js");
let whiteFunctions = require("./whiteFunctions.js");
let blackFunctions = require("./blackFunctions.js");

suite("Test board", function () {
    test("Test the moves is on the board", function () {


        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let rowToCheck = 0;
        let colToCheck = 0;

        let result = boardFunctions.moveIsOnTheBoard(rowToCheck, colToCheck, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "move should on the board");

        rowToCheck = 7;
        colToCheck = 0;

        result = boardFunctions.moveIsOnTheBoard(rowToCheck, colToCheck, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "move should on the board");

        rowToCheck = 0;
        colToCheck = 7;

        result = boardFunctions.moveIsOnTheBoard(rowToCheck, colToCheck, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "move should on the board");

        rowToCheck = 7;
        colToCheck = 7;

        result = boardFunctions.moveIsOnTheBoard(rowToCheck, colToCheck, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "move should on the board");

        rowToCheck = 11;
        colToCheck = 0;
        result = boardFunctions.moveIsOnTheBoard(rowToCheck, colToCheck, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "move shouldn't on the board");

        rowToCheck = -1;
        colToCheck = 0;
        result = boardFunctions.moveIsOnTheBoard(rowToCheck, colToCheck, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "move shouldn't on the board");

        rowToCheck = 1;
        colToCheck = 11;
        result = boardFunctions.moveIsOnTheBoard(rowToCheck, colToCheck, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "move shouldn't on the board");

        rowToCheck = 1;
        colToCheck = -1;
        result = boardFunctions.moveIsOnTheBoard(rowToCheck, colToCheck, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "move shouldn't on the board");
    });
});

suite("Test white board", function () {
    test("Test if square is in check by rook/queen up", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let boardPostions = [
            ["", "", "", "BlackRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let rowToCheck = 1;
        let colToCheck = 3;

        let result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "BlackQueen", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "BlackQueen", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhitePawn", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        rowToCheck = 3;
        colToCheck = 3;

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");


    });

    test("Test if square is in check by rook/queen right", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 1;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "BlackRook"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");


        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "BlackQueen"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "WhitePawn", "", "BlackQueen"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by rook/queen left", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 1;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["BlackRook", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["BlackQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["BlackQueen", "WhitePawn", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by rook/queen up down", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 1;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackRook", "", "", "", ""]
        ];

        let result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackQueen", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhitePawn", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackQueen", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");

    });

    test("Test if square is in check by bishop/queen top right", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "BlackBishop", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "BlackQueen", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "BlackQueen", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "WhitePawn", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");

    });

    test("Test if square is in check by bishop/queen bottom right", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "BlackBishop"]
        ];

        let result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "BlackQueen"]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "WhitePawn", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "BlackQueen"]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by bishop/queen bottom left", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["BlackBishop", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["BlackQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "WhitePawn", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["BlackQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by bishop/queen top left", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 3;

        let boardPostions = [
            ["BlackBishop", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["BlackQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["BlackQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "WhitePawn", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if a check is revealed up", function () {

        let selectedPiece = {row: 3, col: 3, piece: 'WhiteRook', pieceImg: ''};


        let rowToCheck = 3;
        let colToCheck = 2;

        let boardPostions = [
            ["", "", "", "BlackRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteKing", "", "", "", ""]
        ];

        let result = whiteFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should reveal a check");


        boardPostions = [
            ["", "", "", "BlackRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhitePawn", "", "", "", ""],
            ["", "", "", "WhiteRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteKing", "", "", "", ""]
        ];

        result = whiteFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't reveal a check");

    });

    test("Test if a check is revealed left", function () {

        let selectedPiece = {row: 3, col: 3, piece: 'WhiteRook', pieceImg: ''};

        let rowToCheck = 2;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["BlackRook", "", "", "WhiteRook", "", "", "", "WhiteKing"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = whiteFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should reveal a check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["BlackRook", "", "WhitePawn", "WhiteRook", "", "", "", "WhiteKing"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't reveal a check");

    });

    test("Test if a check is revealed down", function () {

        let selectedPiece = {row: 3, col: 3, piece: 'WhiteRook', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 2;

        let boardPostions = [
            ["", "", "", "WhiteKing", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackRook", "", "", "", ""]
        ];

        let result = whiteFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should reveal a check");


        boardPostions = [
            ["", "", "", "WhiteKing", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteRook", "", "", "", ""],
            ["", "", "", "WhitePawn", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackRook", "", "", "", ""]
        ];

        result = whiteFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't reveal a check");

    });

    test("Test if a check is revealed right", function () {

        let selectedPiece = {row: 3, col: 3, piece: 'WhiteRook', pieceImg: ''};

        let rowToCheck = 2;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["WhiteKing", "", "", "WhiteRook", "", "", "", "BlackRook"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = whiteFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should reveal a check");


        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["WhiteKing", "", "", "WhiteRook", "WhitePawn", "", "", "BlackRook"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = whiteFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't reveal a check");

    });
});
suite("Test black board", function () {
    test("Test if square is in check by rook/queen up", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let boardPostions = [
            ["", "", "", "WhiteRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let rowToCheck = 1;
        let colToCheck = 3;

        let result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "WhiteQueen", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");


        rowToCheck = 3;
        colToCheck = 3;

        boardPostions = [
            ["", "", "", "WhiteQueen", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackPawn", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");

    });

    test("Test if square is in check by rook/queen right", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 1;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "WhiteRook"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");


        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "WhiteQueen"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "BlackPawn", "", "WhiteQueen"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by rook/queen left", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 1;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["WhiteRook", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["WhiteQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["WhiteQueen", "", "BlackPawn", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by rook/queen up down", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 1;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteRook", "", "", "", ""]
        ];

        let result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteQueen", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackPawn", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteQueen", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by bishop/queen top right", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "WhiteBishop", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "WhiteQueen", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "WhiteQueen", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "BlackPawn", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by bishop/queen bottom right", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "WhiteBishop"]
        ];

        let result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "WhiteQueen"]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "BlackPawn", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "WhiteQueen"]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by bishop/queen bottom left", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["WhiteBishop", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["WhiteQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "BlackPawn", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["WhiteQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if square is in check by bishop/queen top left", function () {

        let selectedPiece = {row: '', col: '', piece: 'WhiteKing', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 3;

        let boardPostions = [
            ["WhiteBishop", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["WhiteQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should be in check");

        boardPostions = [
            ["WhiteQueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "WhitePawn", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.squareIsInCheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't be in check");
    });

    test("Test if a check is revealed up", function () {

        let selectedPiece = {row: 3, col: 3, piece: 'BlackRook', pieceImg: ''};


        let rowToCheck = 3;
        let colToCheck = 2;

        let boardPostions = [
            ["", "", "", "WhiteRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackKing", "", "", "", ""]
        ];

        let result = blackFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should reveal a check");

        boardPostions = [
            ["", "", "", "WhiteRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackPawn", "", "", "", ""],
            ["", "", "", "BlackRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackKing", "", "", "", ""]
        ];

        result = blackFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't reveal a check");

    });

    test("Test if a check is revealed left", function () {

        let selectedPiece = {row: 3, col: 3, piece: 'BlackRook', pieceImg: ''};

        let rowToCheck = 2;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["WhiteRook", "", "", "BlackRook", "", "", "", "BlackKing"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = blackFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should reveal a check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["WhiteRook", "", "BlackPawn", "BlackRook", "", "", "", "BlackKing"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't reveal a check");

    });

    test("Test if a check is revealed down", function () {

        let selectedPiece = {row: 3, col: 3, piece: 'BlackRook', pieceImg: ''};

        let rowToCheck = 3;
        let colToCheck = 2;

        let boardPostions = [
            ["", "", "", "BlackKing", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackRook", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteRook", "", "", "", ""]
        ];

        let result = blackFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should reveal a check");


        boardPostions = [
            ["", "", "", "BlackKing", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "BlackRook", "", "", "", ""],
            ["", "", "", "BlackPawn", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "WhiteRook", "", "", "", ""]
        ];

        result = blackFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't reveal a check");
    });

    test("Test if a check is revealed right", function () {

        let selectedPiece = {row: 3, col: 3, piece: 'BlackRook', pieceImg: ''};

        let rowToCheck = 2;
        let colToCheck = 3;

        let boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["BlackKing", "", "", "BlackRook", "", "", "", "WhiteRook"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        let result = blackFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, true, "square should reveal a check");

        boardPostions = [
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["BlackKing", "", "", "BlackRook", "BlackPawn", "", "", "WhiteRook"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""]
        ];

        result = blackFunctions.revealsACheck(rowToCheck, colToCheck, selectedPiece, boardPostions);
        chai.assert.isBoolean(result, "Result should be boolean");
        chai.assert.equal(result, false, "square shouldn't reveal a check");

    });
});