/**
 * Created by pavel on 03.06.17.
 */
class Spaceship {

    constructor(img, x, y, w, h, speed, speedTurning, life, flame) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.speedTurning = speedTurning;
        this.xChange = 0;
        this.life = life;
        this.isDestroyed = false;
        this.maxLife = life;
        this.flame = flame;
        this.timerProtection = new Timer(0);
        this.protectionBonusOn = false;
        this.protectionFrames = 0;
        this.gun = 'standart';
        this.timerBeforeUsualGun = new Timer(0);
        this.secondsBeforeUsualGun = 0;
    }

    turn(steps) {
        // this.x += steps;
        this.xChange = steps;
    }

    speedUp() {
        this.speed = this.speed * 1.45;
    }

    collisionsWithAsteroid(asteroid) {
        if (this.x + this.w >= asteroid.x && this.x <= asteroid.x + asteroid.w && this.y + this.h >= asteroid.y && this.y <= asteroid.y + asteroid.h) {
            return true;
        }

        return false;
    }

    collisionsWithBonus(bonus) {
        if (this.x + this.w >= bonus.x && this.x <= bonus.x + bonus.w && this.y + this.h >= bonus.y && this.y <= bonus.y + bonus.h) {
            return true;
        }

        return false;
    }

    protectionFor(frames) {
        this.protectionBonusOn = true;
        this.timerProtection.reset();
        this.protectionFrames = frames;
    }

    collisionsWithEnemy(enemy) {
        if (this.x + this.w >= enemy.x && this.x <= enemy.x + enemy.w && this.y + this.h >= enemy.y && this.y <= enemy.y + enemy.h) {
            return true;
        }

        return false;
    }

    updateLife() {
        this.life = constrain(this.life, 0, this.maxLife);
    }

    destroyed() {
        if (this.life <= 0) {
            return true;
        }

        return false;
    }

    updateBonuses() {
        this.timerProtection.update();
        if (this.timerProtection.realSeconds() >= this.protectionFrames / 100) {
            this.protectionBonusOn = false;
        }

        this.timerBeforeUsualGun.update();
        if (this.timerBeforeUsualGun.realSeconds() >= this.secondsBeforeUsualGun) {
            this.gun = 'standart';
        }
    }

    updatePosition() {
        this.x += this.xChange;
        this.x = constrain(this.x, 0, width - this.w);
    }

    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
        if (this.life <= 0) {
            image(this.flame, this.x, this.y, this.w, this.h);
        }
    }
}