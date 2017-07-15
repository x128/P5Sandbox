/**
 * Created by pavel on 04.06.17.
 */
class Bonus {

    constructor(img, x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.img = img;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    changeSpeed(speed) {
        this.speed = speed;
    }

    updatePosition() {
        this.y += this.speed;
    }

    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}