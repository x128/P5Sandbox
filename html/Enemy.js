/**
 * Created by pavel on 04.06.17.
 */
class Enemy {

    constructor(img, x, y, w, h, speedFlying, life, collisionDamage, flame) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedFlying = speedFlying;
        this.life = life;
        this.maxLife = life;
        this.timer = new Timer(0);
        this.collisionDamage = collisionDamage;
        this.flame = flame;
        this.exploding = false;
    }

    resetLife() {
        this.life = this.maxLife;
    }

    resetPosition() {
        this.y = -height;
        this.x = random(width);
    }

    update() {
        this.y += this.speedFlying;
        if (this.y >= height) {
            this.resetPosition();
            this.resetLife();
        }

        this.timer.update();
        if (this.timer.realSeconds() > 0.15) {
            if (this.exploding) {
                this.destroy();
            }
        }

        this.updateLife();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    changeSpeed(speed) {
        this.speedFlying = speed;
    }

    destroy() {
        this.resetPosition();
        this.resetLife();
        this.exploding = false;
    }

    startExplode() {
        this.exploding = true;
        this.timer.reset();
    }

    updateLife() {
        this.life = constrain(this.life, 0, this.maxLife);
    }

    destroyed() {
        if (this.life <= 0) return true;
        return false;
    }

    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
        if (this.life == 1) {
            image(this.flame, this.x + this.w / 4, this.y + this.h / 75, this.w / 2, this.h / 1.5);
        }
    }

}