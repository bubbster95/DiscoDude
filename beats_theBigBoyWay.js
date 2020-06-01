    var myGamePiece;

    function startGame() {
        myGamePiece = new component(30, 30, "assets/BlueButton.png", 10, 120, "image");
        myGameArea.start();
    }

    var myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 480;
            this.canvas.height = 270;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop: function () {
            clearInterval(this.interval);
        }
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.speedX = 1;
        this.speedY = 0;
        this.x = -10;
        this.y = 100;

        this.update = function () {
            ctx = myGameArea.context;
            if (type == "image") {
                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
            }

        }
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

    function updateGameArea() {
        myGameArea.clear();
        myGamePiece.newPos();
        myGamePiece.update();
    }