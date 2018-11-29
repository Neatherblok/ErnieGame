class Game {

    private readonly canvasElement: HTMLCanvasElement
    private readonly _canvas: Canvas;
    private readonly _player: Player;
    private _zombie = new Array<Zombie>();
    private score: number = 0;
    private sounds = ['maarDaWasNie', 'waterOofdAd', 'zas', 'boeBoeBoe', 'wum', 'ikKanNieZoGoedPoolsVerstaan'];
    private deathsound: string


    constructor() {
        this.canvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this._canvas = new Canvas(this.canvasElement);
        this._player = new Player(this.canvasElement, './assets/images/player/ernieBaseball.png', 100, 100, 165, 133);
        for (let index = 0; index < 3; index++) {
            this._zombie.push(new Zombie(this.canvasElement, './assets/images/enemy/bert.png', this.randomNumber(0, this._canvas.getWidth() - 122), this.randomNumber(0, this._canvas.getHeight() - 149), 122, 149));
        }


        console.log('in game constructor');
    }

    public draw = () => {
        this._canvas.clear();
        this._player.move();
        this._player.draw();
        for (let i = 0; i < this._zombie.length; i++) {
            if (this._player.isColliding(this._zombie[i])) {
                this._zombie.splice(i, 1);
                this.deathsound = `./assets/sounds/Wilco/${this.sounds[this.randomNumber(0, this.sounds.length - 1)]}.mp3`;
                let audio: HTMLAudioElement = new Audio(this.deathsound);
                if (audio.currentTime > 0) {
                    audio.pause()
                    audio.currentTime = 0
                }
                audio.play();
                this.score++;
                this._zombie.push(new Zombie(this.canvasElement, './assets/images/enemy/bert.png', this.randomNumber(0, this._canvas.getWidth() - 122), this.randomNumber(0, this._canvas.getHeight() - 149), 122, 149));

            } else {
                this._zombie[i].draw();
            }
        }
        this._canvas.writeTextToCanvas(`Your score is: ${this.score}`, 20, this._canvas.getWidth() - 60, 50, "black", "right");

    }


    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }


}

window.addEventListener('load', init);

function init(): void {
    const ZombieGame = new Game();
    window.setInterval(ZombieGame.draw, 1000 / 60)
}
