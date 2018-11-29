///<reference path="Entity.ts" />

class Player extends Entity {

    private _keyboardListener: KeyBoardListener;

    public constructor(
        canvas: HTMLCanvasElement,
        imageSource: string,
        xCoor: number,
        yCoor: number,
        width: number,
        height: number
    ) {
        super(canvas, imageSource, xCoor, yCoor, width, height);

        this._keyboardListener = new KeyBoardListener();
    }

    public move() {
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

    public isColliding(enemy: Entity): boolean {
        if (this.getX() < enemy.getX() + enemy.getWidth() && this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() && this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        return false;
    }
}
