var player;
var stars;
var bombs;
var platforms;
var cursors;
var dragons;
var treasure;
var score = 0;
var gameOver = false;
var scoreText;

// Defines the sky portion of the game
class skyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'skyScene', active: true});
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create () {
        // Create Background
        this.add.image(400, 300, 'sky');

        //  Create Platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // Create Player
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //  Player Animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        // Create Stars
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        stars.children.iterate(function (child) {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        bombs = this.physics.add.group();

        //  Score
        scoreText = this.add.text(16, 16, 'score: ', { fontSize: '32px', fill: '#000' });
        scoreText.setText('Score: ' + score);

        //  Add Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks if player collides
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(player, bombs, hitBomb, null, this);
    }

    update() {
        if (gameOver) {
            gameOver = false;
            this.scene.start('groundScene');
            return;
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
        else if (cursors.space.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
        else if (cursors.down.isDown && !player.body.touching.down) {
            player.setVelocityY(330);
        } 
    }
}

// Updates when player collects a star
function collectStar(player, star) {
    star.disableBody(true, true);

    //  Updates Score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        // Resets Stars
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        // Adds Bomb
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}

// Occurs when player contacts a bomb
function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

// Defines the ground portion of the game.
class groundScene extends Phaser.Scene {
    constructor() {
        super({ key: 'groundScene', active: false});
    }

    preload() {
        this.load.image('bg', 'assets/cave.png');
        this.load.image('dragon', 'assets/dragon.png');
        this.load.image('treasure', 'assets/treasure.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        // Create Background
        this.add.image(400, 300, 'bg');

        //  Create Platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(400, 100, 'ground');
        platforms.create(50, 400, 'ground');
        platforms.create(750, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 250, 'ground');

        // Create Player
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        treasure = this.physics.add.sprite(400, 0, 'treasure');
        player.setBounce(0);

        // Create Dragons
        dragons = this.physics.add.group({
            key: 'dragon',
            repeat: 3,
            setXY: { x: 100, y: 0, stepX: 200 }
        });
        dragons.children.iterate(function (child) {
            //  Give each dragon a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setVelocityX(Phaser.Math.FloatBetween(-300, 300));
            child.setCollideWorldBounds(true);
        });

        //  Score
        scoreText = this.add.text(16, 16, 'score: ', { fontSize: '32px', fill: '#000' });
        scoreText.setText('Score: ' + score);

        //  Add Colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(dragons, platforms);
        this.physics.add.collider(dragons, dragons);
        this.physics.add.collider(treasure, platforms);

        //  Checks if player collides
        this.physics.add.overlap(player, dragons, hitDragon, null, this);
        this.physics.add.overlap(player, treasure, collectTreasure, null, this);
    }

    update() {
        if (gameOver) {
            gameOver = false;
            this.scene.start('skyScene');
            return;
        }
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
        else if (cursors.space.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
        else if (cursors.down.isDown && !player.body.touching.down) {
            player.setVelocityY(330);
        } 

        // Randomly Accelerate Dragons
        dragons.children.iterate(function (child) {
            child.setAccelerationX(Phaser.Math.FloatBetween(-500, 500));
        });
    }
}

// Occurs when player contacts a dragon
function hitDragon(player, dragon) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ skyScene, groundScene ]
};

function collectTreasure(player, treasure) {
    score += 100;
    scoreText.setText('Score: ' + score);
    gameOver = true;
}

var game = new Phaser.Game(config);
