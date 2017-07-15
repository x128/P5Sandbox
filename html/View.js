/**
 * Created by pavel on 03.06.17.
 */
class View {

    draw() {
        background(0);

        this.drawStars();
        this.drawAsteroids();
        this.drawBullets();
        this.drawBonuses();
        this.drawEnemies();
        this.drawSpaceship();

        this.showPoints();
        this.showLevel();
        this.showSpaceshipLife();

        if (model.declareTheLevel)
            this.declareLevel();

        if (model.isPlaying == false) {
            this.showMenu();
        }

    }

    declareLevel() {
        fill(200, 0, 0);
        stroke(200, 0, 0);
        strokeWeight(1);
        textSize(35);
        text('Level ' + model.level, width / 2 - 50, height / 2);
    }

    showMenu() {
        fill(255);
        stroke(255);
        strokeWeight(1);
        textSize(20);
        text('Нажмите пробел для игры', width / 2 - 140, height / 2);
        text('Нажмите "s" чтобы выключить/включить звук', width / 2 - 220, height / 2 + 20);
    }

    drawBonuses() {
        model.firstAidKit.draw();
        model.kalash.draw();
        model.shield.draw();
        model.machineGun.draw();
        model.money.draw();
        model.GrenadeLauncher.draw();
    }

    showLevel() {
        fill(255);
        stroke(255);
        strokeWeight(1);
        textSize(15);
        text('Level ' + model.level, width - 100, 50);
    }

    showPoints() {
        fill(255);
        stroke(255);
        strokeWeight(1);
        textSize(15);
        text('Points ' + model.points, width - 100, 20);
    }

    drawExplosionOn(x, y, w, h) {
        image(model.explosion, x, y, w, h);
    }

    drawAsteroids() {
        for (var i = 0; i < model.asteroids.length; i ++) {
            model.asteroids[i].draw();
            if (model.asteroids[i].exploding) {
                this.drawExplosionOn(model.asteroids[i].x, model.asteroids[i].y, model.asteroids[i].w, model.asteroids[i].h);
            }
        }
    }

    drawSpaceship() {
        model.spaceship.draw();
        if (model.spaceship.protectionBonusOn) {
            noFill();
            strokeWeight(5);
            stroke(0, 200, 0);
            ellipse(model.spaceship.x + model.spaceship.w / 2, model.spaceship.y + model.spaceship.h / 2, model.spaceship.w, model.spaceship.h);
        }
    }

    drawEnemies() {
        for (var i = 0; i < model.enemies.length; i ++) {
            model.enemies[i].draw();
            if (model.enemies[i].exploding) {
                this.drawExplosionOn(model.enemies[i].x, model.enemies[i].y, model.enemies[i].w, model.enemies[i].h);
            }


        }

        for (var i = 0; i < model.enemies2.length; i ++) {
            model.enemies2[i].draw();
            if (model.enemies2[i].exploding) {
                this.drawExplosionOn(model.enemies2[i].x, model.enemies2[i].y, model.enemies2[i].w, model.enemies2[i].h);
            }
        }
    }

    showSpaceshipLife() {
        strokeWeight(1);
        stroke(255);
        noFill();
        rect(10, 20, 100, 4);
        fill(255);
        noStroke();
        rect(10, 21, map(model.spaceship.life, 0, model.spaceship.maxLife, 0, 100), 3);
        textSize(10);
        text('Life ' + round(map(model.spaceship.life, 0, model.spaceship.maxLife, 0, 100)) + ' %', 10, 15);
    }

    drawBullets() {
        for (var i = model.bullets.length - 1; i >= 0; i --) {
            model.bullets[i].draw();
        }

        for (var i = model.enemy1Bullets.length - 1; i >= 0; i --) {
            model.enemy1Bullets[i].draw();
        }

        for (var i = model.enemy2Bullets.length - 1; i >= 0; i --) {
            model.enemy2Bullets[i].draw();
        }
    }

    drawStars() {
        for (var i = 0; i < model.stars.length; i ++) {
            model.stars[i].draw();
        }
    }

    handleControls() {

    }
}

function keyPressed() {
    if (keyCode == 39) {
        model.moveSpaceshipRight();
    } else if (keyCode == 37) {
        model.moveSpaceshipLeft();
    }

    if (model.isPlaying == false) {
        if (keyCode == 32) {
            model.startTheGame();
        }
    }

    if (keyCode == 83) {
        model.switchMusic();
    }
}

function keyReleased() {
    if (keyCode == 39) {
        model.stopSpaceship();
    } else if (keyCode == 37) {
        model.stopSpaceship();
    }
}