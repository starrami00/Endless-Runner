class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        // load title screen
        this.load.image('EndScreen', './assets/EndScreen.png');
        // load audio
        this.load.audio('bg_music', './assets/titleBgMusic.wav');
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
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            // restart game
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            // back to menu
            this.scene.start('menuScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Go to Credits
            game.settings = {
                asteroidSpeed: 3
            }
            //this.sound.stopByKey('bg_music');
            this.scene.start('creditScene');
        }
    }
    
}
