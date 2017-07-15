/**
 * Created by pavel on 03.06.17.
 */
class Asteroid {

    constructor(img, x, y, w, h, speedFalling, damage) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedFalling = speedFalling;
        this.exploding = false;
        this.timer = new Timer(0);
        this.damage = damage;
        this.minSize = 0;
        this.maxSize = 0;
    }

    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
    }

    startExplode() {
        this.exploding = true;
        this.timer.reset();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setSize(size) {
        this.w = size;
        this.h = size;
    }

    changeSpeed(speed) {
        this.speedFalling = speed;
    }

    randomizeSize(a, b) {
        this.minSize = a;
        this.maxSize = b;
    }

    destroy() {
        this.y = - this.h - 300;
        this.x = random(width);
        this.w = random(this.minSize, this.maxSize);
        this.h = random(this.minSize, this.maxSize);
    }

    update() {
        this.y += this.speedFalling;
        if (this.y >= height) {
            this.y = - this.h;
            this.x = random(width);
        }

        this.timer.update();
        if (this.timer.realSeconds() > 0.15) {
            if (this.exploding) {
                this.exploding = false;
                this.destroy();
            }
        }

    }


}