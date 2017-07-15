/**
 * Created by pavel on 03.06.17.
 */
var model, view;
var gameMusic;
var flameA;

function preload() {
    gameMusic = loadSound('data/661012_Space-Battle.mp3');
    flameA = loadGif('data/spaceshipflame.gif');
}

function setup() {
    createCanvas(800, 700);
    model = new Model();
    view = new View();
    gameMusic.play();
}

function draw() {
    model.updatePosition();
    view.handleControls();
    view.draw();
}