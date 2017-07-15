/**
 * Created by pavel on 03.06.17.
 */
class Model {

    constructor() {
        this.stars = [];
        this.bullets = [];
        this.asteroids = [];
        this.enemies = [];
        this.enemies2 = [];
        this.enemy1Bullets = [];
        this.enemy2Bullets = [];

        this.loadEnemiesPictures();
        this.loadSpaceshipFlame();
        this.createSpaceship();
        this.createEnemies();
        this.createStars();
        this.createBonuses();
        this.createAsteroids();
        this.loadExplosionGif();
        this.createEnemiesBullets();

        this.timerBlusting = new Timer(0);
        this.timerSpeedIncrease = new Timer(0);
        this.timerLevelDeclaring = new Timer(0);
        this.points = 0;
        this.level = 1;
        this.isPlaying = false;
        this.declareTheLevel = false;
    }

    loadEnemiesPictures() {
        this.enemy1Image = loadImage('data/enemy1.png');
        this.enemy2Image = loadImage('data/enemy2.png');
    }

    switchMusic() {
        if (gameMusic.isPlaying()) {
            gameMusic.stop();
        } else {
            gameMusic.play();
        }
    }

    startTheGame() {
        this.spaceship.gun = 'standart';

        var a = this.bullets.length;

        this.bullets = [];
        this.enemies = [];
        this.enemies2 = [];
        this.enemy1Bullets = [];
        this.enemy2Bullets = [];
        this.asteroids = [];

        this.createEnemies();
        this.createEnemiesBullets();
        this.createAsteroids();

        this.declareTheLevel = false;

        this.points = 0;
        this.level = 1;
        this.timerSpeedIncrease.reset();
        this.timerLevelDeclaring.target = 0;

        this.spaceship.speed = 2;
        this.updateSpeeds();

        this.isPlaying = true;
        this.spaceship.isDestroyed = false;
        this.spaceship.life = this.spaceship.maxLife;

        this.firstAidKit.setPosition(random(width), -height * random(1.5, 3));
        this.kalash.setPosition(random(width), -height * random(3, 6));
        this.shield.setPosition(random(width), -height * random(1.5, 3));
        this.machineGun.setPosition(random(width), -height * random(2.5, 5));
        this.money.setPosition(random(width), -height * random(5, 8));
        this.GrenadeLauncher.setPosition(random(width), -height * random(2, 4.5));

    }

    fillMatrixArrayWithUndefined(rows,columns){
        var arr = [];
        for(var i=0; i<columns; i++) {
            arr[i] = [];
            for(var j=0; j<rows; j++) {
                arr[i][j] = undefined;
            }
        }

        return arr;
    }

    createEnemiesBullets() {
        for (var i = 0; i < this.enemies.length; i ++) {
            this.enemy1Bullets[i] = new Bullet(this.enemies[i].x + this.enemies[i].w / 2, this.enemies[i].y + this.enemies[i].h, 5, -1.5 - this.spaceship.speed);
            this.enemy1Bullets[i].setColor(color(0, 0, 200));
            this.enemy1Bullets[i].damage = 3;
        }

        for (var i = 0; i < this.enemies2.length; i ++) {
            this.enemy2Bullets[i] = new Bullet(this.enemies2[i].x + this.enemies2[i].w / 2, this.enemies2[i].y + this.enemies2[i].h, 7, -1 - this.spaceship.speed);
            this.enemy2Bullets[i].setColor(color(0, 0, 200));
            this.enemy2Bullets[i].damage = 5;
        }
    }

    loadSpaceshipFlame() {
        this.flame = flameA;
    }

    loadExplosionGif() {
        this.explosion = loadGif('data/explosion.gif');
    }

    createStars() {
        for (var i = 0; i < 35; i ++) {
            this.stars[i] = new Star(random(width), random(height), 3, this.spaceship.speed);
        }
    }

    moveSpaceshipLeft() {
        if (this.spaceship.destroyed() == false)
        this.spaceship.turn(-this.spaceship.speedTurning);
    }

    moveSpaceshipRight() {
        if (this.spaceship.destroyed() == false)
        this.spaceship.turn(this.spaceship.speedTurning);
    }

