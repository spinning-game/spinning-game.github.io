'use strict';

storage();
function storage() {

    var canStore = typeof (window.Storage) !== 'undefined';
    var totalSpins = document.getElementById('total-spins');
    var totalWins = document.getElementById('total-wins');
    var sessionSpins = document.getElementById('session-spins');
    var sessionWins = document.getElementById('session-wins');

    var initScores = function () {
        var totalScore = localStorage.getItem('totalScore');
        if (totalScore) {
            totalScore = JSON.parse(totalScore);
        }
        updateTotalScoreOnView(totalScore);

        var sessionScore = sessionStorage.getItem('sessionScore');
        if (sessionScore) {
            sessionScore = JSON.parse(sessionScore);
        }
        updateSessionScoreOnView(sessionScore);
    };

    var addTotalSpin = function () {
        var score = localStorage.getItem('totalScore');
        if (score) {
            score = JSON.parse(score);
            score.spins++;
        } else {
            score = {
                spins: 1,
                wins: 0
            };
        }
        localStorage.setItem('totalScore', JSON.stringify(score));
        updateTotalScoreOnView(score);
        addSessionSpin();
    };

    var addTotalWin = function () {
        var score = JSON.parse(localStorage.getItem('totalScore'));
        score.wins++;
        localStorage.setItem('totalScore', JSON.stringify(score));
        updateTotalScoreOnView(score);
        addSessionWin();
    };

    var updateTotalScoreOnView = function (score) {
        totalSpins.innerHTML = "Total spins: " + (score ? score.spins : 0);
        totalWins.innerHTML = "Total wins: " + (score ? score.wins : 0);
    };

    var addSessionSpin = function () {
        var score = sessionStorage.getItem('sessionScore');
        if (score) {
            score = JSON.parse(score);
            score.spins++;
        } else {
            score = {
                spins: 1,
                wins: 0
            };
        }
        sessionStorage.setItem('sessionScore', JSON.stringify(score));
        updateSessionScoreOnView(score);
    };

    var addSessionWin = function () {
        var score = JSON.parse(sessionStorage.getItem('sessionScore'));
        score.wins++;
        sessionStorage.setItem('sessionScore', JSON.stringify(score));
        updateSessionScoreOnView(score);
    };

    var updateSessionScoreOnView = function (score) {
        sessionSpins.innerHTML = "Round spins: " + (score ? score.spins : 0);
        sessionWins.innerHTML = "Round wins: " + (score ? score.wins : 0);
    };

    var resetTotals = function() {
        localStorage.clear();
        initScores();
        resetSession();
    };

    var resetSession = function () {
        sessionStorage.clear();
        initScores();
    };

    initScores();

    //Export functions
    window.Storage = {
        addTotalSpin: addTotalSpin,
        addTotalWin: addTotalWin,
        resetTotals: resetTotals,
        resetSession: resetSession
    };

}