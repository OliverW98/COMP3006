$(function () {

    let socket = io("http://localhost:9000");

    $('#startGame').click(function () {

        if ($('#txtPlayerName').val() === "") {
            $('#paraErrorMessage').html("Player Needs a Name.");
        } else {
            socket.emit("player name", $('#txtPlayerName').val());
        }
    });

    socket.on("white player", function () {
        location.href = './whiteBoard'
    });

    socket.on("black player", function () {
        location.href = './blackBoard'
    });


    $('#gameHistory').click(function () {
        location.href = './listChessGames';
    });

});