    spaceshipBlust() {
        if (this.spaceship.gun == 'standart' || this.spaceship.gun == 'machineGun') {
            this.createBullet(this.spaceship.x + this.spaceship.w / 2, this.spaceship.y, 5, 10);
        } else if (this.spaceship.gun == 'kalash') {
            for (var i = 0; i < 3; i ++) {
                this.createBullet(this.spaceship.x + this.spaceship.w / 2, this.spaceship.y, 5, 10, -5 + 5 * i);
            }

        }
    }

    createBullet(x, y, radius, speedY, speedX) {
        if (speedY !== undefined) {
            this.bullets.push(new Bullet(x, y, radius, speedY, speedX));
        } else {
            this.bullets.push(new Bullet(x, y, radius, speedY));

        }
    }

    stopSpaceship() {
        this.spaceship.turn(0);
    }

    createSpaceship() {
        var spaceShipWidth = 90;
        var spaceshipHeight = 110;
        var spaceshipImage = loadImage('data/spaceship.png');

        this.spaceship = new Spaceship(spaceshipImage, width / 2 - spaceShipWidth / 2, height - spaceshipHeight, spaceShipWidth, spaceshipHeight, 2, 7, 100, this.flame);
    }

    createEnemies() {
        for (var i = 0; i < 2; i ++) {
            var spaceShipWidth = 60;
            var spaceshipHeight = 90;
            this.enemies[i] = new Enemy(this.enemy1Image, random(width), -height, spaceShipWidth, spaceshipHeight, this.spaceship.speed + 1, 3, 15, this.flame);
        }

        // for (var i = 0; i < 1; i ++) {
        // }
    }

    updateEnemies() {
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
        }

