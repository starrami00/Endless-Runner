class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        // load title screen
        this.load.image('EndScreen', './assets/EndScreen.png');
        // load audio for bg music
        this.load.audio('bg_music', './assets/titleBgMusic.wav');
    }
    // get player score data
    init (data) {
        console.log('init', data);
        this.finalScore = data.score;
    }


    create() {
        // title config
        let title = this.add.sprite(0,0,'EndScreen');
        title.setOrigin(0,0);
        let music = this.sound.add('bg_music');
        let musicConfig = {
            mute: 0,
            volume: 0.4,
            loop: true, 
            delay: 0
        }
        music.play(musicConfig);
        
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // display final score
        let scoreConfig = {
            fontFamily: 'Lobster',
            fontSize: '28px',
            color: '#F3B700',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 200
        }
        this.add.text(game.config.width/2, game.config.height/4, 'Final Score:', scoreConfig).setOrigin(0.5);
        this.scoreLeft = this.add.text(borderUISize + borderPadding * 18, borderUISize + borderPadding*10, this.finalScore, scoreConfig);

        // scene changes
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            // restart game
            this.sound.stopByKey('bg_music');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            // back to menu
            this.sound.stopByKey('bg_music');
            this.scene.start('menuScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Go to Credits
            this.scene.start('creditScene');
        }
    }
    
}
