class Canvas {
    constructor(canvas) {
        this.d_canvas = canvas;
        this.d_context = this.d_canvas.getContext('2d');
        this.d_canvas.width = window.innerWidth;
        this.d_canvas.height = window.innerHeight;
    }
    clear() {
        this.d_context.clearRect(0, 0, this.d_canvas.width, this.d_canvas.height);
    }
    getWidth() {
        return this.d_canvas.width;
    }
    getHeight() {
        return this.d_canvas.height;
    }
    writeTextToCanvas(aText, aFontSize, aXpos, aYpos, aColor = "white", aAlignment = "center") {
        this.d_context.font = `${aFontSize}px Minecraft`;
        this.d_context.fillStyle = aColor;
        this.d_context.textAlign = aAlignment;
        this.d_context.fillText(aText, aXpos, aYpos);
    }
    writeImageFromFileToCanvas(aSrc, aXpos, aYpos) {
        let image = new Image();
        image.addEventListener('load', () => {
            this.d_context.drawImage(image, aXpos, aYpos);
        });
        image.src = aSrc;
    }
}
class Entity {
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        this._canvas = new Canvas(canvas);
        this._imageSrc = imageSource;
        this._xPos = xCoor;
        this._yPos = yCoor;
        this._width = width;
        this._height = height;
    }
    draw() {
        this._canvas.writeImageFromFileToCanvas(this._imageSrc, this._xPos, this._yPos);
    }
    getX() {
        return this._xPos;
    }
    getY() {
        return this._yPos;
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }
}
class Game {
    constructor() {
        this._zombie = new Array();
        this.score = 0;
        this.sounds = ['maarDaWasNie', 'waterOofdAd', 'zas', 'boeBoeBoe', 'wum', 'ikKanNieZoGoedPoolsVerstaan'];
        this.draw = () => {
            this._canvas.clear();
            this._player.move();
            this._player.draw();
            for (let i = 0; i < this._zombie.length; i++) {
                if (this._player.isColliding(this._zombie[i])) {
                    this._zombie.splice(i, 1);
                    this.deathsound = `./assets/sounds/Wilco/${this.sounds[this.randomNumber(0, this.sounds.length - 1)]}.mp3`;
                    let audio = new Audio(this.deathsound);
                    if (audio.currentTime > 0) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                    audio.play();
                    this.score++;
                    this._zombie.push(new Zombie(this.canvasElement, './assets/images/enemy/bert.png', this.randomNumber(0, this._canvas.getWidth() - 122), this.randomNumber(0, this._canvas.getHeight() - 149), 122, 149));
                }
                else {
                    this._zombie[i].draw();
                }
            }
            this._canvas.writeTextToCanvas(`Your score is: ${this.score}`, 20, this._canvas.getWidth() - 60, 50, "black", "right");
        };
        this.canvasElement = document.getElementById('canvas');
        this._canvas = new Canvas(this.canvasElement);
        this._player = new Player(this.canvasElement, './assets/images/player/ernieBaseball.png', 100, 100, 165, 133);
        for (let index = 0; index < 3; index++) {
            this._zombie.push(new Zombie(this.canvasElement, './assets/images/enemy/bert.png', this.randomNumber(0, this._canvas.getWidth() - 122), this.randomNumber(0, this._canvas.getHeight() - 149), 122, 149));
        }
        console.log('in game constructor');
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
window.addEventListener('load', init);
function init() {
    const ZombieGame = new Game();
    window.setInterval(ZombieGame.draw, 1000 / 60);
}
class KeyBoardListener {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 65) {
                this.leftPressed = true;
            }
            if (event.keyCode == 68) {
                this.rightPressed = true;
            }
            if (event.keyCode == 87) {
                this.upPressed = true;
            }
            if (event.keyCode == 83) {
                this.downPressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 65) {
                this.leftPressed = false;
            }
            if (event.keyCode == 68) {
                this.rightPressed = false;
            }
            if (event.keyCode == 87) {
                this.upPressed = false;
            }
            if (event.keyCode == 83) {
                this.downPressed = false;
            }
        };
        this.leftPressed = false;
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }
    getLeftPressed() {
        return this.leftPressed;
    }
    getUpPressed() {
        return this.upPressed;
    }
    getRightPressed() {
        return this.rightPressed;
    }
    getDownPressed() {
        return this.downPressed;
    }
}
class Player extends Entity {
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
        this._keyboardListener = new KeyBoardListener();
    }
    move() {
        if (this._keyboardListener.getLeftPressed()) {
            if (this._xPos >= 0) {
                this._xPos -= 5;
            }
        }
        if (this._keyboardListener.getUpPressed()) {
            if (this._yPos >= 0) {
                this._yPos -= 5;
            }
        }
        if (this._keyboardListener.getRightPressed()) {
            if (this._xPos <= this._canvas.getWidth() - 165) {
                this._xPos += 5;
            }
        }
        if (this._keyboardListener.getDownPressed()) {
            if (this._yPos <= this._canvas.getHeight() - 133) {
                this._yPos += 5;
            }
        }
    }
    isColliding(enemy) {
        if (this.getX() < enemy.getX() + enemy.getWidth() && this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() && this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        return false;
    }
}
class Zombie extends Entity {
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
    }
}
//# sourceMappingURL=app.js.map