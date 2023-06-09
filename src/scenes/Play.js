class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load audio
        this.load.audio('gameBg', './assets/gameBg.wav');
        this.load.audio('asteroidHit', './assets/asteroidHit.wav');
        this.load.audio('moo', './assets/cowMoo.wav');
        this.load.audio('speed', './assets/speedUp.wav');
        // load images
        this.load.image('star', './assets/particle.png');
        this.load.image('explode', './assets/explode.png');
        this.load.image('rock' , './assets/rock.png');
        this.load.image('cow', './assets/cow.png');
        this.load.image('asteroid', './assets/asteroid.png');
        this.load.image('earth', './assets/Earth.png');
        this.load.image('space', './assets/spaceBg.png')
        this.load.image('moon', './assets/moon.png');
        this.load.image('ground', './assets/ground.png');
        // load atlas
        this.load.atlas('platformer_atlas', './assets/player_sheet.png', './assets/player_sheet.json');
   
    }
    update() {
        // keep running till game is over
        if(this.gameOver == false) {
            // delay of cows entering screen
            if(this.cowTime < 60){
                this.cowTime++;
            }
            if(this.cowTime == 60){
                this.cow.update();
            }
            // enter in asteroids
            this.asteroid.update();
            
            // move background
            this.moon.tilePositionX += 2;
            this.spacebg.tilePositionX += 1;

            this.groundScroll.tilePositionX += this.SCROLL_SPEED;

            // check if boy is grounded
            this.boy.isGrounded = this.boy.body.touching.down;
            // check if boy hits cow
            if(this.cowCollision(this.boy.body, this.cow)) {
                this.Score += 1;
                this.scoreLeft.text = this.Score;
                this.cow.reset(); 
            }
            // check if boy hit asteroid and hide sprite
            if(this.asteroidCollision(this.boy.body, this.asteroid)) {
                this.boy.setActive(false).setVisible(false);
                this.asteroid.reset();
            }
            // increase speed
            if(this.Score > 0 && this.Score % 10 == 0 && this.spedUp == false){
                this.speedIncrease();                     
                this.spedUp = true;
            }
            if(this.Score % 10 == 1){
                this.speedText.setActive(false).setVisible(false);
                this.spedUp = false;
            }
            // Check if player has jumps to spare and run animations
            if(this.boy.isGrounded) {
                this.boy.anims.play('Running', true);
                this.jumps = this.MAX_JUMPS;
                this.jumping = false;
            } else {
                this.boy.anims.play('Jumping');
            }
            // player jumping controls
            if(Phaser.Input.Keyboard.JustDown(keyUP) && this.jumps != 0) {
                this.boy.body.velocity.y = this.JUMP_VELOCITY;
                this.jumps--;
                this.jumping = true;
            }
            // player ducking controls
            if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
                this.ducking = true;
                this.boy.anims.play('Duck'); 
            }
            if(Phaser.Input.Keyboard.JustUp(keyDOWN)){
                this.ducking = false;
                this.boy.anims.play('Running'); 
            }
            if(this.ducking == true){
                this.boy.anims.play('Duck');
            }
        }
       
    }

    cowCollision(player, cow) {
        // simple AABB checking
        if (player.x < cow.x + cow.width && player.x + cow.width > cow.x && player.y < cow.y + cow.height && player.height + player.y > cow.y) {
            // cow sfx
            this.sound.play('moo');
            // particle emmiter
            this.add.particles(cow.x, cow.y, 'star', {
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

    asteroidCollision(player, asteroid) {
        // simple AABB checking
        if (player.x + 12 < asteroid.x + asteroid.width - 8 && player.x + player.width - 12 > asteroid.x + 8 && player.y + 12 < asteroid.y + asteroid.height - 8 && player.height + player.y - 12 > asteroid.y + 8 && this.ducking == false) {
            // asteroid sfx
            this.sound.play('asteroidHit');
            // particle emmiter for asteroid
            this.add.particles(asteroid.x, asteroid.y, 'rock', {
                speed: 200,
                lifespan: 500,
                gravityY: 200,
                stopAfter: 10
            });
            // particle emmiter for player
            this.add.particles(player.x, player.y, 'explode', {
                speed: 100,
                lifespan: 500,
                gravityY: 200,
                stopAfter: 10
            });
            // GAME OVER flag
            this.gameOver = true;
            this.time.addEvent({ delay: 1500, callback: this.restart, callbackScope: this, loop: false });
            return true;
        } else {
            return false;
        }
    }

    speedIncrease(){
        this.sound.play('speed');
        this.speedText.setActive(true).setVisible(true);
        // flash speed text
        this.tweens.add({
            targets: this.speedText,
            alpha: 0,
            duration: 1000,
            yoyo: true,
            repeat: 3
            });  
        let increase = 1.5;
        this.asteroid.moveSpeed *= increase;
 
    }

    restart(){
        this.sound.stopByKey('gameBg');
        this.scene.start('gameOverScene', { score: this.Score });
    }
    
    create() {
        // set up game
        this.SCROLL_SPEED = 4;
        this.JUMP_VELOCITY = -750;
        this.MAX_JUMPS = 2;
        this.physics.world.gravity.y = 2600;
        // animation for running
        this.anims.create({ 
            key: 'Running', 
            frames: this.anims.generateFrameNames('platformer_atlas', {      
                prefix: 'Running',
                start: 1,
                end: 3,
                suffix: '.png',
                zeroPad: 4 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        // animation for jumping
        this.anims.create({
            key: 'Jumping',
            defaultTextureKey: 'platformer_atlas',
            frames: [
                { frame: 'Jumping.png' }
            ],
        });
        // animation for ducking
        this.anims.create({
            key: 'Duck',
            defaultTextureKey: 'platformer_atlas',
            frames: [
                { frame: 'Duck.png'}
            ],
        });
        // play music
        let music = this.sound.add('gameBg');
        music.setLoop(true);
        music.play();
        // place tile sprite
        this.earthbg = this.add.tileSprite(0, 0, 640, 480, 'earth').setOrigin(0, 0);
        this.earthbg.setDepth(3);
        this.spacebg = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0);
        this.moon = this.add.tileSprite(0, 0, 640, 480, 'moon').setOrigin(0, 0);
        // add asteroid 
        this.asteroid = new Asteroid(this, game.config.width + borderUISize*6, borderUISize*10, 'asteroid', 0, 10).setOrigin(0, 0);
        // add cow
        this.cow = new Cow(this, game.config.width + borderUISize*6, borderUISize*10, 'cow', 0, 20).setOrigin(0, 0);
        // timer for cows
        this.cowTime = 0;
        // init speed
        this.spedUp = false;
        // init ducking
        this.ducking = false;
        // make ground tiles group
        this.floor = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.floor.add(groundTile);
        }
        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setOrigin(0);
        // set up boy 
        this.boy = this.physics.add.sprite(120, game.config.height/2-tileSize, 'platformer_atlas').setScale(SCALE);
        this.boy.setScale(1.5);
        // add physics collider
        this.physics.add.collider(this.boy, this.floor);
        // setting Game Over
        this.gameOver = false;
        // initialize score
        this.Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#FFFCFF',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.Score, scoreConfig);
        // speed text
        let speedConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#FFFCFF',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 200
        }
        this.speedText = this.add.text(game.config.width - borderUISize - borderPadding*35, borderUISize + borderPadding*2, 'Speed Increase', speedConfig);
        this.speedText.setActive(false).setVisible(false);
       
        // define keys
        //keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
    }
}