        for (var i = 0; i < this.enemies2.length; i ++) {
            this.enemies2[i].update();
        }
    }

    createBonuses() {
        this.firstAidKit = new Bonus(loadImage('data/First-Aid-Kit.png'), random(width), -height * random(1.5, 3), 50, 50, this.spaceship.speed);
        this.kalash = new Bonus(loadImage('data/kalash.png'), random(width), -height * random(3, 6), 50, 50, this.spaceship.speed);
        this.shield = new Bonus(loadImage('data/ShieldBonus.png'), random(width), -height * random(3.5, 7), 50, 50, this.spaceship.speed);
        this.machineGun = new Bonus(loadImage('data/machine_gun.png'), random(width), -height * random(2.5, 5), 50, 50, this.spaceship.speed);
        this.money = new Bonus(loadImage('data/points.png'), random(width), -height * random(5, 8), 50, 50, this.spaceship.speed);
        this.GrenadeLauncher = new Bonus(loadImage('data/GrenadeLauncher.png'), random(width), -height * random(2, 4.5), 50, 50, this.spaceship.speed);

    }

    updateFirstAidKitBonus() {
        this.firstAidKit.updatePosition();
        if (this.spaceship.collisionsWithBonus(this.firstAidKit)) {
            this.spaceship.life += this.spaceship.maxLife / 4;
            this.firstAidKit.setPosition(random(width), -height * random(1.5, 3));
        }

        if (this.firstAidKit.y >= height) {
            this.firstAidKit.y = -height * random(1.5, 3);
            this.firstAidKit.x = random(width);
        }
    }

    updateKalashBonus() {
        this.kalash.updatePosition();
        if (this.spaceship.collisionsWithBonus(this.kalash)) {
            this.spaceship.secondsBeforeUsualGun = 10;
            this.spaceship.gun = 'kalash';
            this.spaceship.timerBeforeUsualGun.reset();
            this.kalash.setPosition(random(width), -height * random(3, 6));
        }

        if (this.kalash.y >= height) {
            this.kalash.y = -height * random(3, 6);
            this.kalash.x = random(width);
        }
    }

    updateShieldBonus() {
        this.shield.updatePosition();

        if (this.spaceship.collisionsWithBonus(this.shield)) {
            this.spaceship.protectionFor(600);
            this.shield.setPosition(random(width), -height * random(3.5, 7));
        }

        if (this.shield.y >= height) {
            this.shield.y = -height * random(3.5, 7);
            this.shield.x = random(width);
        }
    }

    updateMachineGun() {
        this.machineGun.updatePosition();

        if (this.spaceship.collisionsWithBonus(this.machineGun)) {
            this.spaceship.secondsBeforeUsualGun = 10;
            this.spaceship.gun = 'machineGun';
            this.spaceship.timerBeforeUsualGun.reset();
            this.machineGun.setPosition(random(width), -height * random(2.5, 5));
        }

        if (this.machineGun.y >= height) {
            this.machineGun.y = -height * random(2.5, 5);
            this.machineGun.x = random(width);
        }
    }

    updateMoneyBonus() {
        this.money.updatePosition();

        if (this.spaceship.collisionsWithBonus(this.money)) {
            this.points += 100;
            this.money.setPosition(random(width), -height * random(5, 8));
        }

        if (this.money.y >= height) {
            this.money.y = -height * random(5, 8);
            this.money.x = random(width);
        }
    }

    updateGrenadeLauncher() {
        this.GrenadeLauncher.updatePosition();

        if (this.spaceship.collisionsWithBonus(this.GrenadeLauncher)) {
            for (var x = 5; x < width; x += 25) {
                this.createBullet(x, height + 300, 5, 10);
            }
            this.GrenadeLauncher.setPosition(random(width), -height * random(2, 4.5));
        }

        if (this.GrenadeLauncher.y >= height) {
            this.GrenadeLauncher.y = -height * random(2, 4.5);
            this.GrenadeLauncher.x = random(width);
        }
    }

    updateBonuses() {
        this.updateFirstAidKitBonus();
        this.updateKalashBonus();
        this.updateShieldBonus();
        this.updateMachineGun();
        this.updateMoneyBonus();
        this.updateGrenadeLauncher();
    }

    createAsteroids() {
        for (var i = 0; i < 7; i ++) {
            var asteroidSize = random(30, 50);
            var speedFalling = map(asteroidSize, 30, 50, 0.75, 1.5);
            this.asteroids[i] = new Asteroid(loadImage('data/asteroid.png'), random(width), -asteroidSize, asteroidSize, asteroidSize, speedFalling + this.spaceship.speed, 10);
            this.asteroids[i].randomizeSize(30, 50);
        }
    }

    updateAsteroids() {
        for (var i = 0; i < this.asteroids.length; i ++) {
            this.asteroids[i].update();
        }
    }

    updateStarsPosition() {
        for (var i = 0; i < 35; i ++) {
            this.stars[i].updatePosition();
        }
    }

    updateSpaceship() {
        this.spaceship.updatePosition();
        this.updateCollisions();
        this.spaceship.updateLife();
        this.spaceship.updateBonuses();
        if (this.spaceship.destroyed()) {
            // this.spaceship.y = 1000;
            this.spaceship.isDestroyed = true;
            this.isPlaying = false;
        }
    }

    updateCollisions() {
        for (var i = 0; i < this.asteroids.length; i ++) {
            if (this.spaceship.protectionBonusOn == false) {
                if (this.spaceship.collisionsWithAsteroid(this.asteroids[i])) {
                    this.spaceship.life -= this.asteroids[i].damage;
                    this.asteroids[i].startExplode();
                    this.spaceship.protectionFor(18);
                }
            }
        }

        if (this.spaceship.protectionBonusOn == false) {
            for (var i = 0; i < this.enemies.length; i ++) {
                if (this.spaceship.collisionsWithEnemy(this.enemies[i])) {
                    this.spaceship.life -= this.enemies[i].collisionDamage;
                    this.enemies[i].startExplode();
                    this.spaceship.protectionFor(18);
                }
            }
        }

        if (this.spaceship.protectionBonusOn == false) {
            for (var i = 0; i < this.enemies2.length; i ++) {
                if (this.spaceship.collisionsWithEnemy(this.enemies2[i])) {
                    this.spaceship.life -= this.enemies2[i].collisionDamage;
                    this.enemies2[i].startExplode();
                    this.spaceship.protectionFor(18);
                }
            }
        }

    }

    updateBulletsPosition() {
        for (var i = this.bullets.length - 1; i >= 0; i --) {
            this.bullets[i].updatePosition();

            if (this.bullets[i].y + this.bullets[i].r <= 0) {
                this.bullets.splice(i, 1);
            }

            for (var j = 0; j < this.asteroids.length; j ++) {

                if (this.bullets[i] !== undefined) {

                    if (this.bullets[i].collisionsWithAsteroid(this.asteroids[j])) {
                        if (this.asteroids[j].exploding == false) {
                            this.asteroids[j].startExplode();
                            this.bullets.splice(i, 1);
                            this.points += 1;
                        }
                    }
                }

            }

            for (var j = 0; j < this.enemies.length; j ++) {
                if (this.bullets[i] !== undefined) {

                    if (this.bullets[i].collisionsWithEnemy(this.enemies[j])) {
                        if (this.enemies[j].exploding == false) {
                            this.enemies[j].life -= this.bullets[i].damage;
                            this.bullets.splice(i, 1);
                            if (this.enemies[j].destroyed()) {
                                this.enemies[j].startExplode();
                                this.points += 2;
                            } else {
                                this.points += 1;
                            }
                        }
                    }
                }
            }

            for (var j = 0; j < this.enemies2.length; j ++) {
                if (this.bullets[i] !== undefined) {
                    if (this.bullets[i].collisionsWithEnemy(this.enemies2[j])) {
                        if (this.enemies2[j].life > 0) {
                            this.enemies2[j].life -= this.bullets[i].damage;
                            this.bullets.splice(i, 1);
                            if (this.enemies2[j].destroyed()) {
                                this.enemies2[j].startExplode();
                                this.points += 3;
                            } else {
                                this.points += 1;
                            }
                        }
                    }
                }

            }


        }
    }

    updateEnemiesBulletsPosition() {
        for (var i = 0; i < this.enemy1Bullets.length; i ++) {
            this.enemy1Bullets[i].updatePosition();
            if (this.enemy1Bullets[i].y - this.enemy1Bullets[i].r >= height) {
                this.enemy1Bullets[i].y = this.enemies[i].y + this.enemies[i].h;
                this.enemy1Bullets[i].x = this.enemies[i].x + this.enemies[i].w / 2;
            }

            if (this.spaceship.protectionBonusOn == false) {
                if (this.enemy1Bullets[i].collisionWithSpaceship(this.spaceship)) {
                    this.spaceship.life -= this.enemy1Bullets[i].damage;
                    this.enemy1Bullets[i].y = this.enemies[i].y + this.enemies[i].h;
                    this.enemy1Bullets[i].x = this.enemies[i].x + this.enemies[i].w / 2;
                }
            }
        }

        for (var i = 0; i < this.enemy2Bullets.length; i ++) {
            this.enemy2Bullets[i].updatePosition();
            if (this.enemy2Bullets[i].y - this.enemy2Bullets[i].r >= height) {
                this.enemy2Bullets[i].y = this.enemies2[i].y + this.enemies2[i].h;
                this.enemy2Bullets[i].x = this.enemies2[i].x + this.enemies2[i].w / 2;
            }

            if (this.spaceship.protectionBonusOn == false) {
                if (this.enemy2Bullets[i].collisionWithSpaceship(this.spaceship)) {
                    this.spaceship.life -= this.enemy2Bullets[i].damage;
                    this.enemy2Bullets[i].y = this.enemies2[i].y + this.enemies2[i].h;
                    this.enemy2Bullets[i].x = this.enemies2[i].x + this.enemies2[i].w / 2;
                }
            }
        }
    }

    updateTimerBlusting() {
        this.timerBlusting.update();

        var secondsBeforeBlust = 0.3;

        if (this.spaceship.gun == 'machineGun') {
            secondsBeforeBlust = 0.1;
        } else {
            secondsBeforeBlust = 0.3;
        }

        if (this.timerBlusting.realSeconds() >= secondsBeforeBlust) {
            this.timerBlusting.reset();
            if (this.spaceship.isDestroyed == false) {
                this.spaceshipBlust();
            }
        }
    }

    declareLevel() {
        this.timerLevelDeclaring.reset();
        this.declareTheLevel = true;
        this.timerLevelDeclaring.target = 2;
    }

    updateTimerDeclaringLevel() {
        this.timerLevelDeclaring.update();
        if (this.timerLevelDeclaring.fullSeconds() == this.timerLevelDeclaring.target) {
            this.declareTheLevel = false;
        }
    }

    updateTimerSpeedincrease() {
        this.timerSpeedIncrease.update();
        if (this.timerSpeedIncrease.fullMinutes() == 1) {
            this.timerSpeedIncrease.reset();
            if (this.spaceship.isDestroyed == false) {
                this.spaceship.speedUp();
                this.level ++;
                this.declareLevel();
                this.spaceship.life += this.spaceship.maxLife;
                this.updateSpeeds();

                if (this.level == 2) {
                    this.enemies2.push(new Enemy(this.enemy2Image, random(width), -height * random(1.25, 2.5), 90, 130, this.spaceship.speed + 0.25, 7, 30, this.flame));
                }

                if (this.level == 3) {
                    var spaceShipWidth = 60;
                    var spaceshipHeight = 90;
                    this.enemies.push(new Enemy(this.enemy1Image, random(width), -height, spaceShipWidth, spaceshipHeight, this.spaceship.speed + 1, 3, 15, this.flame));
                    // this.enemy1Bullets.push(new Bullet(this.enemies[this.enemies.length].x + this.enemies[this.enemies.length].w / 2, this.enemies[this.enemies.length].y + this.enemies[this.enemies.length].h, 5, -1.5 - this.spaceship.speed));
                    // this.enemy1Bullets[this.enemy1Bullets.length].cl = color(0, 0, 200);
                }

                if (this.level == 4) {
                    var spaceShipWidth = 60;
                    var spaceshipHeight = 90;
                    this.enemies2.push(new Enemy(this.enemy2Image, random(width), -height * random(1.25, 2.5), 90, 130, this.spaceship.speed + 0.25, 7, 30, this.flame));
                }

                if (this.level == 5) {
                    var spaceShipWidth = 60;
                    var spaceshipHeight = 90;
                    this.enemies.push(new Enemy(this.enemy1Image, random(width), -height, spaceShipWidth, spaceshipHeight, this.spaceship.speed + 1, 3, 15, this.flame));
                }

                if (this.level == 6) {
                    this.enemies2.push(new Enemy(this.enemy2Image, random(width), -height * random(1.25, 2.5), 90, 130, this.spaceship.speed + 0.25, 7, 30, this.flame));
                }

                if (this.level == 7) {
                    var spaceShipWidth = 60;
                    var spaceshipHeight = 90;
                    this.enemies.push(new Enemy(this.enemy1Image, random(width), -height, spaceShipWidth, spaceshipHeight, this.spaceship.speed + 1, 3, 15, this.flame));
                }


                this.createEnemiesBullets();

            }
        }
    }

    updateSpeeds() {
        for (var i = 0; i < 35; i ++) {
            this.stars[i].changeSpeed(this.spaceship.speed);
        }

        for (var i = 0; i < this.enemies.length; i ++) {
            this.enemy1Bullets[i].changeSpeed(-this.spaceship.speed - 2);
        }

        for (var i = 0; i < this.enemies2.length; i ++) {
            this.enemy2Bullets[i].changeSpeed(-this.spaceship.speed - 1.25);
        }

        for (var i = 0; i < this.enemies.length; i ++) {
            this.enemies[i].changeSpeed(this.spaceship.speed + 1);
        }

        for (var i = 0; i < this.enemies2.length; i ++) {
            this.enemies2[i].changeSpeed(this.spaceship.speed + 0.25);
        }

        for (var i = 0; i < 7; i ++) {
            var speedFalling = map(this.asteroids[i].w, 30, 50, 1.5, 0.75);
            this.asteroids[i].changeSpeed(speedFalling + this.spaceship.speed, 10);
        }


    }

    updatePosition() {
        if (this.isPlaying) {
            this.updateTimerBlusting();
            this.updateTimerSpeedincrease();
            this.updateStarsPosition();
            this.updateEnemies();
            this.updateBulletsPosition();
            this.updateEnemiesBulletsPosition();
            this.updateAsteroids();
            this.updateBonuses();
            this.updateSpaceship();
            this.updateTimerDeclaringLevel();
        }
    }
}