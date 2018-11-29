///<reference path="Entity.ts" />

class Zombie extends Entity {

    public constructor(
        canvas: HTMLCanvasElement,
        imageSource: string,
        xCoor: number,
        yCoor: number,
        width: number,
        height: number
    ) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
    }
}
