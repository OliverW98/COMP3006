$(function () {

    let socket = io("http://localhost:9000");

    socket.emit("get chess games");

    socket.on("load chess games", function (data) {

        console.log(data);
        showGames(data);
        populateSelectBox(data);
    });

    $('#home').click(function () {
        location.href = './';
    });

    $('#viewGame').click(function () {
        socket.emit("gameid to view", $('#selectGame').val());
        location.href = './viewChessGame';
    });


    function populateSelectBox(games) {

        for (i = 0; i < games.length; i++) {
            var opt = document.createElement("option");
            opt.value = games[i]._id;
            opt.innerHTML = games[i].whitePlayer + " vs " + games[i].blackPlayer;

            $('#selectGame').append(opt);

        }

    }

    function showGames(games) {

        for (i = 0; i < games.length; i++) {
            let whitePlayer = games[i].whitePlayer;
            let blackPlayer = games[i].blackPlayer;
            let noOfMoves = games[i].moves.length - 1;
            let winner;
            if (noOfMoves % 2 === 0) {
                winner = "Black";
            } else {
                winner = "White";
            }
            $("#services").append("<tr>" +
                "<td class=\"playerCol\">" + whitePlayer + "</td>" +
                "<td class=\"playerCol\">" + blackPlayer + "</td>" +
                "<td class=\"infoCol\">" + winner + "</td>" +
                "<td class=\"infoCol\">" + noOfMoves + "</td>" +
                "<input id='viewGame' type='button'>View</input>" +
                "</tr>");
        }
    }

});