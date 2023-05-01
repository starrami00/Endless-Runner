class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load title screen
        this.load.image('TitleScreen', './assets/TitleScreen.png');
        // load audio
        this.load.audio('bg_music', './assets/SpaceMusic.wav');
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion1', './assets/Explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/Explosion2.wav')
        this.load.audio('sfx_explosion3', './assets/Explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/Explosion4.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        
    }

    create() {
        // title config
        let title = this.add.sprite(0,0,'TitleScreen');
        title.setOrigin(0,0);
        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
    
}
