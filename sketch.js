var PLAY = 1;
var END = 0;
var gameState = 1;
var submarine, submarineImage;
var gameOverImage, gameOver;
var jewel1, jewel1image, jewel2, jewel2image, jewel3, jewel3image, jewel4, jewel4image;
//var survivalTime = 0;
var jewelCollected = 0;
var invisibleGround;
var bg0, backgroundImg;
var Torpedoes = 5;
var Ammo = 100;
var torpedo, torpedoImg;
var torpedoRefuel, torpedoRefuelImg;
var fish1, fish2, fish3, fish4, fish5, fish6, fish7, fish8, fish9, fish10, fish11, fish12, fish13;
var diverSurprise, treasureSurprise;
var errorSound, emptyGunSound, gunCocksound, themeSong;
var bulletShoot, bulletShootImage;
var ammoRefuelImg, ammoRefuel;
var torpedoReleaseSound, bulletShootSound, coinSound;
var fish1Image, fish2Image, fish3Image, fish4Image, fish5Image, fish6Image, fish7Image, fish8Image, fish9Image;


function preload() {
    backgroundImg = loadImage("seaBackground4x.jpg");
    submarineImage = loadImage("submarine(1).png");
    torpedoImg = loadImage("torpedoSubmarine.png");
    errorSound = loadSound("error_sound.mp3");
    bulletShootImage = loadImage("bulletAnimation-remove.png");
    torpedoRefuelImg = loadImage("torpedoRefuel-removebg-preview.png");
    ammoRefuelImg = loadImage("bulletRefuel-removebg-preview.png");
    torpedoReleaseSound = loadSound("torpedoSound.mp3");
    bulletShootSound = loadSound("GunSilencer.mp3");
    fish1Image = loadImage("orangeFish.png");
    fish2Image = loadImage("starFish1.png");
    fish3Image = loadImage("blueFish2.png");
    fish4Image = loadImage("pufferfish.png");
    fish5Image = loadImage("seaHorse.png");
    fish6Image = loadImage("seaHorse3.png");
    fish7Image = loadImage("violetFish.png");
    fish8Image = loadImage("yellowFish.png");
    fish9Image = loadImage("rainbowFish.png");
    emptyGunSound = loadSound("GunEmpty.mp3");
    gunCocksound = loadSound("GunCock.mp3");
    coinSound = loadSound("coin.mp3");
    jewel1image = loadImage("jewel1.png");
    jewel2image = loadImage("jewel2.png");
    jewel3image = loadImage("jewel3.png");
    jewel4image = loadImage("jewel4.png");
    //themeSound = loadSound("themeSong.mp3");
}




function setup() {
    createCanvas(5800, 2500);

    //for background
    bg0 = createSprite(1900, 700, 600, 600);
    bg0.addImage("bg0", backgroundImg);
    //bg0.scale = 2.5;
    bg0.velocityX = -15

    //for submarine
    submarine = createSprite(1250, 660, 20, 20);
    submarine.addImage(submarineImage);
    submarine.scale = 2.8;

    //for reducing collision radius
    submarine.setCollider("rectangle", 0, -10, 500, 80)
        //submarine.debug = true;



    //for invisibleBedrock
    invisibleGround = createSprite(2250, 2050, 4500, 10)
    invisibleGround.visible = false;

    //for groups
    jewel1group = new Group();
    jewel2group = new Group();
    jewel3group = new Group();
    jewel4group = new Group();
    torpedoGroup = new Group();
    torpedoRefuelGroup = new Group();
    fish1Group = new Group();
    fish2Group = new Group();
    fish3Group = new Group();
    fish4Group = new Group();
    fish5Group = new Group();
    fish6Group = new Group();
    fish7Group = new Group();
    fish8Group = new Group();
    fish9Group = new Group();
    fish10Group = new Group();
    fish11Group = new Group();
    fish12Group = new Group();
    fish13Group = new Group();
    bulletShootGroup = new Group();
    ammoRefuelGroup = new Group();

}


