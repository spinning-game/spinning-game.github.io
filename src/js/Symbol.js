var Symbol = function (imgPath, canvas, x, y, maxY, id, name) {
    this.imgPath = imgPath;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.maxY = maxY;
    this.id = id;
    this.name = name;

    this.gravity = 10;
    this.context = canvas.getContext('2d');

    this.baseImage = new Image();
    this.baseImage.src = this.imgPath;
}

Symbol.prototype.draw = function () {
    var xPos = this.x;
    var yPos = this.y;
    var baseImage = this.baseImage;
    var context = this.context;

    baseImage.onload = function () {
        context.drawImage(baseImage, xPos, yPos);
    }
};

Symbol.prototype.redraw = function () {
    this.context.drawImage(this.baseImage, this.x, this.y);
};

Symbol.prototype.move = function () {
    this.y += this.gravity;

    if (this.y > this.maxY) {
        this.y = 0;
    }
};