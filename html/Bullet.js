/**
 * Created by pavel on 03.06.17.
 */
class Bullet {

    constructor(x, y, r, speedY, speedX) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speedY;
        if (speedX !== undefined) {
            this.speedX = speedX;
        } else {
            this.speedX = 0;
        }

        this.cl = color(200, 0, 0);
        this.damage = 1;
    }

    changeSpeed(speed) {
        this.speed = speed;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    collisionsWithAsteroid(asteroid) {
        if (this.x + this.r >= asteroid.x && this.x - this.r <= asteroid.x + asteroid.w && this.y + this.r >= asteroid.y && this.y - this.r<= asteroid.y + asteroid.h) {
            return true;
        }

        return false;
    }


    collisionWithSpaceship(spaceship) {
        if (this.x + this.r >= spaceship.x && this.x - this.r <= spaceship.x + spaceship.w && this.y + this.r >= spaceship.y && this.y - this.r <= spaceship.y + spaceship.h) {
            return true;
        }

        return false;
    }

    collisionsWithEnemy(enemy) {
        if (this.x + this.r >= enemy.x && this.x - this.r <= enemy.x + enemy.w && this.y + this.r >= enemy.y && this.y - this.r <= enemy.y + enemy.h) {
            return true;
        }

        return false;
    }

    setColor(cl) {
        this.cl = cl;
    }

    draw() {
        fill(this.cl);
        stroke(this.cl);
        strokeWeight(1);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    updatePosition() {
        this.y -= this.speed;
        this.x += this.speedX;
    }
}