function draw() {
    background(0);

    if (gameState === PLAY) { //for background
        if (bg0.x < 0) {
            bg0.x = bg0.width / 2;
        }

        //for submarine movement
        //for movement
        if (keyDown("d") && submarine.x < 1600 || keyDown(RIGHT_ARROW) && submarine.x < 1600) {
            submarine.x = submarine.x + 10;
        }

        if (keyDown("a") && submarine.x > 620 || keyDown(LEFT_ARROW) && submarine.x > 620) {
            submarine.x = submarine.x - 10;
        }
        if (keyDown("w") && submarine.y > 200 || keyDown(UP_ARROW) && submarine.y > 200) {
            submarine.y = submarine.y - 10;
        }
        if (keyDown("s") && submarine.y < 2050 || keyDown(DOWN_ARROW) && submarine.y < 2050) {
            submarine.y = submarine.y + 10;
        }
        //for collison of monkey
        submarine.collide(invisibleGround)

        //for shooting torpedo
        if (keyWentDown("space") && Torpedoes > 0) {
            shootTorpedo();
            Torpedoes = Torpedoes - 1
            torpedoReleaseSound.play();
        }

        if (keyWentDown("space") && Torpedoes < 1) {
            errorSound.play();
        }


        //for shooting bullet
        if (mouseWentDown("leftButton") && Ammo > 0) {
            shootBullet();
            Ammo = Ammo - 1
            bulletShootSound.play();
        }

        if (mouseWentDown("leftButton") && Ammo < 1) {
            emptyGunSound.play();
        }

        //for torpedorefuel
        spawnTorpedoRefuel();
        if (torpedoRefuelGroup.isTouching(submarine)) {
            Torpedoes = Torpedoes + 1;
            torpedoRefuelGroup.destroyEach();
            gunCocksound.play();
        }

        //for ammo refuel
        spawnAmmoRefuel();
        if (ammoRefuelGroup.isTouching(submarine)) {
            Ammo = Ammo + 10;
            gunCocksound.play();
            ammoRefuelGroup.destroyEach();
        }

        //for spawning fishes
        spawnFish1();
        spawnFish2();
        spawnFish3();
        spawnFish4();
        spawnFish5();
        spawnFish6();
        spawnFish7();
        spawnFish8();
        spawnFish9();

        //for spawning jewels1
        spawnJewel1();
        if (jewel1group.isTouching(submarine)) {
            jewelCollected = jewelCollected + Math.round(random(5, 15));
            coinSound.play();
            jewel1group.destroyEach();
        }

        //for spawning jewels2
        spawnJewel2();
        if (jewel2group.isTouching(submarine)) {
            jewelCollected = jewelCollected + Math.round(random(10, 25));
            coinSound.play();
            jewel2group.destroyEach();
        }

        //for spawning jewels3
        spawnJewel3();
        if (jewel3group.isTouching(submarine)) {
            jewelCollected = jewelCollected + Math.round(random(2, 16));
            coinSound.play();
            jewel3group.destroyEach();
        }

        //for spawning jewels4
        spawnJewel4();
        if (jewel4group.isTouching(submarine)) {
            jewelCollected = jewelCollected + Math.round(random(5, 17));
            coinSound.play();
            jewel4group.destroyEach();
        }
        //for looping sound
        //themeSound.loop(true)
    }




    drawSprites();
    /////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //for torpedoes
    stroke(0);
    textSize(100);
    fill(240, 72, 119);
    text("Torpedoes Left: " + Torpedoes, 10, 100);



    //for bulletsAMMO
    stroke(0);
    textSize(75);
    fill(240, 72, 119);
    text("Bullets Left: " + Ammo, 10, 200);

    //for jewelCollected
    stroke(0);
    textSize(75);
    fill(240, 72, 119);
    text("Jewels Collected: " + jewelCollected, 4900, 100);



    //for info
    if (frameCount < 300) {
        stroke(255);
        textSize(75);
        fill(207, 157, 23);
        text("PRESS SPACE FOR TORPEDOES AND LEFT MOUSE BUTTON FOR BULLETS ", 2000, 100);

    }
}


//Functions for basic game functionality
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//for shoot torpedo

