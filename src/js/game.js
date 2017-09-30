main();

function main() {
    'use strict';

    var symbols = [];
    var symbolSelectedId;
    var spinInterval;
    var canvas = document.getElementById('symbol-canvas');
    var context = canvas.getContext('2d');
    var select = document.getElementById('select-symbol');
    var btnSpin = document.getElementById('btn-spin');
    var btnImage = document.getElementById('btn-spin-img');
    var resultContainer = document.getElementById('result-container');
    var loader = document.getElementById('loader');

    var spinEnabledImg = 'src/assets/img/BTN_Spin.png';
    var spinDisabledImg = 'src/assets/img/BTN_Spin_d.png'

    var winSound = new Audio('src/assets/sounds/win.wav');
    var loseSound = new Audio('src/assets/sounds/lose.wav');
    var playSound = true;
    var btnSoundImg = document.getElementById('btn-sound-img');
    var soundEnabledIcon = 'src/assets/img/icons/sound-icon.png';
    var soundDisabledIcon = 'src/assets/img/icons/no-sound-icon.png';

    btnSpin.disabled = true;

    //Meking request to json file
    makeGetRequest('src/assets/externalResources.json', function (response) {
        var images = response.images.symbols;
        initImages(images);
    });

    //Initialize symbols
    var initImages = function (images) {
        var maxY = images.length * 155;

        for (var i = 0; i < images.length; i++) {
            var y = i * 155;
            var symbol = new Symbol(images[i].path, canvas, 0, y, maxY, images[i].id, images[i].name);
            symbol.draw();
            symbols.push(symbol);

            //
            createSelectSymbolOption(symbol);
        }

        //remove loader
        loader.parentNode.removeChild(loader);
    };

    var canSpin = function (can) {
        if (can) {
            btnSpin.disabled = false;
            btnImage.src = spinEnabledImg;
        } else {
            btnSpin.disabled = true;
            btnImage.src = spinDisabledImg;
        }
    };

    var resetPositions = function () {
        for (var i = 0; i < symbols.length; i++) {
            var y = i * 155;
            symbols[i].y = y;
        }
    };

    //Create the options for symbol selection
    var createSelectSymbolOption = function (symbol) {
        var opt = document.createElement('option');
        opt.value = symbol.id;
        opt.innerHTML = symbol.name;
        select.appendChild(opt);
    };

    var clearCanvas = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    var spin = function () {
        canSpin(false);
        removeResult();
        Storage.addTotalSpin();
        resetPositions();

        spinInterval = setInterval(function () {

            for (var i = 0; i < symbols.length; i++) {
                symbols[i].move();
            }

            clearCanvas();

            for (var i = 0; i < symbols.length; i++) {
                symbols[i].redraw();
            }

        }, 15);

        checkWin();
    };

    var onSelectSymbol = function () {
        symbolSelectedId = select.value;

        if (symbolSelectedId) {
            canSpin(true);
        } else {
            canSpin(false);
        }
    };

    var getRandomInt = function (low, high) {
        return Math.floor((Math.random() * high) + low);
    };

    var checkWin = function () {
        var randomSymbolIndex = getRandomInt(0, symbols.length);
        var symbolToWin = symbols[randomSymbolIndex];

        setTimeout(function () {
            if (symbolSelectedId == symbolToWin.id) {
                createResultText(true);
                Storage.addTotalWin();
                if (playSound) {
                    winSound.play();
                }
            } else {
                if (playSound) {
                    loseSound.play();
                }
                createResultText(false);
            }

            stopSpining(symbolToWin);

        }, 1500);
    };

    var stopSpining = function (symbolToWin) {
        clearCanvas();
        symbolToWin.y = 0;
        symbolToWin.redraw();
        window.clearInterval(spinInterval);
        canSpin(true);
    };


    var createResultText = function (result) {
        var p = document.createElement('P');
        p.className = 'animate bounceInLeft';

        var text;
        if (result) {
            text = document.createTextNode('YOU WIN');
            p.className += p.className + ' win';
        } else {
            text = document.createTextNode('You lose');
            p.className += p.className + ' lose';
        }

        p.appendChild(text);
        resultContainer.appendChild(p);
    };

    var removeResult = function () {
        resultContainer.innerHTML = '';
    };

    var muteUnmute = function () {
        playSound = !playSound;
        btnSoundImg.src = playSound ? soundEnabledIcon : soundDisabledIcon;
    };

    //Functions to export
    window.onSelectSymbol = onSelectSymbol;
    window.onSpin = spin;
    window.muteUnmute = muteUnmute;
}