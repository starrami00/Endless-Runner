class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load bg music
        this.load.audio('bg_music', './assets/titleBgMusic.wav');
        // load images/tile sprites
        this.load.image('star', './assets/particle.png');
        this.load.image('cow', './assets/cow.png');
        this.load.image('asteroid', './assets/asteroid.png');
        this.load.image('earth', './assets/Earth.png');
        this.load.image('space', './assets/spaceBg.png')
        this.load.image('moon', './assets/moon.png');
        this.load.image('gameOver', './assets/GameOver.png');
        this.load.image('restart', './assets/restart.png');
        this.load.image('arrow', './assets/arrow.png');


        this.load.atlas('platformer_atlas', './assets/kenny_sheet.png', './assets/kenny_sheet.json');

        // tiles in spritesheet 
        this.load.image('ground', './assets/ground.png');
        // load spritesheet
        //this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    update() {
        // delay of cows entering screen
        if(this.time < 60){
            this.time++;
        }
        // enter in asteroids
        this.asteroid.update();
        
        if(this.time == 60){
            this.cow.update();
        }

         // move background
         this.moon.tilePositionX += 2;
         this.spacebg.tilePositionX += 1;

         this.groundScroll.tilePositionX += this.SCROLL_SPEED;

         // check if alien is grounded
	    this.alien.isGrounded = this.alien.body.touching.down;

        if(this.cowCollision(this.alien.body, this.cow)) {
            this.Score += 1;
            this.scoreLeft.text = this.Score;
            this.cow.reset(); 
        }

        if(this.asteroidCollision(this.alien.body, this.asteroid)) {
            this.asteroid.reset();
        }

        
         // if so, we have jumps to spare
	    if(this.alien.isGrounded) {
            this.alien.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	this.alien.anims.play('jump');
	    }


        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
	        this.alien.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }
    }

    cowCollision(player, cow) {
        // simple AABB checking
        if (player.x < cow.x + cow.width && player.x + cow.width > cow.x && player.y < cow.y + cow.height && player.height + player.y > cow.y) {
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
        if (player.x < asteroid.x + asteroid.width && player.x + asteroid.width > asteroid.x && player.y < asteroid.y + asteroid.height && player.height + player.y > asteroid.y) {
            // particle emmiter
            this.add.particles(asteroid.x, asteroid.y, 'star', {
                speed: 100,
                lifespan: 500,
                gravityY: 200,
                stopAfter: 10
            });
            // GAME OVER flag
            this.add.image(game.config.width/2, game.config.height/2, 'gameOver').setOrigin(0.5);
            this.add.image(game.config.width/2, game.config.height/2 + 64, 'restart').setOrigin(0.5);
            this.add.image(game.config.width/2, game.config.height/2 + 120, 'arrow').setOrigin(0.5);
            this.gameOver = true;
            return true;
        } else {
            return false;
        }
    }
    
    create() {
         // set up Phaser-provided cursor key input
        this.SCROLL_SPEED = 4;
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.physics.world.gravity.y = 2600;

        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNames('platformer_atlas', {      
                prefix: 'walk',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 30,
            repeat: -1 
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: 'platformer_atlas',
            frames: [
                { frame: 'jump' }
            ],
        });
        // play music
        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();
        // place tile sprite
        this.earthbg = this.add.tileSprite(0, 0, 640, 480, 'earth').setOrigin(0, 0);
        this.earthbg.setDepth(3);
        this.spacebg = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0);
        this.moon = this.add.tileSprite(0, 0, 640, 480, 'moon').setOrigin(0, 0);
        // add asteroid 
        this.asteroid = new Asteroid(this, game.config.width + borderUISize*6, borderUISize*6, 'asteroid', 0, 10).setOrigin(0, 0);
        // add cow
        this.cow = new Cow(this, game.config.width + borderUISize*6, borderUISize*6, 'cow', 0, 20).setOrigin(0, 0);
        // timer for cows
        this.time = 0;


         //make ground tiles group
         this.floor = this.add.group();
         for(let i = 0; i < game.config.width; i += tileSize) {
             let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
             groundTile.body.immovable = true;
             groundTile.body.allowGravity = false;
             this.floor.add(groundTile);
         }
         // put another tile sprite above the ground tiles
         this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setOrigin(0);
         // set up my alien son 👽
         this.alien = this.physics.add.sprite(120, game.config.height/2-tileSize, 'platformer_atlas', 'side').setScale(SCALE);
          // add physics collider
        this.physics.add.collider(this.alien, this.floor);

        this.gameOver = false;

        // initialize score
        this.Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.Score, scoreConfig);
        

 
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
    }
}