function shootTorpedo() {
    torpedo = createSprite(440, 200, 50, 5);
    torpedo.addImage(torpedoImg);
    //torpedo.scale = 0.356778;
    torpedo.velocityX = 30;
    torpedo.y = submarine.y;
    torpedo.x = submarine.x + 100
    torpedo.lifetime = 195;
    torpedoGroup.add(torpedo);
}

//for shoot bullet

function shootBullet() {
    bulletShoot = createSprite(440, 200, 50, 5);
    bulletShoot.addImage(bulletShootImage);
    bulletShoot.scale = 1;
    bulletShoot.velocityX = 70;
    bulletShoot.y = submarine.y;
    bulletShoot.x = submarine.x + 100
    bulletShoot.lifetime = 100;
    bulletShootGroup.add(bulletShoot);
}

//forrandomly appearing ammo
function spawnTorpedoRefuel() {
    if (frameCount % 4500 === 0) {
        torpedoRefuel = createSprite(5800, 120, 40, 10);
        torpedoRefuel.y = Math.round(random(1500, 2100));
        torpedoRefuel.addImage(torpedoRefuelImg);
        torpedoRefuel.velocityX = -8;

        //assign lifetime to the variable
        torpedoRefuel.lifetime = 725;

        //adjust the depth
        torpedoRefuel.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;

        //add each cloud to the group
        torpedoRefuelGroup.add(torpedoRefuel);
        torpedoRefuel.scale = 1.2;

        //for reducing collision radius
        torpedoRefuel.setCollider("rectangle", 0, 0, 300, 60)
            //torpedoRefuel.debug = true;
    }
}
//for ammo refuel//forrandomly appearing ammo

function spawnAmmoRefuel() {
    if (frameCount % 2500 === 0) {
        ammoRefuel = createSprite(5800, 120, 40, 10);
        ammoRefuel.y = Math.round(random(1000, 2400));
        ammoRefuel.addImage(ammoRefuelImg);
        ammoRefuel.velocityX = -38;

        //assign lifetime to the variable
        ammoRefuel.lifetime = 325;

        //adjust the depth
        ammoRefuel.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;

        //add each cloud to the group
        ammoRefuelGroup.add(ammoRefuel);
        ammoRefuel.scale = 0.7;

        //for reducing collision radius
        //ammoRefuel.setCollider("rectangle", 0, 0, 300, 60)
        //ammoRefuel.debug = true;
    }
}

