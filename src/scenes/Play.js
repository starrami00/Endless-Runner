class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load bg music
        this.load.audio('bg_music', './assets/SpaceMusic.wav');
        // load images/tile sprites
        this.load.image('star', './assets/particle.png');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship2', './assets/spaceship2.png');
        this.load.image('spacebg', './assets/spacebg.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        this.spacebg.tilePositionX -= 4;
        this.p1Rocket.update();
        // update spaceship (x3)
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(!this.gameOver) {
            // update rocket sprite
            this.p1Rocket.update();
            // update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship. y) {
            // particle emmiter
            this.add.particles(ship.x, ship.y, 'star', {
                speed: 100,
                lifespan: 500,
                gravityY: 200,
                stopAfter: 10
            });
            return true;
        } else {
            return false;
        }
    }
    

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
         // play explode animation
        boom.anims.play('explode'); 
        // callback after anim completes           
        boom.on('animationcomplete', () => { 
            // reset ship position   
            ship.reset();   
            // make ship visible again                     
            ship.alpha = 1;
            // remove explosion sprite                       
            boom.destroy(); 
            // flash FIRE text
            this.tweens.add({
                targets: this.fireText,
                alpha: 0,
                duration: 100,
                yoyo: true,
                repeat: 3
                });                      
        }); 
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // add time to clock 
        this.countDownTime += 2;
        // play random sfx
        let explosionSounds = ['sfx_explosion1', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4'];
        let soundIndex = Phaser.Math.Between(0, explosionSounds.length - 1);
        this.sound.play(explosionSounds[soundIndex]); 
    }

    countDown() {
        let finalConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        finalConfig.fixedWidth = 0;
        if(this.countDownTime != 0){
            this.countDownTime -= 1;
            this.speedUpTime -= 1;
            this.timerText.setText('Countdown: ' + this.countDownTime);
        } else {
            // end game
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', finalConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', finalConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        // increase rocket speed after 30 sec
        let speedIncrease = 1.5;
        if(this.speedUpTime == 0){
            this.ship01.moveSpeed = this.ship01.moveSpeed * speedIncrease;
            this.ship02.moveSpeed = this.ship02.moveSpeed * speedIncrease;
            this.ship03.moveSpeed = this.ship03.moveSpeed * speedIncrease;
            this.ship04.moveSpeed = this.ship04.moveSpeed * speedIncrease;
        }
    }
    
    create() {
        // play music
        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();
        // place tile sprite
        this.spacebg = this.add.tileSprite(0, 0, 640, 480, 'spacebg').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // fire text
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            tween: 'Power1'
          }
        this.fireText = this.add.text(game.config.width - borderUISize - borderPadding*30, borderUISize + borderPadding*2, 'FIRE', fireConfig);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        // add special spaceship
        this.ship04 = new Spaceship2(this, game.config.width, borderUISize*8 + borderPadding*5, 'spaceship2', 0, 40).setOrigin(0,0); 
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        // play clock
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
          }
        scoreConfig.fixedWidth = 0;
        // display countdown timer
        this.countDownTime = game.settings.gameTimer / 1000;
        this.speedUpTime = 30;
        this.timerText = this.add.text(game.config.width - borderUISize - borderPadding*15, borderUISize + borderPadding, 'Countdown: ' + this.countDownTime, clockConfig);
        this.time.addEvent({ delay: 1000, callback: this.countDown, callbackScope: this, loop: true });
        
    }
}
