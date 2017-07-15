/**
 * Created by pavel on 03.06.17.
 */
class Star {

    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;

    }

    changeSpeed(speed) {
        this.speed = speed;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        fill(255);
        strokeWeight(1);
        stroke(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    updatePosition() {
        this.y += this.speed;
        if (this.y - this.r > height) {
            this.y = -this.r;
            this.x = random(width);
        }
    }
}