//for fish1
function spawnFish1() {
    if (frameCount % 500 === 0) {
        fish1 = createSprite(0, 300, 20, 20);
        fish1.addImage(fish1Image);
        fish1.y = Math.round(random(350, 2400));
        fish1.velocityX = Math.round(random(7, 28));
        fish1.velocityY = -7;
        fish1.lifetime = 830;
        fish1Group.add(fish1);
        fish1.scale = 0.7;
        fish1.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for fish2
function spawnFish2() {
    if (frameCount % 850 === 0) {
        fish2 = createSprite(0, 300, 20, 20);
        fish2.addImage(fish2Image);
        fish2.y = Math.round(random(1200, 2400));
        fish2.velocityX = 7;
        fish2.lifetime = 830;
        fish2Group.add(fish2);
        fish2.scale = 0.4;
        fish2.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for fish3
function spawnFish3() {
    if (frameCount % 1050 === 0) {
        fish3 = createSprite(0, 300, 20, 20);
        fish3.addImage(fish3Image);
        fish3.y = Math.round(random(800, 2400));
        fish3.velocityX = 15;
        fish3.lifetime = 390;
        fish3Group.add(fish3);
        fish3.scale = 0.8;
        fish3.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for fish4
function spawnFish4() {
    if (frameCount % 1550 === 0) {
        fish4 = createSprite(5800, 300, 20, 20);
        fish4.addImage(fish4Image);
        fish4.y = Math.round(random(750, 2400));
        fish4.velocityX = -25;
        fish4.lifetime = 390;
        fish4Group.add(fish4);
        fish4.scale = 0.5;
        fish4.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for fish5
function spawnFish5() {
    if (frameCount % 1950 === 0) {
        fish5 = createSprite(5800, 300, 20, 20);
        fish5.addImage(fish5Image);
        fish5.y = Math.round(random(950, 2400));
        fish5.velocityX = -20;
        fish5.lifetime = 290;
        fish5Group.add(fish5);
        fish5.scale = 0.16;
        fish5.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for fish6
function spawnFish6() {
    if (frameCount % 2350 === 0) {
        fish6 = createSprite(5800, 300, 20, 20);
        fish6.addImage(fish6Image);
        fish6.y = Math.round(random(500, 2400));
        fish6.velocityX = -25;
        fish6.lifetime = 235;
        fish6Group.add(fish6);
        fish6.scale = 1.4;
        fish6.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for fish7
function spawnFish7() {
    if (frameCount % 1650 === 0) {
        fish7 = createSprite(0, 300, 20, 20);
        fish7.addImage(fish7Image);
        fish7.y = Math.round(random(1000, 2400));
        fish7.velocityX = Math.round(random(30, 50));
        fish7.velocityY = -30;
        fish7.lifetime = 235;
        fish7Group.add(fish7);
        fish7.scale = 0.4;
        fish7.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for fish8
function spawnFish8() {
    if (frameCount % 2850 === 0) {
        fish8 = createSprite(5800, 300, 20, 20);
        fish8.addImage(fish8Image);
        fish8.y = Math.round(random(300, 2400));
        fish8.velocityX = -25;
        fish8.lifetime = 235;
        fish8Group.add(fish8);
        fish8.scale = 1;
        fish8.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for fish9
function spawnFish9() {
    if (frameCount % 2150 === 0) {
        fish9 = createSprite(5800, 300, 20, 20);
        fish9.addImage(fish9Image);
        fish9.y = Math.round(random(600, 2400));
        fish9.velocityX = -25;
        fish9.lifetime = 235;
        fish9Group.add(fish9);
        fish9.scale = 1;
        fish9.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for jewel1 
function spawnJewel1() {
    if (frameCount % 3550 === 0) {
        jewel1 = createSprite(5800, 300, 20, 20);
        jewel1.addImage(jewel1image);
        jewel1.y = Math.round(random(600, 2400));
        jewel1.velocityX = -25;
        jewel1.lifetime = 235;
        jewel1group.add(jewel1);
        jewel1.scale = 0.6;
        jewel1.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}

//for jewel2
function spawnJewel2() {
    if (frameCount % 2500 === 0) {
        jewel2 = createSprite(5800, 300, 20, 20);
        jewel2.addImage(jewel2image);
        jewel2.y = Math.round(random(600, 2400));
        jewel2.velocityX = Math.round(random(-30, -55));
        jewel2.lifetime = 200;
        jewel2group.add(jewel2);
        jewel2.scale = 0.6;
        jewel2.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;


        //for reducing collision radius
        jewel2.setCollider("rectangle", 0, 0, 300, 30)
            //jewel2.debug = true;
    }
}


//for jewel3
function spawnJewel3() {
    if (frameCount % 3270 === 0) {
        jewel3 = createSprite(5800, 300, 20, 20);
        jewel3.addImage(jewel3image);
        jewel3.y = Math.round(random(600, 2400));
        jewel3.velocityX = Math.round(random(-30, -55));
        jewel3.lifetime = 200;
        jewel3group.add(jewel3);
        jewel3.scale = 0.38;
        jewel3.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;


        //for reducing collision radius
        jewel3.setCollider("rectangle", 0, 0, 300, 30)
            //jewel3.debug = true;
    }
}


//for jewel4
function spawnJewel4() {
    if (frameCount % 4450 === 0) {
        jewel4 = createSprite(5800, 300, 20, 20);
        jewel4.addImage(jewel4image);
        jewel4.y = Math.round(random(600, 2400));
        jewel4.velocityX = Math.round(random(-30, -45));
        jewel4.lifetime = 200;
        jewel4group.add(jewel4);
        jewel4.scale = 0.6;
        jewel4.depth = submarine.depth;
        submarine.depth = submarine.depth + 1;
    }
}