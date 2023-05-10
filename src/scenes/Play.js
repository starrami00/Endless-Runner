class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load bg music
        this.load.audio('bg_music', './assets/titleBgMusic.wav');
        // load images/tile sprites
        this.load.image('cow', './assets/cow.png');
        this.load.image('asteroid', './assets/asteroid.png');
        this.load.image('earth', './assets/Earth.png');
        this.load.image('space', './assets/spaceBg.png')
        this.load.image('ground', './assets/Ground.png');
        // load spritesheet
        //this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        // move background
        this.ground.tilePositionX -= 2;
        this.spacebg.tilePositionX -= 1;
    
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(asteroid, player) {
        
    }
    

    
    create() {
        const {width, height} = this.scale;
        // play music
        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();
        // place tile sprite
        this.earthbg = this.add.tileSprite(0, 0, 640, 480, 'earth').setOrigin(0, 0);
        this.earthbg.setDepth(3);
        this.spacebg = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0);
        this.ground = this.add.tileSprite(0, 0, 640, 480, 'ground').setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
    }
}
